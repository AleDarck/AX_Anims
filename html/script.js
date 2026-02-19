/* ============================================================
   AX_Anims - Script.js
============================================================ */

'use strict';

// ============================================================
// DATOS DE ANIMACIONES (sincronizados con animations.lua)
// ============================================================
const ANIMATIONS = {
    expresiones: [
        { name: "Apuntando",     command: "exp_aiming"      },
        { name: "Enojado",       command: "exp_angry"       },
        { name: "Quemado",       command: "exp_burning"     },
        { name: "Muerto",        command: "exp_dead"        },
        { name: "Borracho",      command: "exp_drunk"       },
        { name: "Tonto",         command: "exp_dumb"        },
        { name: "Electrocutado", command: "exp_electro"     },
        { name: "Emocionado",    command: "exp_excited"     },
        { name: "Frustrado",     command: "exp_frustrated"  },
        { name: "Gruñón",        command: "exp_grumpy"      },
        { name: "Gruñón 2",      command: "exp_grumpy2"     },
        { name: "Gruñón 3",      command: "exp_grumpy3"     },
        { name: "Feliz",         command: "exp_happy"       },
        { name: "Volado",        command: "exp_high"        },
        { name: "Herido",        command: "exp_injured"     },
        { name: "Alegre",        command: "exp_joyful"      },
        { name: "Alegre 2",      command: "exp_joyful2"     },
        { name: "Fumando",       command: "exp_smoke"       },
        { name: "Sin Parpadear", command: "exp_noblink"     },
        { name: "Un Ojo",        command: "exp_oneeye"      },
        { name: "Tramando",      command: "exp_scheme"      },
        { name: "Impactado",     command: "exp_shocked"     },
        { name: "Impactado 2",   command: "exp_shocked2"    },
        { name: "Dormido",       command: "exp_sleeping"    },
        { name: "Dormido 2",     command: "exp_sleeping2"   },
        { name: "Dormido 3",     command: "exp_sleeping3"   },
        { name: "Engreído",      command: "exp_smug"        },
        { name: "Engreído 2",    command: "exp_smug2"       },
        { name: "Estresado",     command: "exp_stressed"    },
        { name: "Hablando",      command: "exp_talking"     },
        { name: "Nervioso",      command: "exp_twitch"      },
        { name: "Amargado",      command: "exp_sulking"     },
        { name: "Raro",          command: "exp_weird"       },
        { name: "Raro 2",        command: "exp_weird2"      },
        { name: "Raro 3",        command: "exp_weird3"      },
    ],
    bailes: [
        { name: "Dance",              command: "dance"          },
        { name: "Dance 2",            command: "dance2"         },
        { name: "Dance 3",            command: "dance3"         },
        { name: "Dance 4",            command: "dance4"         },
        { name: "Dance 5",            command: "dance5"         },
        { name: "Dance 6",            command: "dance6"         },
        { name: "Dance 7",            command: "dance7"         },
        { name: "Dance 8",            command: "dance8"         },
        { name: "Dance 9",            command: "dance9"         },
        { name: "Dance F",            command: "dancef"         },
        { name: "Dance F2",           command: "dancef2"        },
        { name: "Dance F3",           command: "dancef3"        },
        { name: "Dance F4",           command: "dancef4"        },
        { name: "Dance F5",           command: "dancef5"        },
        { name: "Dance Club",         command: "danceclub"      },
        { name: "Dance Club 2",       command: "danceclubb"     },
        { name: "Dance Club 3",       command: "danceclubc"     },
        { name: "Dance Club 4",       command: "danceclubd"     },
        { name: "Dance Club 5",       command: "danceclube"     },
        { name: "Dance Club 6",       command: "danceclubf"     },
        { name: "Dance Club 7",       command: "danceclubg"     },
        { name: "Dance Club 8",       command: "danceclubh"     },
        { name: "Dance Club 9",       command: "dancecluби"     },
        { name: "Dance Club 10",      command: "danceclubj"     },
        { name: "Dance Club 11",      command: "danceclubk"     },
        { name: "Dance Club 13",      command: "danceclubm"     },
        { name: "Dance Club 14",      command: "danceclubn"     },
        { name: "Dance Club 15",      command: "danceclubo"     },
        { name: "Dance Club 16",      command: "danceclubp"     },
        { name: "Dance Slow",         command: "danceslow"      },
        { name: "Dance Slow 2",       command: "danceslow2"     },
        { name: "Dance Slow 3",       command: "danceslow3"     },
        { name: "Dance Slow 4",       command: "danceslow4"     },
        { name: "Dance Upper",        command: "danceupper"     },
        { name: "Dance Upper 2",      command: "danceupper2"    },
        { name: "Dance Shy",          command: "danceshy"       },
        { name: "Dance Shy 2",        command: "danceshy2"      },
        { name: "Dance Silly",        command: "dancesilly"     },
        { name: "Dance Silly 1",      command: "dancesilly1"    },
        { name: "Dance Silly 2",      command: "dancesilly2"    },
        { name: "Dance Silly 3",      command: "dancesilly3"    },
        { name: "Dance Silly 4",      command: "dancesilly4"    },
        { name: "Dance Silly 5",      command: "dancesilly5"    },
        { name: "Dance Silly 6",      command: "dancesilly6"    },
        { name: "Dance Silly 7",      command: "dancesilly7"    },
        { name: "Dance Silly 8",      command: "dancesilly8"    },
        { name: "Dance Silly 9",      command: "dancesilly9"    },
        { name: "Dance Silly 10",     command: "dancesilly10"   },
        { name: "Dance Silly 11",     command: "dancesilly11"   },
        { name: "Dance Silly 12",     command: "dancesilly12"   },
        { name: "Dance Old",          command: "danceold"       },
        { name: "Twerk",              command: "twerk"          },
        { name: "Lapdance",           command: "lapdance"       },
        { name: "Lapdance 2",         command: "lapdance2"      },
        { name: "Lapdance 3",         command: "lapdance3"      },
        { name: "Lapdance 4",         command: "lapdance4"      },
        { name: "Lapdance 5",         command: "lapdance5"      },
        { name: "Lapdance 6",         command: "lapdance6"      },
        { name: "Salsa Roll",         command: "salsa"          },
        { name: "Crank Dat",          command: "dancecrankdat"  },
        { name: "Crank Dat 2",        command: "dancecrankdat2" },
        { name: "Monkey Dance",       command: "dancemonkey"    },
        { name: "Monkey Dance 2",     command: "dancemonkey2"   },
        { name: "Monkey Dance 3",     command: "dancemonkey3"   },
        { name: "Boxing Dance",       command: "boxdance"       },
        { name: "Hip Hop Dance",      command: "dancehiphop"    },
        { name: "Hip Hop Dance 2",    command: "dancehiphop2"   },
        { name: "Hip Hop Dance 3",    command: "dancehiphop3"   },
        { name: "Drill Dance",        command: "dancedrill"     },
        { name: "Techno Dance",       command: "technodance"    },
        { name: "Techno Dance 2",     command: "technodance2"   },
        { name: "Techno Dance 3",     command: "technodance3"   },
        { name: "Techno Dance 4",     command: "technodance4"   },
        { name: "Zombie Dance",       command: "zompopdance"    },
        { name: "Wave Dance",         command: "dancewave"      },
        { name: "Wave Dance 2",       command: "dancewave02"    },
        { name: "Wave Dance 3",       command: "dancewave03"    },
        { name: "Wave Dance 4",       command: "dancewave04"    },
        { name: "Tutankhamen",        command: "dancewave05"    },
        { name: "Tutankhamen 2",      command: "dancewave06"    },
        { name: "Snake Dance",        command: "dancewave07"    },
        { name: "Slide Dance",        command: "dancewave08"    },
        { name: "Slide Dance 2",      command: "dancewave09"    },
        { name: "Robot Dance",        command: "dancewave10"    },
        { name: "Locking Dance",      command: "dancewave11"    },
        { name: "Headspin",           command: "dancewave12"    },
        { name: "Flaire Dance",       command: "dancewave13"    },
        { name: "Female Crowd Dance", command: "dancewave14"    },
        { name: "Rock Up Dance",      command: "dancewave15"    },
        { name: "DJ",                 command: "dj"             },
        { name: "DJ 2",               command: "dj2"            },
        { name: "DJ 3",               command: "dj3"            },
        { name: "DJ 4",               command: "dj4"            },
        { name: "DJ 5",               command: "dj5"            },
        { name: "DJ 6",               command: "dj6"            },
        { name: "DJ 7",               command: "dj7"            },
        { name: "DJ 8",               command: "dj8"            },
        { name: "DJ 9",               command: "dj9"            },
        { name: "DJ 10",              command: "dj10"           },
        { name: "DJ 11",              command: "dj11"           },
        { name: "DJ 12",              command: "dj12"           },
        { name: "Dance Cerveza",      command: "dancedrink"     },
        { name: "Dance Vino",         command: "dancedrink2"    },
        { name: "Dance Whisky",       command: "dancedrink3"    },
        { name: "Dance Whisky 2",     command: "dancedrink4"    },
        { name: "Dance Vino 2",       command: "dancedrink5"    },
        { name: "Dance Cerveza 2",    command: "dancedrink6"    },
        { name: "Dance Vino 3",       command: "dancedrink7"    },
        { name: "Dance Vino 4",       command: "dancedrink8"    },
        { name: "Dance Cerveza 3",    command: "dancedrink9"    },
        { name: "Dance Caballo",      command: "dancehorse"     },
        { name: "Dance Caballo 2",    command: "dancehorse2"    },
        { name: "Dance Caballo 3",    command: "dancehorse3"    },
        { name: "Glowsticks",         command: "danceglowstick" },
        { name: "Glowsticks 2",       command: "danceglowstick2"},
        { name: "Glowsticks 3",       command: "danceglowstick3"},
    ],
    caminar: [
        { name: "Normal",           command: "walk_normal"        },
        { name: "Alien",            command: "walk_alien"         },
        { name: "Armado",           command: "walk_armored"       },
        { name: "Arrogante",        command: "walk_arrogant"      },
        { name: "Butch",            command: "walk_butch"         },
        { name: "Butch 2",          command: "walk_butch2"        },
        { name: "Butch 3",          command: "walk_butch3"        },
        { name: "Achispado",        command: "walk_buzzed"        },
        { name: "Valiente",         command: "walk_brave"         },
        { name: "Valiente 2",       command: "walk_brave2"        },
        { name: "Valiente 3",       command: "walk_brave3"        },
        { name: "Casey",            command: "walk_casey"         },
        { name: "Casual",           command: "walk_casual"        },
        { name: "Casual 2",         command: "walk_casual2"       },
        { name: "Casual 3",         command: "walk_casual3"       },
        { name: "Casual 4",         command: "walk_casual4"       },
        { name: "Casual 5",         command: "walk_casual5"       },
        { name: "Casual 6",         command: "walk_casual6"       },
        { name: "Chichi",           command: "walk_chichi"        },
        { name: "Seguro",           command: "walk_confident"     },
        { name: "Policía",          command: "walk_cop"           },
        { name: "Policía 2",        command: "walk_cop2"          },
        { name: "Policía 3",        command: "walk_cop3"          },
        { name: "Cobarde",          command: "walk_coward"        },
        { name: "Gordo M",          command: "walk_chubby"        },
        { name: "Gordo F",          command: "walk_chubbyfem"     },
        { name: "Dave",             command: "walk_dave"          },
        { name: "Femenino",         command: "walk_female"        },
        { name: "Masculino",        command: "walk_male"          },
        { name: "Deprimido",        command: "walk_depressed"     },
        { name: "Deprimido 2",      command: "walk_depressed2"    },
        { name: "Deprimido 3",      command: "walk_depressed3"    },
        { name: "Deprimido 4",      command: "walk_depressed4"    },
        { name: "Borracho",         command: "walk_drunk"         },
        { name: "Borracho 2",       command: "walk_drunk2"        },
        { name: "Borracho 3",       command: "walk_drunk3"        },
        { name: "Borracho 4",       command: "walk_drunk4"        },
        { name: "Borracho 5",       command: "walk_drunk5"        },
        { name: "Muy Borracho",     command: "walk_verydrunk"     },
        { name: "Gordo 1",          command: "walk_fat"           },
        { name: "Gordo 2",          command: "walk_fat2"          },
        { name: "Gordo 3",          command: "walk_fat3"          },
        { name: "Femenino 2",       command: "walk_femme"         },
        { name: "Femenino 3",       command: "walk_femme2"        },
        { name: "Floyd",            command: "walk_floyd"         },
        { name: "Franklin",         command: "walk_franklin"      },
        { name: "Gangster",         command: "walk_gangster"      },
        { name: "Gangster 2",       command: "walk_gangster2"     },
        { name: "Gangster 3",       command: "walk_gangster3"     },
        { name: "Gangster 4",       command: "walk_gangster4"     },
        { name: "Gangster 5",       command: "walk_gangster5"     },
        { name: "Gangster 6",       command: "walk_gangster6"     },
        { name: "Gangster 7",       command: "walk_gangster7"     },
        { name: "Gangster 8",       command: "walk_gangster8"     },
        { name: "Gangster 9",       command: "walk_gangster9"     },
        { name: "Gangster 10",      command: "walk_gangster10"    },
        { name: "Gangster 11",      command: "walk_gangster11"    },
        { name: "Gangster 12",      command: "walk_gangster12"    },
        { name: "Gangster 13",      command: "walk_gangster13"    },
        { name: "Gangster 14",      command: "walk_gangster14"    },
        { name: "Genérico M",       command: "walk_generic"       },
        { name: "Genérico F",       command: "walk_generic2"      },
        { name: "Grooving M",       command: "walk_grooving"      },
        { name: "Grooving F",       command: "walk_grooving2"     },
        { name: "Guardia",          command: "walk_guard"         },
        { name: "Esposado",         command: "walk_cuffed"        },
        { name: "Tacones",          command: "walk_heels"         },
        { name: "Tacones 2",        command: "walk_heels2"        },
        { name: "Senderismo M",     command: "walk_hiking"        },
        { name: "Senderismo F",     command: "walk_hiking2"       },
        { name: "Hipster",          command: "walk_hipster"       },
        { name: "Vagabundo",        command: "walk_hobo"          },
        { name: "Vagabundo 2",      command: "walk_hobo2"         },
        { name: "Apurado M",        command: "walk_hurry"         },
        { name: "Apurado F",        command: "walk_hurry2"        },
        { name: "Herido",           command: "walk_injured"       },
        { name: "Herido F",         command: "walk_injured2"      },
        { name: "Intimidación",     command: "walk_intimidation"  },
        { name: "Intimidación 2",   command: "walk_intimidation2" },
        { name: "Intimidación 3",   command: "walk_intimidation3" },
        { name: "Conserje",         command: "walk_janitor"       },
        { name: "Jimmy",            command: "walk_jimmy"         },
        { name: "Trote",            command: "walk_jog"           },
        { name: "Lamar",            command: "walk_lamar"         },
        { name: "Lester",           command: "walk_lester"        },
        { name: "Seductor F",       command: "walk_maneater"      },
        { name: "Michael",          command: "walk_michael"       },
        { name: "Dinero",           command: "walk_money"         },
        { name: "Musculoso",        command: "walk_muscle"        },
        { name: "Nervioso",         command: "walk_nervous"       },
        { name: "Patricia",         command: "walk_patricia"      },
        { name: "Paramédico",       command: "walk_paramedic"     },
        { name: "Elegante M",       command: "walk_posh"          },
        { name: "Elegante F",       command: "walk_posh2"         },
        { name: "Rápido",           command: "walk_quick"         },
        { name: "Ron",              command: "walk_ron"           },
        { name: "Triste M",         command: "walk_sad"           },
        { name: "Triste M 2",       command: "walk_sad2"          },
        { name: "Triste M 3",       command: "walk_sad3"          },
        { name: "Triste F",         command: "walk_sad4"          },
        { name: "Triste F 2",       command: "walk_sad5"          },
        { name: "Descarado M",      command: "walk_sassy"         },
        { name: "Descarado F",      command: "walk_sassy2"        },
        { name: "Asustado",         command: "walk_scared"        },
        { name: "Sexy",             command: "walk_sexy"          },
        { name: "Sospechoso",       command: "walk_shady"         },
        { name: "Lento",            command: "walk_slow"          },
        { name: "Stripper",         command: "walk_stripper"      },
        { name: "Swagger",          command: "walk_swagger"       },
        { name: "Swagger 2",        command: "walk_swagger2"      },
        { name: "Tenso",            command: "walk_tense"         },
        { name: "Rudo M",           command: "walk_tough"         },
        { name: "Rudo F",           command: "walk_tough2"        },
        { name: "Cinturón M",       command: "walk_toolbelt"      },
        { name: "Cinturón F",       command: "walk_toolbelt2"     },
        { name: "Basura",           command: "walk_trash"         },
        { name: "Tracey",           command: "walk_tracey"        },
        { name: "Trevor",           command: "walk_trevor"        },
        { name: "Muy Lento",        command: "walk_veryslow"      },
        { name: "Ancho",            command: "walk_wide"          },
        { name: "Zombie",           command: "walk_zombie"        },
    ],
    compartidas: [
        { name: "Handshake",        command: "handshake"    },
        { name: "Abrazo",           command: "hug"          },
        { name: "Abrazo Romántico", command: "hugr"         },
        { name: "Bro",              command: "bro"          },
        { name: "Dar Objeto",       command: "give"         },
        { name: "Baseball",         command: "baseball"     },
        { name: "Asaltar",          command: "stickup"      },
        { name: "Puñetazo",         command: "punch"        },
        { name: "Cabezazo",         command: "headbutt"     },
        { name: "Bofetada",         command: "slap"         },
        { name: "Bofetada 2",       command: "slap2"        },
        { name: "Cargar",           command: "carry"        },
        { name: "Cargar 2",         command: "carry3"       },
        { name: "CPR",              command: "cprs"         },
        { name: "CPR 2",            command: "cprs3"        },
        { name: "Rehén",            command: "hostage"      },
        { name: "Besarse",          command: "kiss"         },
        { name: "Besarse 2",        command: "kiss3"        },
        { name: "Abrazar Pose",     command: "hugpose"      },
        { name: "Cargar Cute",      command: "carrymecute"  },
        { name: "Sentarse Juntos",  command: "sitwithme"    },
        { name: "Foto Cute",        command: "cutepicpose"  },
        { name: "Corazón Manos",    command: "couplehhands" },
        { name: "Cargar a Cuestas", command: "pback"        },
        { name: "BFF Pose",         command: "bff"          },
        { name: "Hold Me",          command: "holdme"       },
        { name: "Hold Me 2",        command: "holdmec"      },
        { name: "Hold Me 3",        command: "holdmee"      },
    ],
    trabajo: [
        { name: "Escribir",       command: "write"      },
        { name: "Teléfono",       command: "phone"      },
        { name: "Llamada",        command: "call"       },
        { name: "Mecánico",       command: "mechanic"   },
        { name: "Médico",         command: "medic"      },
        { name: "Policía",        command: "police"     },
        { name: "Barrer",         command: "sweep"      },
        { name: "Cargar Caja",    command: "carrybox"   },
        { name: "Soldadura",      command: "weld"       },
        { name: "Pintar",         command: "paint"      },
    ],
    props: [
        { name: "Paraguas",           command: "umbrella"      },
        { name: "Paraguas 2",         command: "umbrella2"     },
        { name: "Bloc de Notas",      command: "notepad"       },
        { name: "Caja",               command: "box"           },
        { name: "Mazo",               command: "mallet"        },
        { name: "Sierra Craneal",     command: "cranialsaw"    },
        { name: "Pistola de Clavos",  command: "nailgun"       },
        { name: "Extintor",           command: "extinguisher"  },
        { name: "Bastón Twirl",       command: "batontwirl"    },
        { name: "Rosa",               command: "rose"          },
        { name: "Jeringa",            command: "syringe"       },
        { name: "Bisturí",            command: "scalpel"       },
        { name: "Sierra de Hueso",    command: "bonesaw"       },
        { name: "Billete",            command: "dollar"        },
        { name: "Quitar Casco",       command: "maskup"        },
        { name: "Poner Casco",        command: "maskdown"      },
        { name: "Quitar Máscara",     command: "masktakeoff"   },
        { name: "Ajustar Bolsa",      command: "adjustbag"     },
        { name: "Panel Control",      command: "adjustpanel"   },
        { name: "Fumar 2",            command: "smoke2"           },
        { name: "Fumar 3",            command: "smoke3"           },
        { name: "Fumar 4",            command: "smoke4"           },
        { name: "Fumar 6",            command: "smoke6"           },
        { name: "Vape",               command: "vape"             },
        { name: "Vape 2",             command: "vape2"            },
        { name: "Bong",               command: "bong"             },
        { name: "Bong 2",             command: "bong2"            },
        { name: "Pesca 1",            command: "fishing1"         },
        { name: "Pesca 2",            command: "fishing2"         },
        { name: "Pesca 3",            command: "fishing3"         },
        { name: "Maleta",             command: "suitcase"         },
        { name: "Maleta 2",           command: "suitcase2"        },
        { name: "Boombox",            command: "boombox"          },
        { name: "Caja Herramientas",  command: "toolbox"          },
        { name: "Caja Herr. 2",       command: "toolbox2"         },
        { name: "Caja Herr. 3",       command: "toolbox3"         },
        { name: "Caja Herr. 4",       command: "toolbox4"         },
        { name: "Caja de Dinero",     command: "cashbox"          },
        { name: "Bolsa Basura",       command: "gbag"             },
        { name: "Caja Cerveza",       command: "beerbox"          },
        { name: "Caja Cerveza 2",     command: "beerbox2"         },
        { name: "Ficha Policial",     command: "mugshot"          },
        { name: "Café",               command: "coffee"           },
        { name: "Whiskey",            command: "whiskey"          },
        { name: "Botella Whiskey",    command: "whiskeyb"         },
        { name: "Bartender Whiskey",  command: "whiskeybartender" },
    ],
    sentarse: [
        { name: "Sentarse",           command: "sit"         },
        { name: "Sentarse 2",         command: "sit2"        },
        { name: "Sentarse 3",         command: "sit3"        },
        { name: "Sentarse 4",         command: "sit4"        },
        { name: "Sentarse 5",         command: "sit5"        },
        { name: "Sentarse 6",         command: "sit6"        },
        { name: "Sentarse 7",         command: "sit7"        },
        { name: "Sentarse 8",         command: "sit8"        },
        { name: "Sentarse 9",         command: "sit9"        },
        { name: "Sentarse 10",        command: "sit10"       },
        { name: "Sentarse Triste",    command: "sitsad"      },
        { name: "Sentarse Lean",      command: "sitlean"     },
        { name: "Sentarse Lean 2",    command: "sitlean2"    },
        { name: "Sentarse Lean 3",    command: "sitlean3"    },
        { name: "Asustado",           command: "sitscared"   },
        { name: "Asustado 2",         command: "sitscared2"  },
        { name: "Asustado 3",         command: "sitscared3"  },
        { name: "Borracho",           command: "sitdrunk"    },
        { name: "Silla",              command: "sitchair"    },
        { name: "Silla 2",            command: "sitchair2"   },
        { name: "Silla 3",            command: "sitchair3"   },
        { name: "Silla 4 - Lado",     command: "sitchair4"   },
        { name: "Silla Piernas Cruz", command: "sitchair5"   },
        { name: "Silla Recostado",    command: "sitchair6"   },
        { name: "Silla Atento",       command: "sitchair7"   },
        { name: "Silla Solo",         command: "sitchair8"   },
        { name: "Baño",               command: "sittoilet"   },
        { name: "Baño 2",             command: "sittoilet2"  },
        { name: "Codo Ventana",       command: "elbow"       },
        { name: "Abdominales",        command: "situp"       },
    ],
};

