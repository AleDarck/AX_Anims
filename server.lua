-- ============================================================
--  AX_Anims - Servidor
-- ============================================================

local ESX = exports['es_extended']:getSharedObject()

-- ============================================================
-- Base de datos - Crear tabla si no existe
-- ============================================================
MySQL.ready(function()
    MySQL.query([[
        CREATE TABLE IF NOT EXISTS `ax_anims_favorites` (
            `id`         INT(11) NOT NULL AUTO_INCREMENT,
            `identifier` VARCHAR(60) NOT NULL,
            `category`   VARCHAR(40) NOT NULL,
            `command`    VARCHAR(60) NOT NULL,
            PRIMARY KEY (`id`),
            UNIQUE KEY `unique_fav` (`identifier`, `category`, `command`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ]])
end)

-- ============================================================
-- Obtener identificador del personaje activo (char)
-- ============================================================
local function getCharIdentifier(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then return nil end
    -- NEW ESX usa identifier de cuenta + char slot
    local identifier = xPlayer.identifier
    return identifier
end

-- ============================================================
-- Obtener favoritos
-- ============================================================
RegisterNetEvent('AX_Anims:getFavorites', function()
    local src        = source
    local identifier = getCharIdentifier(src)
    if not identifier then return end

    local result = MySQL.query.await(
        "SELECT `category`, `command` FROM `ax_anims_favorites` WHERE `identifier` = ?",
        { identifier }
    )

    TriggerClientEvent('AX_Anims:receiveFavorites', src, result or {})
end)

-- ============================================================
-- Agregar favorito
-- ============================================================
RegisterNetEvent('AX_Anims:addFavorite', function(category, command)
    local src        = source
    local identifier = getCharIdentifier(src)
    if not identifier then return end

    MySQL.query(
        "INSERT IGNORE INTO `ax_anims_favorites` (`identifier`, `category`, `command`) VALUES (?, ?, ?)",
        { identifier, category, command }
    )
end)

-- ============================================================
-- Eliminar favorito
-- ============================================================
RegisterNetEvent('AX_Anims:removeFavorite', function(category, command)
    local src        = source
    local identifier = getCharIdentifier(src)
    if not identifier then return end

    MySQL.query(
        "DELETE FROM `ax_anims_favorites` WHERE `identifier` = ? AND `category` = ? AND `command` = ?",
        { identifier, category, command }
    )
end)

-- ============================================================
-- Solicitar animación compartida al jugador más cercano
-- ============================================================
RegisterNetEvent('AX_Anims:requestShared', function(targetServerId, command)
    local src = source
    TriggerClientEvent('AX_Anims:receiveSharedRequest', targetServerId, src, command)
end)

-- ============================================================
-- Aceptar animación compartida
-- ============================================================
RegisterNetEvent('AX_Anims:acceptShared', function(initiatorServerId, command)
    local acceptor = source
    -- Ejecutar en ambos jugadores
    TriggerClientEvent('AX_Anims:executeShared', initiatorServerId, command, true)
    TriggerClientEvent('AX_Anims:executeShared', acceptor,           command, false)
end)

-- ============================================================
-- Rechazar animación compartida
-- ============================================================
RegisterNetEvent('AX_Anims:declineShared', function(initiatorServerId)
    TriggerClientEvent('AX_Anims:sharedDeclined', initiatorServerId)
end)