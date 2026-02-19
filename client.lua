-- ============================================================
--  AX_Anims - Cliente
-- ============================================================

local ESX = exports['es_extended']:getSharedObject()

-- ============================================================
-- Variables locales
-- ============================================================
local menuOpen        = false
local currentAnim     = nil   -- { type, data }
local currentProp     = nil   -- entity del prop activo
local currentWalk     = ""    -- walkstyle activo
local favorites       = {}    -- { "categoria_command" = true }
local cancelKeyActive = false
local sharedPending   = nil   -- animación compartida pendiente de este jugador

-- ============================================================
-- Utilidades
-- ============================================================
local function notify(msg)
    ESX.ShowNotification(msg)
end

local function toggleNuiMenu(state)
    menuOpen = state
    SetNuiFocus(state, state)
    SendNUIMessage({ action = "toggle", show = state })
end

-- ============================================================
-- Props
-- ============================================================
local function attachProp(propData)
    if not propData then return end
    local ped = PlayerPedId()
    RequestModel(propData.model)
    local t = 0
    while not HasModelLoaded(propData.model) and t < 100 do
        Wait(10)
        t = t + 1
    end
    if not HasModelLoaded(propData.model) then return end
    local x, y, z = GetEntityCoords(ped)
    local prop = CreateObject(propData.model, x, y, z, true, true, false)
    AttachEntityToEntity(
        prop, ped,
        GetPedBoneIndex(ped, propData.bone),
        propData.pos.x, propData.pos.y, propData.pos.z,
        propData.rot.x, propData.rot.y, propData.rot.z,
        true, true, false, true, 1, true
    )
    SetModelAsNoLongerNeeded(propData.model)
    return prop
end

local function removeProp()
    if currentProp and DoesEntityExist(currentProp) then
        DeleteEntity(currentProp)
        currentProp = nil
    end
end

-- ============================================================
-- Walkstyle
-- ============================================================
local function applyWalkstyle(style)
    local ped = PlayerPedId()
    if style == "" then
        ResetPedMovementClipset(ped, 0.25)
        currentWalk = ""
        return
    end
    RequestClipSet(style)
    local t = 0
    while not HasClipSetLoaded(style) and t < 100 do
        Wait(10)
        t = t + 1
    end
    SetPedMovementClipset(ped, style, 0.25)
    currentWalk = style
end

-- ============================================================
-- Reproducir Animación
-- ============================================================
local function playAnim(data, animType)
    local ped = PlayerPedId()

    -- Cancelar animación previa
    if currentAnim then
        ClearPedTasks(ped)
        removeProp()
        if currentWalk ~= "" then
            applyWalkstyle("")
        end
    end

    currentAnim = { type = animType, data = data }

    if animType == "caminar" then
        applyWalkstyle(data.walkstyle)
        cancelKeyActive = true
        return
    end

    -- Cargar dict
    RequestAnimDict(data.dict)
    local t = 0
    while not HasAnimDictLoaded(data.dict) and t < 100 do
        Wait(10)
        t = t + 1
    end
    if not HasAnimDictLoaded(data.dict) then
        notify("~r~Error al cargar la animación.")
        currentAnim = nil
        return
    end

    -- Las expresiones faciales usan flag 49 (upper body, no bloquea movimiento)
    local flag = data.flag or (data.loop and 1 or 0)

    TaskPlayAnim(ped, data.dict, data.anim, 8.0, -8.0, -1, flag, 0, false, false, false)

    -- Prop
    if data.prop then
        Wait(300)
        currentProp = attachProp(data.prop)
    end

    cancelKeyActive = true
end

-- ============================================================
-- Cancelar Animación
-- ============================================================
local function cancelAnim()
    if not currentAnim then return end
    local ped = PlayerPedId()
    ClearPedTasks(ped)
    removeProp()
    if currentWalk ~= "" then
        applyWalkstyle("")
    end
    currentAnim     = nil
    cancelKeyActive = false