// ============================================================
// ESTADO
// ============================================================
let favorites       = {};   // { "cat_cmd": true }
let sharedTimeout   = null;

// ============================================================
// ELEMENTOS DOM
// ============================================================
const container     = document.getElementById('anims-container');
const panel         = document.getElementById('anims-panel');
const searchInput   = document.getElementById('search-input');
const overlayClose  = document.getElementById('overlay-close');
const btnCloseMenu  = document.getElementById('btn-close-menu');
const sharedModal   = document.getElementById('shared-modal');
const sharedAnimName= document.getElementById('shared-anim-name');
const sharedTimerFill = document.getElementById('shared-timer-fill');
const btnAcceptShared = document.getElementById('btn-accept-shared');
const btnDeclineShared = document.getElementById('btn-decline-shared');

// ============================================================
// HELPERS
// ============================================================
function favKey(category, command) {
    return `${category}_${command}`;
}

function isFav(category, command) {
    return !!favorites[favKey(category, command)];
}

// ============================================================
// CONSTRUCCIÓN DE TARJETAS
// ============================================================
function buildCard(animObj, category) {
    const card = document.createElement('div');
    card.classList.add('anim-card');
    card.dataset.category = category;
    card.dataset.command  = animObj.command;

    const favActive = isFav(category, animObj.command) ? 'active' : '';

    card.innerHTML = `
        <div class="anim-card-info">
            <span class="anim-card-name">${animObj.name}</span>
            <span class="anim-card-cmd">/e ${animObj.command}</span>
        </div>
        <button class="anim-card-fav ${favActive}" title="Favorito">
            <i class="${favActive ? 'fa-solid' : 'fa-regular'} fa-star"></i>
        </button>
    `;

    // Click en la card (no en el botón favorito)
    card.addEventListener('click', (e) => {
        if (e.target.closest('.anim-card-fav')) return;
        fetch(`https://AX_Anims/playAnim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: animObj.command })
        });
    });

    // Click favorito
    const favBtn = card.querySelector('.anim-card-fav');
    favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(category, animObj.command, card);
    });

    return card;
}

// ============================================================
// POBLAR GRIDS
// ============================================================
function populateGrids() {
    const allGrid = document.getElementById('grid-todas');
    allGrid.innerHTML = '';

    const categories = ['expresiones','bailes','caminar','compartidas','trabajo','props','sentarse'];

    categories.forEach(cat => {
        const grid = document.getElementById(`grid-${cat}`);
        if (!grid) return;
        grid.innerHTML = '';

        ANIMATIONS[cat].forEach(anim => {
            const card = buildCard(anim, cat);
            grid.appendChild(card);

            // Clonar para "todas"
            const cardClone = buildCard(anim, cat);
            allGrid.appendChild(cardClone);
        });
    });
}

// ============================================================
// FAVORITOS
// ============================================================
function populateFavorites() {
    const grid  = document.getElementById('grid-favoritos');
    const empty = document.getElementById('empty-favoritos');
    grid.innerHTML = '';

    const keys = Object.keys(favorites);
    if (keys.length === 0) {
        empty.classList.add('visible');
        return;
    }
    empty.classList.remove('visible');

    keys.forEach(key => {
        const parts    = key.split('_');
        // category puede tener underscore? No, en este caso no.
        // Buscamos la animación
        let found = null;
        let foundCat = null;

        for (const [cat, anims] of Object.entries(ANIMATIONS)) {
            for (const anim of anims) {
                if (favKey(cat, anim.command) === key) {
                    found    = anim;
                    foundCat = cat;
                    break;
                }
            }
            if (found) break;
        }

        if (found) {
            const card = buildCard(found, foundCat);
            grid.appendChild(card);
        }
    });
}

function toggleFavorite(category, command, cardElement) {
    const key     = favKey(category, command);
    const favBtn  = cardElement.querySelector('.anim-card-fav');
    const icon    = favBtn.querySelector('i');
    const isNowFav = !favorites[key];

    if (isNowFav) {
        favorites[key] = true;
        favBtn.classList.add('active');
        icon.classList.replace('fa-regular','fa-solid');
    } else {
        delete favorites[key];
        favBtn.classList.remove('active');
        icon.classList.replace('fa-solid','fa-regular');
    }

    // Sincronizar todas las tarjetas con mismo key
    document.querySelectorAll(`.anim-card[data-category="${category}"][data-command="${command}"]`).forEach(c => {
        const fb = c.querySelector('.anim-card-fav');
        const ic = fb.querySelector('i');
        if (isNowFav) {
            fb.classList.add('active');
            ic.classList.replace('fa-regular','fa-solid');
        } else {
            fb.classList.remove('active');
            ic.classList.replace('fa-solid','fa-regular');
        }
    });

    fetch(`https://AX_Anims/toggleFavorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, command })
    });

    // Redibujar tab favoritos si está activa
    const favPanel = document.getElementById('tab-favoritos');
    if (favPanel.classList.contains('active')) {
        populateFavorites();
    }
}

// ============================================================
// TABS
// ============================================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = document.getElementById(`tab-${tab}`);
        if (panel) panel.classList.add('active');

        if (tab === 'favoritos') populateFavorites();

        // Limpiar búsqueda al cambiar de tab
        searchInput.value = '';
        filterAnims('');
    });
});

