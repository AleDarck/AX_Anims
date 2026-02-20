-- ============================================================
--  AX_Anims - Configuración General
-- ============================================================

Config = {}

-- Distancia máxima para animaciones compartidas (en metros)
Config.SharedAnimDistance = 3.0

-- Tiempo en segundos que tiene el jugador para aceptar una animación compartida
Config.SharedAnimTimeout = 15

-- Comando para cancelar la animación activa
Config.CancelKey = 'X'
Config.CancelKeyCode = 0x58 -- Hash de la tecla X


--[[

Animación simple (sin prop):
{ name = "Nombre visible", command = "comando_unico", dict = "dict_de_gta", anim = "nombre_anim", flag = 1, loop = true, prop = nil },


Animación con prop:
{ name = "Nombre visible", command = "comando_unico", dict = "dict_de_gta", anim = "nombre_anim", flag = 1, loop = true,
    prop = { model = "modelo_prop", bone = 28422, pos = vector3(0.0, 0.0, 0.0), rot = vector3(0.0, 0.0, 0.0) } },


Walkstyle:
{ name = "Nombre visible", command = "walk_nombre", walkstyle = "clipset_de_gta" },


En script.js en la categoría correspondiente:
{ name: "Nombre visible", command: "comando_unico" },

]]