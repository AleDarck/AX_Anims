fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'AX_Anims'
description 'Sistema de Animaciones - AX Scripts'
version '1.0.0'
author 'AX Scripts'

shared_scripts {
    '@es_extended/imports.lua',
    'config.lua'
}

client_scripts {
    'animations.lua',
    'client.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js'
}