// ============================================================
// BÚSQUEDA
// ============================================================
searchInput.addEventListener('input', () => {
    filterAnims(searchInput.value.trim().toLowerCase());
});

function filterAnims(query) {
    const activePanel = document.querySelector('.tab-panel.active');
    if (!activePanel) return;

    const cards = activePanel.querySelectorAll('.anim-card');
    cards.forEach(card => {
        const name = card.querySelector('.anim-card-name').textContent.toLowerCase();
        const cmd  = card.querySelector('.anim-card-cmd').textContent.toLowerCase();
        const match = name.includes(query) || cmd.includes(query);
        card.style.display = match ? '' : 'none';
    });
}

// ============================================================
// ABRIR / CERRAR MENÚ
// ============================================================
function openMenu() {
    // Siempre resetear a tab TODAS
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="todas"]').classList.add('active');
    document.getElementById('tab-todas').classList.add('active');
    searchInput.value = '';

    container.classList.remove('hidden');
    panel.classList.remove('closing');
}

function closeMenu() {
    panel.classList.add('closing');
    panel.addEventListener('animationend', () => {
        container.classList.add('hidden');
        panel.classList.remove('closing');
        searchInput.value = '';
    }, { once: true });

    fetch(`https://AX_Anims/closeMenu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });
}

btnCloseMenu.addEventListener('click', closeMenu);
overlayClose.addEventListener('click', closeMenu);

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !container.classList.contains('hidden')) {
        closeMenu();
    }
});

// ============================================================
// MODAL COMPARTIDA
// ============================================================
btnAcceptShared.addEventListener('click', () => {
    clearTimeout(sharedTimeout);
    sharedModal.classList.add('hidden');
    fetch(`https://AX_Anims/acceptShared`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });
});