end

-- ============================================================
-- Buscar animación por comando en todas las categorías
-- ============================================================
local function findAnimByCommand(cmd)
    local categories = { "expresiones", "bailes", "trabajo", "props", "sentarse" }
    for _, cat in ipairs(categories) do
        for _, anim in ipairs(Animations[cat]) do
            if anim.command == cmd then
                return anim, cat
            end
        end
    end
    -- Compartidas
    for _, anim in ipairs(Animations.compartidas) do
        if anim.command == cmd then
            return anim, "compartidas"
        end
    end
    -- Caminar
    for _, anim in ipairs(Animations.caminar) do
        if anim.command == cmd then
            return anim, "caminar"
        end
    end
    return nil, nil
end

-- ============================================================
-- Animaciones compartidas - Jugador más cercano
-- ============================================================
local function getNearestPlayer()
    local ped      = PlayerPedId()
    local myCoords = GetEntityCoords(ped)
    local nearest  = nil
    local nearestDist = Config.SharedAnimDistance + 1

    for _, player in ipairs(GetActivePlayers()) do
        if player ~= PlayerId() then
            local targetPed  = GetPlayerPed(player)
            local targetCoords = GetEntityCoords(targetPed)
            local dist = #(myCoords - targetCoords)
            if dist < nearestDist then
                nearestDist = nearest
                nearest = player
                nearestDist = dist
            end
        end
    end
    return nearest
end

-- ============================================================
-- Registro de comandos /e <nombre>
-- ============================================================
local function registerAnimCommands()
    -- Categorías simples
    local simpleCats = { "expresiones", "bailes", "trabajo", "props", "sentarse" }
    for _, cat in ipairs(simpleCats) do
        for _, anim in ipairs(Animations[cat]) do
            local cmd = anim.command
            local animData = anim
            local animCat  = cat
            RegisterCommand("e " .. cmd, function()
                playAnim(animData, animCat)
            end, false)
        end
    end

    -- Caminar
    for _, anim in ipairs(Animations.caminar) do
        local cmd      = anim.command
        local animData = anim
        RegisterCommand("e " .. cmd, function()
            playAnim(animData, "caminar")
        end, false)
    end

    -- Compartidas
    for _, anim in ipairs(Animations.compartidas) do
        local cmd      = anim.command
        local animData = anim
        RegisterCommand("e " .. cmd, function()
            local nearest = getNearestPlayer()
            if not nearest then
                notify("No hay ningún jugador cerca.")
                return
            end
            local targetServerId = GetPlayerServerId(nearest)
            TriggerServerEvent('AX_Anims:requestShared', targetServerId, cmd)
        end, false)
    end
end

-- ============================================================
-- Tecla cancelar (X) y bloqueo de cámara con menú abierto
-- ============================================================
CreateThread(function()
    while true do
        Wait(0)

        -- Bloqueo de cámara cuando el menú está abierto (permite moverse)
        if menuOpen then
            DisableControlAction(0, 1, true)   -- LookLeftRight (mouse)
            DisableControlAction(0, 2, true)   -- LookUpDown (mouse)
        end

        -- Cancelar animación con X (usando IsControlJustPressed simple)
        if cancelKeyActive and not menuOpen then
            if IsControlJustPressed(0, 88) then
                cancelAnim()
            end
        end
    end
end)

-- ============================================================
-- Keybinding para abrir el menú (F3)
-- ============================================================
RegisterKeyMapping('animsmenu', 'Abrir Menú de Animaciones', 'keyboard', 'F3')
RegisterCommand('animsmenu', function()
    if menuOpen then
        toggleNuiMenu(false)
    else
        -- Cargar favoritos frescos al abrir
        TriggerServerEvent('AX_Anims:getFavorites')
    end
end, false)

-- ============================================================
-- NUI Callbacks
-- ============================================================
RegisterNUICallback('closeMenu', function(_, cb)
    toggleNuiMenu(false)
    cb('ok')
end)

