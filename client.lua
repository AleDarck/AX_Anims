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
local ragdollActive = false
local walkModeActive = false

-- ============================================================
-- Utilidades
-- ============================================================
local function notify(msg)
    ESX.ShowNotification(msg)
end

local function toggleNuiMenu(state)
    menuOpen = state
    SetNuiFocus(state, state)
    SetNuiFocusKeepInput(state) -- permite que el juego siga recibiendo input de movimiento
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

    RequestAnimDict(data.dict)
    local t = 0
    while not HasAnimDictLoaded(data.dict) and t < 100 do
        Wait(10)
        t = t + 1
    end
    if not HasAnimDictLoaded(data.dict) then
        notify("Error al cargar la animación.")
        currentAnim = nil
        return
    end

    -- Si walk mode está activo, forzar flag 49 (upper body, no bloquea movimiento)
    local flag = walkModeActive and 49 or (data.flag or (data.loop and 1 or 0))

    TaskPlayAnim(ped, data.dict, data.anim, 8.0, -8.0, -1, flag, 0, false, false, false)

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
    local categories = { "expresiones", "bailes", "escenarios", "props", "sentarse" }
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
    -- Comando /e que acepta el nombre de la animación como argumento
    RegisterCommand('e', function(source, args)
        if not args or not args[1] then
            notify("Uso: /e <animación>")
            return
        end
        local cmd = args[1]:lower()
        local animData, animCat = findAnimByCommand(cmd)

        if not animData then
            notify("Animación '" .. cmd .. "' no encontrada.")
            return
        end

        if animCat == "compartidas" then
            local nearest = getNearestPlayer()
            if not nearest then
                notify("No hay ningún jugador cerca.")
                return
            end
            local targetServerId = GetPlayerServerId(nearest)
            TriggerServerEvent('AX_Anims:requestShared', targetServerId, cmd)
        else
            playAnim(animData, animCat)
        end
    end, false)
end

-- ============================================================
-- Tecla cancelar (X) y bloqueo de cámara con menú abierto
-- ============================================================
CreateThread(function()
    while true do
        Wait(0)

        if menuOpen then
            DisableControlAction(0, 1, true)   -- LookLeftRight
            DisableControlAction(0, 2, true)   -- LookUpDown
            DisableControlAction(0, 106, true) -- VehicleDriveLook
            DisableControlAction(0, 107, true) -- VehicleDriveLook2
            DisableControlAction(0, 24, true)  -- Attack (click izquierdo)
            DisableControlAction(0, 25, true)  -- Aim (click derecho)
        end
    end
end)

RegisterKeyMapping('cancelanim', 'Cancelar Animación', 'keyboard', 'X')
RegisterCommand('cancelanim', function()
    if not menuOpen then
        cancelAnim()
    end
end, false)

local isRagdolling = false

RegisterKeyMapping('ax_ragdoll', 'Ragdoll', 'keyboard', 'U')
RegisterCommand('ax_ragdoll', function()
    if menuOpen then return end
    local ped = PlayerPedId()
    if not IsPedOnFoot(ped) then return end

    isRagdolling = not isRagdolling

    if isRagdolling then
        CreateThread(function()
            -- Fase 1: mantener ragdoll mientras está activo
            while isRagdolling do
                ped = PlayerPedId()
                SetPedCanRagdoll(ped, true)
                SetPedRagdollForceFall(ped)
                ResetPedRagdollTimer(ped)
                SetPedToRagdoll(ped, 1000, 1000, 3, false, false, false)
                ResetPedRagdollTimer(ped)
                Wait(0)
            end

            -- Fase 2: esperar a que el ped deje de estar en ragdoll físicamente
            ped = PlayerPedId()
            local timeout = 0
            while IsPedRagdoll(ped) and timeout < 300 do
                Wait(10)
                timeout = timeout + 1
            end

            -- Fase 3: animación de levantarse desde el suelo
            local getupDict = "get_up@slow"
            RequestAnimDict(getupDict)
            local t = 0
            while not HasAnimDictLoaded(getupDict) and t < 100 do
                Wait(10); t = t + 1
            end

            if HasAnimDictLoaded(getupDict) then
                TaskPlayAnim(ped, getupDict, "getup_v2_front_0", 4.0, -4.0, 2000, 0, 0, false, false, false)
                Wait(2000)
            end

            ClearPedTasks(ped)
            SetPedCanRagdoll(ped, false)
        end)
    end
end, false)

local HANDSUP_DICT  = "random@mugging3"
local HANDSUP_ANIM  = "handsup_standing_base"
local HANDSUP_FLAGS = 49
local inHandsup     = false