btnDeclineShared.addEventListener('click', () => {
    clearTimeout(sharedTimeout);
    sharedModal.classList.add('hidden');
    fetch(`https://AX_Anims/declineShared`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });
});

function showSharedModal(command, timeout) {
    // Buscar nombre de la animación
    let animName = command;
    for (const anim of ANIMATIONS.compartidas) {
        if (anim.command === command) { animName = anim.name; break; }
    }
    sharedAnimName.textContent = animName;

    // Timer visual
    sharedTimerFill.style.transition = 'none';
    sharedTimerFill.style.width = '100%';
    sharedModal.classList.remove('hidden');

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            sharedTimerFill.style.transition = `width ${timeout}s linear`;
            sharedTimerFill.style.width = '0%';
        });
    });

    sharedTimeout = setTimeout(() => {
        sharedModal.classList.add('hidden');
        fetch(`https://AX_Anims/declineShared`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
    }, timeout * 1000);
}

// ============================================================
// MENSAJES DESDE EL CLIENTE LUA
// ============================================================
window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || !data.action) return;

    switch (data.action) {

        case 'toggle':
            if (data.show) {
                openMenu();
            } else {
                if (!container.classList.contains('hidden')) closeMenu();
            }
            break;

        case 'setFavorites':
            favorites = data.favorites || {};
            populateGrids();
            populateFavorites();
            break;

        case 'sharedRequest':
            showSharedModal(data.command, data.timeout || 15);
            break;
    }
});

// ============================================================
// INIT
// ============================================================
populateGrids();