RegisterNUICallback('playAnim', function(data, cb)
    local animData, animCat = findAnimByCommand(data.command)
    if not animData then cb('error') return end

    if animCat == "compartidas" then
        local nearest = getNearestPlayer()
        if not nearest then
            notify("No hay ningún jugador cerca.")
            cb('ok')
            return
        end
        local targetServerId = GetPlayerServerId(nearest)
        TriggerServerEvent('AX_Anims:requestShared', targetServerId, data.command)
    else
        playAnim(animData, animCat)
    end
    cb('ok')
end)

RegisterNUICallback('cancelAnim', function(_, cb)
    cancelAnim()
    cb('ok')
end)

RegisterNUICallback('toggleFavorite', function(data, cb)
    local key = data.category .. "_" .. data.command
    if favorites[key] then
        favorites[key] = nil
        TriggerServerEvent('AX_Anims:removeFavorite', data.category, data.command)
    else
        favorites[key] = true
        TriggerServerEvent('AX_Anims:addFavorite', data.category, data.command)
    end
    cb('ok')
end)

RegisterNUICallback('requestFavorites', function(_, cb)
    cb(favorites)
end)

-- ============================================================
-- Recibir favoritos del servidor
-- ============================================================
RegisterNetEvent('AX_Anims:receiveFavorites', function(favList)
    favorites = {}
    for _, fav in ipairs(favList) do
        local key = fav.category .. "_" .. fav.command
        favorites[key] = true
    end
    -- Enviar al NUI y abrir el menú
    SendNUIMessage({ action = "setFavorites", favorites = favorites })
    toggleNuiMenu(true)
end)

-- ============================================================
-- Recibir solicitud de animación compartida
-- ============================================================
RegisterNetEvent('AX_Anims:receiveSharedRequest', function(senderServerId, command)
    sharedPending = { senderServerId = senderServerId, command = command }
    SendNUIMessage({
        action  = "sharedRequest",
        command = command,
        timeout = Config.SharedAnimTimeout
    })
end)

RegisterNUICallback('acceptShared', function(data, cb)
    if not sharedPending then cb('error') return end
    TriggerServerEvent('AX_Anims:acceptShared', sharedPending.senderServerId, sharedPending.command)
    sharedPending = nil
    cb('ok')
end)

RegisterNUICallback('declineShared', function(_, cb)
    if sharedPending then
        TriggerServerEvent('AX_Anims:declineShared', sharedPending.senderServerId)
        sharedPending = nil
    end
    cb('ok')
end)

-- ============================================================
-- Ejecutar animación compartida (evento del servidor)
-- ============================================================
RegisterNetEvent('AX_Anims:executeShared', function(command, isInitiator)
    local animData = nil
    for _, anim in ipairs(Animations.compartidas) do
        if anim.command == command then
            animData = anim
            break
        end
    end
    if not animData then return end

    local ped  = PlayerPedId()
    local dict = isInitiator and animData.dict1 or animData.dict2
    local anim = isInitiator and animData.anim1 or animData.anim2

    -- Cancelar anterior
    if currentAnim then
        ClearPedTasks(ped)
        removeProp()
    end

    currentAnim = { type = "compartidas", data = animData }

    RequestAnimDict(dict)
    local t = 0
    while not HasAnimDictLoaded(dict) and t < 100 do
        Wait(10)
        t = t + 1
    end
    if not HasAnimDictLoaded(dict) then return end

    TaskPlayAnim(ped, dict, anim, 8.0, -8.0, -1, animData.flag, 0, false, false, false)
    cancelKeyActive = true
end)

RegisterNetEvent('AX_Anims:sharedDeclined', function()
    notify("El jugador rechazó la animación compartida.")
end)

-- ============================================================
-- Init
-- ============================================================
CreateThread(function()
    -- Esperar hasta que ESX esté listo
    while ESX.GetPlayerData().job == nil do
        Wait(100)
    end
    registerAnimCommands()
end)