RegisterKeyMapping('ax_handsup', 'Manos Arriba', 'keyboard', 'X')
RegisterCommand('ax_handsup', function()
    if menuOpen then return end
    local ped = PlayerPedId()

    -- Si hay animación activa que NO es hands up, cancelarla
    if currentAnim and not inHandsup then
        cancelAnim()
        inHandsup = false
        return
    end

    inHandsup = not inHandsup

    if inHandsup then
        RequestAnimDict(HANDSUP_DICT)
        local t = 0
        while not HasAnimDictLoaded(HANDSUP_DICT) and t < 200 do
            Wait(10); t = t + 1
        end
        TaskPlayAnim(ped, HANDSUP_DICT, HANDSUP_ANIM, 3.0, 3.0, -1, HANDSUP_FLAGS, 0, false, false, false)
        currentAnim = { type = "expresiones", data = { dict = HANDSUP_DICT, anim = HANDSUP_ANIM, flag = HANDSUP_FLAGS, loop = true } }
        cancelKeyActive = true

        -- Loop para mantener la animación y detectar cancelación
        CreateThread(function()
            while inHandsup do
                Wait(0)
                -- Si el jugador apunta, cancelar hands up
                if IsPlayerFreeAiming(PlayerId()) then
                    inHandsup = false
                    ClearPedTasks(ped)
                    currentAnim = nil
                    cancelKeyActive = false
                end
            end
        end)
    else
        ClearPedTasks(ped)
        currentAnim    = nil
        cancelKeyActive = false
    end
end, false)

local pointing = false

RegisterKeyMapping('ax_pointing', 'Señalar', 'keyboard', 'B')
RegisterCommand('ax_pointing', function()
    if menuOpen then return end
    local ped = PlayerPedId()

    -- No puede señalar si está ragdoll, caído, etc.
    if IsPedRagdoll(ped) or IsPedFalling(ped) or IsPedInjured(ped) then return end

    pointing = not pointing

    if pointing then
        RequestAnimDict("anim@mp_point")
        local t = 0
        while not HasAnimDictLoaded("anim@mp_point") and t < 200 do
            Wait(10); t = t + 1
        end
        SetPedConfigFlag(ped, 36, true)
        TaskMoveNetworkByName(ped, 'task_mp_pointing', 0.5, false, 'anim@mp_point', 24)

        -- Loop del pointing (actualiza pitch/heading de la cámara)
        CreateThread(function()
            while pointing do
                Wait(0)
                if IsPedRagdoll(ped) or IsPedFalling(ped) or IsPlayerFreeAiming(PlayerId()) then
                    pointing = false
                    break
                end

                local camPitch = GetGameplayCamRelativePitch()
                camPitch = math.max(-70.0, math.min(42.0, camPitch))
                camPitch = (camPitch + 70.0) / 112.0

                local camHeading = GetGameplayCamRelativeHeading()
                local cosCamH = math.cos(camHeading)
                local sinCamH = math.sin(camHeading)
                camHeading = math.max(-180.0, math.min(180.0, camHeading))
                camHeading = (camHeading + 180.0) / 360.0

                SetTaskMoveNetworkSignalFloat(ped, 'Pitch', camPitch)
                SetTaskMoveNetworkSignalFloat(ped, 'Heading', (camHeading * -1.0) + 1.0)
                SetTaskMoveNetworkSignalBool(ped, 'isBlocked', false)
                SetTaskMoveNetworkSignalBool(ped, 'isFirstPerson', GetCamViewModeForContext(GetCamActiveViewModeContext()) == 4)
            end

            -- Limpiar al terminar
            SetPedConfigFlag(ped, 36, false)
            ClearPedSecondaryTask(ped)
            RemoveAnimDict("anim@mp_point")
        end)
    else
        SetPedConfigFlag(ped, 36, false)
        ClearPedSecondaryTask(ped)
        RemoveAnimDict("anim@mp_point")
    end
end, false)

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

RegisterNUICallback('setWalkMode', function(data, cb)
    walkModeActive = data.active
    -- Si hay animación activa, re-aplicarla con el nuevo flag
    if currentAnim and currentAnim.data and currentAnim.data.dict and currentAnim.type ~= "caminar" then
        local ped  = PlayerPedId()
        local anim = currentAnim.data
        local newFlag = walkModeActive and 49 or (anim.flag or 1)
        ClearPedTasks(ped)
        Wait(50)
        RequestAnimDict(anim.dict)
        local t = 0
        while not HasAnimDictLoaded(anim.dict) and t < 100 do
            Wait(10); t = t + 1
        end
        TaskPlayAnim(ped, anim.dict, anim.anim, 8.0, -8.0, -1, newFlag, 0, false, false, false)
        -- Re-adjuntar prop si tenía
        if anim.prop and not (currentProp and DoesEntityExist(currentProp)) then
            Wait(300)
            currentProp = attachProp(anim.prop)
        end
    end
    cb('ok')
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
    -- Guard: si ya estamos reproduciendo esta misma compartida, ignorar
    if currentAnim and currentAnim.data and currentAnim.data.command == command then return end

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

    if currentAnim then
        ClearPedTasks(ped)
        removeProp()
    end

    -- Guardar command en data para el guard
    currentAnim = { type = "compartidas", data = { command = command, dict = dict, anim = anim } }

    RequestAnimDict(dict)
    local t = 0
    while not HasAnimDictLoaded(dict) and t < 100 do
        Wait(10); t = t + 1
    end
    if not HasAnimDictLoaded(dict) then return end

    -- Flag 0 para que NO haga loop, se reproduce una sola vez
    TaskPlayAnim(ped, dict, anim, 8.0, -8.0, -1, animData.flag == 1 and 0 or animData.flag, 0, false, false, false)
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