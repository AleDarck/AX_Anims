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
        { name: "Dance", command: "dance" },
        { name: "Dance 2", command: "dance2" },
        { name: "Dance 3", command: "dance3" },
        { name: "Dance 4", command: "dance4" },
        { name: "Dance 5", command: "dance5" },
        { name: "Dance 6", command: "dance6" },
        { name: "Dance 7", command: "dance7" },
        { name: "Dance 8", command: "dance8" },
        { name: "Dance 9", command: "dance9" },
        { name: "Dance F", command: "dancef" },
        { name: "Dance F2", command: "dancef2" },
        { name: "Dance F3", command: "dancef3" },
        { name: "Dance F4", command: "dancef4" },
        { name: "Dance F5", command: "dancef5" },
        { name: "Dance F6", command: "dancef6" },
        { name: "Dance Club", command: "danceclub" },
        { name: "Dance Club 2", command: "danceclubb" },
        { name: "Dance Club 3", command: "danceclubc" },
        { name: "Dance Club 4", command: "danceclubd" },
        { name: "Dance Club 5", command: "danceclube" },
        { name: "Dance Club 6", command: "danceclubf" },
        { name: "Dance Club 7", command: "danceclubg" },
        { name: "Dance Club 8", command: "danceclubh" },
        { name: "Dance Club 9", command: "danceclubi" },
        { name: "Dance Club 10", command: "danceclubj" },
        { name: "Dance Club 11", command: "danceclubk" },
        { name: "Dance Club 12", command: "danceclubl" },
        { name: "Dance Club 13", command: "danceclubm" },
        { name: "Dance Club 14", command: "danceclubn" },
        { name: "Dance Club 15", command: "danceclubo" },
        { name: "Dance Club 16", command: "danceclubp" },
        { name: "Dance Club 17", command: "danceclubq" },
        { name: "Dance Drink (Beer)", command: "dancedrink" },
        { name: "Dance Drink 2 (Wine)", command: "dancedrink2" },
        { name: "Dance Drink 3 (Whiskey)", command: "dancedrink3" },
        { name: "Dance Drink 4 (Whiskey)", command: "dancedrink4" },
        { name: "Dance Drink 5 (Wine)", command: "dancedrink5" },
        { name: "Dance Drink 6 (Beer)", command: "dancedrink6" },
        { name: "Dance Drink 7 (Wine)", command: "dancedrink7" },
        { name: "Dance Drink 8 (Wine)", command: "dancedrink8" },
        { name: "Dance Drink 9 (Beer)", command: "dancedrink9" },
        { name: "Dance Slow", command: "danceslow" },
        { name: "Dance Slow 2", command: "danceslow2" },
        { name: "Dance Slow 3", command: "danceslow3" },
        { name: "Dance Slow 4", command: "danceslow4" },
        { name: "Dance Upper", command: "danceupper" },
        { name: "Dance Upper 2", command: "danceupper2" },
        { name: "Dance Shy", command: "danceshy" },
        { name: "Dance Shy 2", command: "danceshy2" },
        { name: "Dance Shy 3", command: "danceshy3" },
        { name: "Dance Old", command: "danceold" },
        { name: "Dance Silly", command: "dancesilly" },
        { name: "Dance Silly 1", command: "dancesilly1" },
        { name: "Dance Silly 2", command: "dancesilly2" },
        { name: "Dance Silly 3", command: "dancesilly3" },
        { name: "Dance Silly 4", command: "dancesilly4" },
        { name: "Dance Silly 5", command: "dancesilly5" },
        { name: "Dance Silly 6", command: "dancesilly6" },
        { name: "Dance Silly 7", command: "dancesilly7" },
        { name: "Dance Silly 8", command: "dancesilly8" },
        { name: "Dance Silly 9", command: "dancesilly9" },
        { name: "Dance Silly 10", command: "dancesilly10" },
        { name: "Dance Silly 11", command: "dancesilly11" },
        { name: "Dance Silly 12", command: "dancesilly12" },
        { name: "Dance Glowsticks", command: "danceglowstick" },
        { name: "Dance Glowsticks 2", command: "danceglowstick2" },
        { name: "Dance Glowsticks 3", command: "danceglowstick3" },
        { name: "Dance Horse", command: "dancehorse" },
        { name: "Dance Horse 2", command: "dancehorse2" },
        { name: "Dance Horse 3", command: "dancehorse3" },
        { name: "Wave Dance", command: "dancewave" },
        { name: "Wave Dance 2", command: "dancewave02" },
        { name: "Wave Dance 3", command: "dancewave03" },
        { name: "Wave Dance 4", command: "dancewave04" },
        { name: "Wave Dance 5 - Tutankhamen", command: "dancewave05" },
        { name: "Wave Dance 6 - Tutankhamen 2", command: "dancewave06" },
        { name: "Wave Dance 7 - Snake Dance", command: "dancewave07" },
        { name: "Wave Dance 8 - Slide Dance", command: "dancewave08" },
        { name: "Wave Dance 9 - Slide Dance 2", command: "dancewave09" },
        { name: "Wave Dance 10 - Robot Dance", command: "dancewave10" },
        { name: "Wave Dance 11 - Locking Dance", command: "dancewave11" },
        { name: "Wave Dance 12 - Headspin", command: "dancewave12" },
        { name: "Wave Dance 13 - Flaire Dance", command: "dancewave13" },
        { name: "Wave Dance 14 - Female Crowd Dance", command: "dancewave14" },
        { name: "Wave Dance 15 - Rock Up Dance", command: "dancewave15" },
        { name: "Dance - Zombie", command: "zompopdance" },
        { name: "DJ", command: "dj" },
        { name: "DJ 1", command: "dj1" },
        { name: "DJ 2", command: "dj2" },
        { name: "DJ 3", command: "dj3" },
        { name: "DJ 4", command: "dj4" },
        { name: "DJ 5", command: "dj5" },
        { name: "DJ 6", command: "dj6" },
        { name: "DJ 7", command: "dj7" },
        { name: "DJ 8", command: "dj8" },
        { name: "DJ 9", command: "dj9" },
        { name: "DJ 10", command: "dj10" },
        { name: "DJ 11", command: "dj11" },
        { name: "DJ 12", command: "dj12" },
        { name: "Twerk", command: "twerk" },
        { name: "Lapdance", command: "lapdance" },
        { name: "Lapdance 2", command: "lapdance2" },
        { name: "Lapdance 3", command: "lapdance3" },
        { name: "Lapdance 4", command: "lapdance4" },
        { name: "Lapdance 5", command: "lapdance5" },
        { name: "Lapdance 6", command: "lapdance6" },
        { name: "Lapdance With", command: "lapdancewith" },
        { name: "Lapdance With 2", command: "lapdancewith2" },
        { name: "Lapdance With 3", command: "lapdancewith3" },
        { name: "Lap Chair", command: "lapchair" },
        { name: "Lap Chair 2", command: "lapchair2" },
        { name: "Lap Chair 3", command: "lapchair3" },
        { name: "Salsa Roll", command: "salsa" },
        { name: "Dance Crank Dat", command: "dancecrankdat" },
        { name: "Dance Crank Dat 2", command: "dancecrankdat2" },
        { name: "Monkey Dance", command: "dancemonkey" },
        { name: "Monkey Dance 2", command: "dancemonkey2" },
        { name: "Monkey Dance 3", command: "dancemonkey3" },
        { name: "Boxing Dance Solo", command: "boxdance" },
        { name: "Hip Hop Dance", command: "dancehiphop" },
        { name: "Hip Hop Dance 2", command: "dancehiphop2" },
        { name: "Hip Hop Dance 3", command: "dancehiphop3" },
        { name: "Drill Dance", command: "dancedrill" },
        { name: "Techno Dance", command: "technodance" },
        { name: "Techno Dance 2", command: "technodance2" },
        { name: "Techno Dance 3", command: "technodance3" },
        { name: "Techno Dance 4", command: "technodance4" },
        { name: "Dance Pride A - Rainbow", command: "dancepride" },
        { name: "Dance Pride B - LGBTQIA", command: "danceprideb" },
        { name: "Dance Pride A - Bisexual", command: "dancepridea" },
        { name: "Dance Pride C - Lesbian", command: "dancepridec" },
        { name: "Dance Pride D - Pansexual", command: "danceprided" },
        { name: "Dance Pride E - Transgender", command: "dancepridee" },
        { name: "Dance Pride F - Non Binary", command: "dancepridef" },
        { name: "Dance Pride G - Asexual", command: "danceprideg" },
        { name: "Dance Pride H - Straight Ally", command: "danceprideh" },
    ],
    caminar: [
        { name: "Normal", command: "walk_normal" },
        { name: "Alien", command: "walk_alien" },
        { name: "Armored", command: "walk_armored" },
        { name: "Arrogant", command: "walk_arrogant" },
        { name: "Butch", command: "walk_butch" },
        { name: "Butch 2", command: "walk_butch2" },
        { name: "Butch 3", command: "walk_butch3" },
        { name: "Bigfoot", command: "walk_bigfoot" },
        { name: "Buzzed", command: "walk_buzzed" },
        { name: "Brave", command: "walk_brave" },
        { name: "Brave 2", command: "walk_brave2" },
        { name: "Brave 3", command: "walk_brave3" },
        { name: "Casey", command: "walk_casey" },
        { name: "Casual", command: "walk_casual" },
        { name: "Casual 2", command: "walk_casual2" },
        { name: "Casual 3", command: "walk_casual3" },
        { name: "Casual 4", command: "walk_casual4" },
        { name: "Casual 5", command: "walk_casual5" },
        { name: "Casual 6", command: "walk_casual6" },
        { name: "Chichi", command: "walk_chichi" },
        { name: "Confident", command: "walk_confident" },
        { name: "Cop", command: "walk_cop" },
        { name: "Cop 2", command: "walk_cop2" },
        { name: "Cop 3", command: "walk_cop3" },
        { name: "Coward", command: "walk_coward" },
        { name: "Chubby Male", command: "walk_chubbymale" },
        { name: "Chubby Female", command: "walk_chubbyfemale" },
        { name: "Dave", command: "walk_dave" },
        { name: "Default Female", command: "walk_defaultfemale" },
        { name: "Default Male", command: "walk_defaultmale" },
        { name: "Depressed", command: "walk_depressed" },
        { name: "Depressed 2", command: "walk_depressed2" },
        { name: "Depressed 3", command: "walk_depressed3" },
        { name: "Depressed 4", command: "walk_depressed4" },
        { name: "Dreyfuss", command: "walk_dreyfuss" },
        { name: "Drunk", command: "walk_drunk" },
        { name: "Drunk 2 - Buzzed", command: "walk_drunk2" },
        { name: "Drunk 3 - Moderate", command: "walk_drunk3" },
        { name: "Drunk 4 - Moderate 2", command: "walk_drunk4" },
        { name: "Drunk 5 - Slightly Drunk", command: "walk_drunk5" },
        { name: "Drunk 6 - Very Drunk", command: "walk_drunk6" },
        { name: "Fat Male", command: "walk_fat" },
        { name: "Fat Female", command: "walk_fat2" },
        { name: "Fat & Bulky", command: "walk_fat3" },
        { name: "Fat Female 2", command: "walk_fat4" },
        { name: "Femme", command: "walk_femme" },
        { name: "Femme 2", command: "walk_femme2" },
        { name: "Fire", command: "walk_fire" },
        { name: "Fire 2", command: "walk_fire2" },
        { name: "Fire 3", command: "walk_fire3" },
        { name: "Flee", command: "walk_flee" },
        { name: "Flee 2", command: "walk_flee2" },
        { name: "Flee 3", command: "walk_flee3" },
        { name: "Flee 4", command: "walk_flee4" },
        { name: "Flee 5", command: "walk_flee5" },
        { name: "Floyd", command: "walk_floyd" },
        { name: "Franklin", command: "walk_franklin" },
        { name: "Gangster", command: "walk_gangster" },
        { name: "Gangster 2", command: "walk_gangsterb" },
        { name: "Gangster 3", command: "walk_gangsterc" },
        { name: "Gangster 4", command: "walk_gangsterd" },
        { name: "Gangster 5", command: "walk_gangstere" },
        { name: "Gangster 6", command: "walk_gangsterf" },
        { name: "Gangster 7", command: "walk_gangsterg" },
        { name: "Gangster 8", command: "walk_gangsterh" },
        { name: "Gangster 9", command: "walk_gangsteri" },
        { name: "Gangster 10", command: "walk_gangsterj" },
        { name: "Gangster 11", command: "walk_gangsterk" },
        { name: "Gangster 12", command: "walk_gangsterl" },
        { name: "Gangster 13", command: "walk_gangsterm" },
        { name: "Gangster 14", command: "walk_gangstern" },
        { name: "Generic Male", command: "walk_generic" },
        { name: "Generic Female", command: "walk_generic2" },
        { name: "Grooving Male", command: "walk_grooving" },
        { name: "Grooving Female", command: "walk_grooving2" },
        { name: "Guard", command: "walk_guard" },
        { name: "Handcuffs", command: "walk_handcuffs" },
        { name: "Heels", command: "walk_heels" },
        { name: "Heels 2", command: "walk_heels2" },
        { name: "Hiking", command: "walk_hiking" },
        { name: "Hiking 2", command: "walk_hiking2" },
        { name: "Hipster", command: "walk_hipster" },
        { name: "Hobo", command: "walk_hobo" },
        { name: "Hobo 2", command: "walk_hobo2" },
        { name: "Hurry Male", command: "walk_hurry" },
        { name: "Hurry Female", command: "walk_hurry2" },
        { name: "Hurry Female 2", command: "walk_hurry3" },
        { name: "Hurry 4", command: "walk_hurry4" },
        { name: "Hurry 5", command: "walk_hurry5" },
        { name: "Injured", command: "walk_injured" },
        { name: "Injured 2 - Female", command: "walk_injured2" },
        { name: "Intimidation", command: "walk_intimidation" },
        { name: "Intimidation 2", command: "walk_intimidation2" },
        { name: "Intimidation 3", command: "walk_intimidation3" },
        { name: "Janitor", command: "walk_janitor" },
        { name: "Janitor 2", command: "walk_janitor2" },
        { name: "Jimmy", command: "walk_jimmy" },
        { name: "Jog", command: "walk_jog" },
        { name: "Lamar", command: "walk_lamar" },
        { name: "Lamar 2", command: "walk_lamar2" },
        { name: "Lester", command: "walk_lester" },
        { name: "Lester 2", command: "walk_lester2" },
        { name: "Maneater", command: "walk_maneater" },
        { name: "Michael", command: "walk_michael" },
        { name: "Money", command: "walk_money" },
        { name: "Muscle", command: "walk_muscle" },
        { name: "Nervous", command: "walk_nervous" },
        { name: "Patricia", command: "walk_patricia" },
        { name: "Paramedic", command: "walk_paramedic" },
        { name: "Posh", command: "walk_posh" },
        { name: "Posh 2", command: "walk_posh2" },
        { name: "Quick", command: "walk_quick" },
        { name: "Ron", command: "walk_ron" },
        { name: "Runner", command: "walk_runner" },
        { name: "Sad Male", command: "walk_sad" },
        { name: "Sad Male 2", command: "walk_sad2" },
        { name: "Sad Male 3", command: "walk_sad3" },
        { name: "Sad Female", command: "walk_sad4" },
        { name: "Sad Female 2", command: "walk_sad5" },
        { name: "Sassy", command: "walk_sassy" },
        { name: "Sassy 2", command: "walk_sassy2" },
        { name: "Scared", command: "walk_scared" },
        { name: "Sexy", command: "walk_sexy" },
        { name: "Shady", command: "walk_shady" },
        { name: "Slow", command: "walk_slow" },
        { name: "Stripper", command: "walk_stripper" },
        { name: "Swagger", command: "walk_swagger" },
        { name: "Swagger 2", command: "walk_swagger2" },
        { name: "Tense", command: "walk_tense" },
        { name: "Tough", command: "walk_tough" },
        { name: "Tough 2", command: "walk_tough2" },
        { name: "Toolbelt Male", command: "walk_toolbelt" },
        { name: "Toolbelt Female", command: "walk_toolbelt2" },
        { name: "Trash", command: "walk_trash" },
        { name: "Trash 2", command: "walk_trash2" },
        { name: "Tracey", command: "walk_tracey" },
        { name: "Trevor", command: "walk_trevor" },
        { name: "Very Slow", command: "walk_veryslow" },
        { name: "Wide", command: "walk_wide" },
        { name: "Zombie", command: "walk_zombie" },
    ],
    compartidas: [
        { name: "Handshake", command: "handshake" },
        { name: "Handshake 2", command: "handshake2" },
        { name: "Hug", command: "hug" },
        { name: "Hug 2", command: "hug2" },
        { name: "Hug Romántico 1", command: "hugr" },
        { name: "Hug Romántico 2", command: "hugr2" },
        { name: "Bro", command: "bro" },
        { name: "Bro 2", command: "bro2" },
        { name: "Give", command: "give" },
        { name: "Give 2", command: "give2" },
        { name: "Baseball", command: "baseball" },
        { name: "Baseball Throw", command: "baseballthrow" },
        { name: "Stick Up", command: "stickup" },
        { name: "Stickup Scared", command: "stickupscared" },
        { name: "Punch", command: "punch" },
        { name: "Punched", command: "punched" },
        { name: "Headbutt", command: "headbutt" },
        { name: "Headbutted", command: "headbutted" },
        { name: "Slap", command: "slap" },
        { name: "Slap 2", command: "slap2" },
        { name: "Slapped", command: "slapped" },
        { name: "Slapped 2", command: "slapped2" },
        { name: "Carry", command: "carry" },
        { name: "Be Carried", command: "carry2" },
        { name: "Carry 2", command: "carry3" },
        { name: "Be Carried 2", command: "carry4" },
        { name: "Carry Me Cute", command: "carrymecute" },
        { name: "Carry Me Cute 2", command: "carrymecute2" },
        { name: "Carry Me Cute 3", command: "carrycmg" },
        { name: "Carry Me Cute 4", command: "carrycmg2" },
        { name: "Best Friends 1", command: "bestfriends" },
        { name: "Best Friends 2", command: "bestfriends2" },
        { name: "BFF Pose", command: "bff" },
        { name: "BFF Pose 2", command: "bffb" },
        { name: "Sit With Me", command: "sitwithmepose" },
        { name: "Sit With Me Please?", command: "sitwithmepose2" },
        { name: "Hug Pose", command: "hugpose" },
        { name: "Hug Pose With Me?", command: "hugpose2" },
        { name: "Hug Pose Tippy Toes", command: "hugtip" },
        { name: "Hug Pose Tippy Toes 2", command: "hugtip2" },
        { name: "Cute Pic Pose", command: "cutepicpose" },
        { name: "Cute Pic Pose 2", command: "cutepicpose2" },
        { name: "Couple Heart Hands", command: "couplehhands" },
        { name: "Couple Heart Hands 2", command: "couplehhands2" },
        { name: "Couple Wedding Pose 1A", command: "couplewed1a" },
        { name: "Couple Wedding Pose 1B", command: "couplewed1b" },
        { name: "Couple Wedding Pose 2A", command: "couplewed2a" },
        { name: "Couple Wedding Pose 2B", command: "couplewed2b" },
        { name: "Lift Me", command: "liftme" },
        { name: "Lift Me 2", command: "liftme2" },
        { name: "Lift Me 3", command: "liftme3" },
        { name: "Lift Me 4", command: "liftme4" },
        { name: "Lift Me 5", command: "liftme5" },
        { name: "Lift Me 6", command: "liftme6" },
        { name: "Carry Small Dog", command: "csdog" },
        { name: "Small Dog Carried", command: "csdog2" },
        { name: "Carry Small Dog 2", command: "csdog3" },
        { name: "Small Dog Carried 2", command: "csdog4" },
        { name: "Carry Cat", command: "ccat" },
        { name: "Be Carried - Cat", command: "ccat2" },
        { name: "Carry Big Dog", command: "cbdog" },
        { name: "Big Dog Carried", command: "cbdog2" },
        { name: "Offer Piggy Back", command: "pback" },
        { name: "Be Piggy Backed", command: "pback2" },
        { name: "Give CPR", command: "cprs" },
        { name: "Get CPR", command: "cprs2" },
        { name: "Give CPR 2", command: "cprs3" },
        { name: "Get CPR 2", command: "cprs4" },
        { name: "Take Hostage", command: "hostage" },
        { name: "Be Hostage", command: "hostage2" },
        { name: "Search", command: "search" },
        { name: "Be Searched", command: "search2" },
        { name: "Follow A (Front)", command: "followa" },
        { name: "Follow B (Back)", command: "followb" },
        { name: "Kiss", command: "kiss" },
        { name: "Kiss 2", command: "kiss2" },
        { name: "Kiss 3", command: "kiss3" },
        { name: "Kiss 4", command: "kiss4" },
        { name: "Kiss Cute - Neck (Male)", command: "kisscuteneck" },
        { name: "Kiss Cute - Neck (Female)", command: "kisscuteneck2" },
        { name: "Kiss Cute Cheek (Male)", command: "kisscutecheek" },
        { name: "Kiss Cute Cheek (Female)", command: "kisscutecheek2" },
        { name: "Kiss Forehead (Male)", command: "kisscutefh" },
        { name: "Kiss Forehead (Female)", command: "kisscutefh2" },
        { name: "Kiss Cute Lips (Female)", command: "kisslips" },
        { name: "Kiss Cute Lips (Male)", command: "kisslips2" },
        { name: "Couple Drinking (Wine Glasses)", command: "coupleanim" },
        { name: "Couple Drinking F (Wine Glasses)", command: "coupleanim2" },
        { name: "Hold Me", command: "holdme" },
        { name: "Be Held", command: "holdmeb" },
        { name: "Hold Me 2", command: "holdmec" },
        { name: "Be Held 2", command: "holdmed" },
        { name: "Hold Me 3", command: "holdmee" },
        { name: "Be Held 3", command: "holdmef" },
    ],
    escenarios: [
        // ESCENARIOS
        { name: "ATM", command: "atm" },
        { name: "BBQ", command: "bbq" },
        { name: "Bum Bin", command: "bumbin" },
        { name: "Cheer", command: "cheer" },
        { name: "Chinup", command: "chinup" },
        { name: "Clipboard 2", command: "clipboard2" },
        { name: "Cop", command: "cop" },
        { name: "Construction Drilling", command: "drill" },
        { name: "Film Shocking", command: "filmshocking" },
        { name: "Flex", command: "flex" },
        { name: "Guard", command: "guard" },
        { name: "Gardening", command: "garden" },
        { name: "Hammer", command: "hammer" },
        { name: "Hangout", command: "hangout" },
        { name: "Impatient", command: "impatient" },
        { name: "Janitor", command: "janitor" },
        { name: "Jog", command: "jog" },
        { name: "Kneel", command: "kneel" },
        { name: "Lean", command: "lean" },
        { name: "Lean Bar", command: "leanbar" },
        { name: "Lookout", command: "lookout" },
        { name: "Maid", command: "maid" },
        { name: "Medic", command: "medic" },
        { name: "Musician", command: "musician" },
        { name: "Notepad 2", command: "notepad2" },
        { name: "Parking Meter", command: "parkingmeter" },
        { name: "Party", command: "party" },
        { name: "Texting", command: "texting" },
        { name: "Prostitute High", command: "prosthigh" },
        { name: "Prostitute Low", command: "prostlow" },
        { name: "Puddle", command: "puddle" },
        { name: "Record", command: "record" },
        { name: "Smoke", command: "smoke" },
        { name: "Smoke Weed (Male)", command: "smokeweed" },
        { name: "Smoke Weed (Female)", command: "smokeweed2" },
        { name: "Statue", command: "statue" },
        { name: "Weld", command: "weld" },
        { name: "Window Shop", command: "windowshop" },
        { name: "Yoga", command: "yoga" },
        // EXPRESIONES
        { name: "Annoyed", command: "annoyed" },
        { name: "Dispenser", command: "dispenser" },
        { name: "Handcuffed - Front", command: "cuffedfront" },
        { name: "Handcuffed - Back", command: "cuffedback" },
        { name: "Dazzle Me Pose 1", command: "dazzle1" },
        { name: "Dazzle Me Pose 2", command: "dazzle2" },
        { name: "Dazzle Me Pose 3", command: "dazzle3" },
        { name: "Dazzle Me Pose 4", command: "dazzle4" },
        { name: "Dazzle Me Pose 5", command: "dazzle5" },
        { name: "Dazzle Me Pose 6", command: "dazzle6" },
        { name: "Dazzle Me Pose 7", command: "dazzle7" },
        { name: "Play Dead Act", command: "dead2" },
        { name: "Female Stand Cute Pose", command: "femalestandcute" },
        { name: "Female Stand Cute Pose 1", command: "femalestandcute1" },
        { name: "Female Stand Cute Pose 2", command: "femalestandcute2" },
        { name: "Female Stand Cute Pose 3", command: "femalestandcute3" },
        { name: "Female Stand Cute Pose Finger", command: "femalestandcutefinger" },
        { name: "Female Stand Cute Pose 4", command: "femalestandcute4" },
        { name: "Male Stand Pose", command: "malestandpose" },
        { name: "Female Sit Cute", command: "femalesitcute" },
        { name: "Female Sit Cute 1", command: "femalesitcute1" },
        { name: "Female Sit Cute 2", command: "femalesitcute2" },
        { name: "Female On Knees Pose", command: "femaleonknees" },
        { name: "Female On Knees Pose 1", command: "femaleonknees1" },
        { name: "Female On Knees Pose 2", command: "femaleonknees2" },
        { name: "Fashion Pose 1", command: "fashionpose1" },
        { name: "Fashion Pose 2", command: "fashionpose2" },
        { name: "Fashion Pose 3", command: "fashionpose3" },
        { name: "Fashion Pose 4", command: "fashionpose4" },
        { name: "Fashion Pose 5", command: "fashionpose5" },
        { name: "Fashion Pose 6", command: "fashionpose6" },
        { name: "Fashion Pose 7", command: "fashionpose7" },
        { name: "Fashion Pose 8", command: "fashionpose8" },
        { name: "Fashion Pose 9", command: "fashionpose9" },
        { name: "Beast", command: "beast" },
        { name: "Chill", command: "chill" },
        { name: "Cloudgaze", command: "cloudgaze" },
        { name: "Cloudgaze 2", command: "cloudgaze2" },
        { name: "Crouch & Reach", command: "crouchreach" },
        { name: "Crouch & Reach 2", command: "crouchreach2" },
        { name: "Daydream In The Clouds", command: "daydream" },
        { name: "UwU 2", command: "uwu2" },
        { name: "Rawr", command: "rawr" },
        { name: "Stop", command: "stop" },
        { name: "Sassy", command: "sassy" },
        { name: "Sit Sad 3", command: "sitsad3" },
        { name: "Sit Sad 4", command: "sitsad4" },
        { name: "Bend Over", command: "bend" },
        { name: "Prone", command: "prone" },
        { name: "Pullover", command: "pullover" },
        { name: "Idle", command: "idle" },
        { name: "Idle 2", command: "idle2" },
        { name: "Idle 3", command: "idle3" },
        { name: "Idle 4", command: "idle4" },
        { name: "Idle 5", command: "idle5" },
        { name: "Idle 6", command: "idle6" },
        { name: "Idle 7", command: "idle7" },
        { name: "Idle 8", command: "idle8" },
        { name: "Idle 9", command: "idle9" },
        { name: "Idle 10", command: "idle10" },
        { name: "Idle 11", command: "idle11" },
        { name: "Idle 12", command: "idle12" },
        { name: "Idle 13", command: "idle13" },
        { name: "Idle 14", command: "idle14" },
        { name: "Idle 15", command: "idle15" },
        { name: "Idle 16", command: "idle16" },
        { name: "Idle 17", command: "idle17" },
        { name: "Idle 18", command: "idle18" },
        { name: "Idle 19", command: "idle19" },
        { name: "Idle Drunk", command: "idledrunk" },
        { name: "Idle Drunk 2", command: "idledrunk2" },
        { name: "Idle Drunk 3", command: "idledrunk3" },
        { name: "Impatient 2", command: "impatient2" },
        { name: "Air Guitar", command: "airguitar" },
        { name: "Air Synth", command: "airsynth" },
        { name: "Argue", command: "argue" },
        { name: "Argue 2", command: "argue2" },
        { name: "Argue 3", command: "argue3" },
        { name: "Argue 4", command: "argue4" },
        { name: "Argue Angry 1", command: "argue5" },
        { name: "Argue Angry 2", command: "argue6" },
        { name: "Argue 7", command: "argue7" },
        { name: "Argue 8", command: "argue8" },
        { name: "Argue 9", command: "argue9" },
        { name: "Bartender", command: "bartender" },
        { name: "Blow Kiss", command: "blowkiss" },
        { name: "Blow Kiss 2", command: "blowkiss2" },
        { name: "Curtsy", command: "curtsy" },
        { name: "Bring It On", command: "bringiton" },
        { name: "Come At Me Bro", command: "comeatmebro" },
        { name: "Cop 2", command: "cop2" },
        { name: "Cop 3", command: "cop3" },
        { name: "Crossarms", command: "crossarms" },
        { name: "Crossarms 2", command: "crossarms2" },
        { name: "Crossarms 3", command: "crossarms3" },
        { name: "Crossarms 4", command: "crossarms4" },
        { name: "Crossarms 5", command: "crossarms5" },
        { name: "Crossarms 6", command: "crossarms6" },
        { name: "Crossarms 7", command: "crossarms7" },
        { name: "Crossarms 8", command: "crossarms8" },
        { name: "Crossarms 9", command: "crossarms9" },
        { name: "Fold Arms", command: "foldarms" },
        { name: "Fold Arms 2", command: "foldarms2" },
        { name: "Crossarms Side", command: "crossarmsside" },
        { name: "Crossarms Side 2", command: "crossarmsside2" },
        { name: "Damn", command: "damn" },
        { name: "Damn 2", command: "damn2" },
        { name: "Devastated", command: "devestated" },
        { name: "Point Down", command: "pointdown" },
        { name: "Point Pose", command: "pointpose" },
        { name: "Surrender", command: "surrender" },
        { name: "Surrender 2", command: "surrender2" },
        { name: "Surrender 3", command: "surrender3" },
        { name: "Surrender 4", command: "surrender4" },
        { name: "Surrender 5", command: "surrender5" },
        { name: "Surrender 6", command: "surrender6" },
        { name: "Surrender 7", command: "surrender7" },
        { name: "Surrender 8", command: "surrender8" },
        { name: "Facepalm", command: "facepalm" },
        { name: "Facepalm 2", command: "facepalm2" },
        { name: "Facepalm 3", command: "facepalm3" },
        { name: "Facepalm 4", command: "facepalm4" },
        { name: "Fall Over", command: "fallover" },
        { name: "Fall Over 2", command: "fallover2" },
        { name: "Fall Over 3", command: "fallover3" },
        { name: "Fall Over 4", command: "fallover4" },
        { name: "Fall Over 5", command: "fallover5" },
        { name: "Fall Asleep", command: "fallasleep" },
        { name: "Fall Asleep 2", command: "fallasleep2" },
        { name: "Fight Me", command: "fightme" },
        { name: "Fight Me 2", command: "fightme2" },
        { name: "Finger", command: "finger" },
        { name: "Finger 2", command: "finger2" },
        { name: "Wait", command: "wait" },
        { name: "Wait 2", command: "wait2" },
        { name: "Wait 3", command: "wait3" },
        { name: "Wait 4", command: "wait4" },
        { name: "Wait 5", command: "wait5" },
        { name: "Wait 6", command: "wait6" },
        { name: "Wait 7", command: "wait7" },
        { name: "Wait 8", command: "wait8" },
        { name: "Wait 9", command: "wait9" },
        { name: "Wait 10", command: "wait10" },
        { name: "Wait 11", command: "wait11" },
        { name: "Wait 12", command: "wait12" },
        { name: "Wait 13", command: "wait13" },
        { name: "Hiking", command: "hiking" },
        { name: "Hug Me", command: "hugme" },
        { name: "Hug Me 2", command: "hugme2" },
        { name: "Inspect", command: "inspect" },
        { name: "Inspect 2", command: "inspect2" },
        { name: "Inspect 3", command: "inspect3" },
        { name: "Jazzhands", command: "jazzhands" },
        { name: "Jog 2", command: "jog2" },
        { name: "Jog 3", command: "jog3" },
        { name: "Jog 4", command: "jog4" },
        { name: "Jog 5", command: "jog5" },
        { name: "Jumping Jacks", command: "jumpingjacks" },
        { name: "Kneel 2", command: "kneel2" },
        { name: "Kneel 3", command: "kneel3" },
        { name: "Kneel 4", command: "kneel4" },
        { name: "Kneel 5", command: "kneel5" },
        { name: "Kneel Hide", command: "kneelhide" },
        { name: "Kneel And Cry", command: "kneelcry" },
        { name: "Kneel Thot Instagram", command: "kneelthot" },
        { name: "Kneel Bored Pose", command: "kneelbored" },
        { name: "Kneel Peace Sign Pose", command: "kneelpeace" },
        { name: "Shoe Kick Pose", command: "shoepose" },
        { name: "Rap / Sing", command: "rap" },
        { name: "Squat Gun Pose - Left", command: "squatgunpose" },
        { name: "Squat Gun Pose 3", command: "squatgunpose3" },
        { name: "Knock", command: "knock" },
        { name: "Knock 2", command: "knock2" },
        { name: "Knuckle Crunch", command: "knucklecrunch" },
        { name: "Lean 2", command: "lean2" },
        { name: "Lean 3", command: "lean3" },
        { name: "Lean 4", command: "lean4" },
        { name: "Lean 5", command: "lean5" },
        { name: "Lean 6", command: "lean6" },
        { name: "Lean Flirt", command: "leanflirt" },
        { name: "Lean Bar 2", command: "leanbar2" },
        { name: "Lean Bar 3", command: "leanbar3" },
        { name: "Lean Bar 4", command: "leanbar4" },
        { name: "Lean High", command: "leanhigh" },
        { name: "Lean High 2", command: "leanhigh2" },
        { name: "Leanside", command: "leanside" },
        { name: "Leanside 2", command: "leanside2" },
        { name: "Leanside 3", command: "leanside3" },
        { name: "Leanside 4", command: "leanside4" },
        { name: "Leanside 5", command: "leanside5" },
        { name: "Lean On Table", command: "leanplan" },
        { name: "Me", command: "me" },
        { name: "Mechanic", command: "mechanic" },
        { name: "Mechanic 2", command: "mechanic2" },
        { name: "Mechanic 3", command: "mechanic3" },
        { name: "Mechanic 4", command: "mechanic4" },
        { name: "Mechanic 5", command: "mechanic5" },
        { name: "Medic 2", command: "medic2" },
        { name: "Meditate", command: "meditate" },
        { name: "Meditate 2", command: "meditate2" },
        { name: "Meditate 3", command: "meditate3" },
        { name: "Metal", command: "metal" },
        { name: "No", command: "no" },
        { name: "No 2", command: "no2" },
        { name: "Nose Pick", command: "nosepick" },
        { name: "No Way", command: "noway" },
        { name: "OK", command: "ok" },
        { name: "Dock", command: "dock" },
        { name: "Out of Breath", command: "outofbreath" },
        { name: "Pickup", command: "pickup" },
        { name: "Push", command: "push" },
        { name: "Push 2", command: "push2" },
        { name: "Point", command: "point" },
        { name: "Pushup", command: "pushup" },
        { name: "Countdown", command: "countdown" },
        { name: "Point Right", command: "pointright" },
        { name: "Salute", command: "salute" },
        { name: "Salute 2", command: "salute2" },
        { name: "Salute 3", command: "salute3" },
        { name: "Scared", command: "scared" },
        { name: "Scared 2", command: "scared2" },
        { name: "Scared 3", command: "scared3" },
        { name: "Screw You", command: "screwyou" },
        { name: "Shake Off", command: "shakeoff" },
        { name: "Shot", command: "shot" },
        { name: "Sleep", command: "sleep" },
        { name: "Bum Sleep", command: "bumsleep" },
        { name: "Shrug", command: "shrug" },
        { name: "Shrug 2", command: "shrug2" },
        { name: "Sit", command: "sit" },
        { name: "Sit 2", command: "sit2" },
        { name: "Sit 3", command: "sit3" },
        { name: "Sit 4", command: "sit4" },
        { name: "Sit 5", command: "sit5" },
        { name: "Sit 6", command: "sit6" },
        { name: "Sit 7", command: "sit7" },
        { name: "Sit 8", command: "sit8" },
        { name: "Sit 9", command: "sit9" },
        { name: "Sit 10", command: "sit10" },
        { name: "Sit Middle Finger", command: "sitfu" },
        { name: "Welcome Back", command: "welcomeback" },
        { name: "Wall Pose", command: "wallpose" },
        { name: "Wall Pose 2", command: "wallpose2" },
        { name: "Wall Pose 3", command: "wallpose3" },
        { name: "Wall Pose 4", command: "wallpose4" },
        { name: "Wall Pose 5", command: "wallpose5" },
        { name: "Window Elbow", command: "elbow" },
        { name: "Window Elbow 2", command: "elbow2" },
        { name: "Sit Lean", command: "sitlean" },
        { name: "Sit Lean 2", command: "sitlean2" },
        { name: "Sit Lean 3", command: "sitlean3" },
        { name: "Sit Sad", command: "sitsad" },
        { name: "Sit Sad 2", command: "sitsad2" },
        { name: "Sit Scared", command: "sitscared" },
        { name: "Sit Scared 2", command: "sitscared2" },
        { name: "Sit Scared 3", command: "sitscared3" },
        { name: "Sit Drunk", command: "sitdrunk" },
        { name: "Sit Chair", command: "sitchair" },
        { name: "Sit Chair 2", command: "sitchair2" },
        { name: "Sit Chair 3 (Female)", command: "sitchair3" },
        { name: "Sit Chair 4 - Side", command: "sitchair4" },
        { name: "Sit Chair Legs Crossed", command: "sitchair5" },
        { name: "Sit Chair Lean Back", command: "sitchair6" },
        { name: "Sit Chair Attentive", command: "sitchair7" },
        { name: "Sit Chair Lonely", command: "sitchair8" },
        { name: "Sit Toilet", command: "sittoilet" },
        { name: "Sit Toilet 2", command: "sittoilet2" },
        { name: "Sit Cute", command: "sitcute" },
        { name: "Sit Up", command: "situp" },
        { name: "Sitting Smoke & Gun", command: "smokengun" },
        { name: "Smoke And Whiskey", command: "smokendrink" },
        { name: "Clap Angry", command: "clapangry" },
        { name: "Slow Clap", command: "slowclap" },
        { name: "Slow Clap 2", command: "slowclap2" },
        { name: "Slow Clap 3", command: "slowclap3" },
        { name: "Clap", command: "clap" },
        { name: "Smell", command: "smell" },
        { name: "Stick Up", command: "stickup" },
        { name: "Stumble", command: "stumble" },
        { name: "Stunned", command: "stunned" },
        { name: "Sunbathe - Hand On Head", command: "sunbathe" },
        { name: "Sunbathe 2 - Hand Over Face", command: "sunbathe2" },
        { name: "Sunbathe 3 - Lay On Stomach", command: "sunbathe3" },
        { name: "Sunbathe 4", command: "sunbathe4" },
        { name: "Sunbathe 5", command: "sunbathe5" },
        { name: "Sunbathe 6", command: "sunbathe6" },
        { name: "Sunbathe 7", command: "sunbathe7" },
        { name: "T Pose", command: "tpose" },
        { name: "T Pose 2", command: "tpose2" },
        { name: "Think", command: "think" },
        { name: "Think 2", command: "think2" },
        { name: "Think 3", command: "think3" },
        { name: "Think 5", command: "think5" },
        { name: "Thumbs Up", command: "thumbsup" },
        { name: "Thumbs Up 2", command: "thumbsup2" },
        { name: "Thumbs Up 3", command: "thumbsup3" },
        { name: "Type", command: "type" },
        { name: "Type 2", command: "type2" },
        { name: "Type 3", command: "type3" },
        { name: "Type 4", command: "type4" },
        { name: "Type 5 - Stare", command: "type5" },
        { name: "Warmth", command: "warmth" },
        { name: "Wave", command: "wave" },
        { name: "Wave 2", command: "wave2" },
        { name: "Wave 3", command: "wave3" },
        { name: "Wave 4", command: "wave4" },
        { name: "Wave 5", command: "wave5" },
        { name: "Wave 6", command: "wave6" },
        { name: "Wave 7", command: "wave7" },
        { name: "Wave 8", command: "wave8" },
        { name: "Wave 9", command: "wave9" },
        { name: "Whistle", command: "whistle" },
        { name: "Whistle 2", command: "whistle2" },
        { name: "Yeah", command: "yeah" },
        { name: "Yeah Yeah", command: "yeah2" },
        { name: "Yoga 2", command: "yoga2" },
        { name: "Lift", command: "lift" },
        { name: "LOL", command: "lol" },
        { name: "LOL 2", command: "lol2" },
        { name: "Lost & Confused", command: "lostconfused" },
        { name: "Statue 2", command: "statue2" },
        { name: "Statue 3", command: "statue3" },
        { name: "Gang Sign", command: "gangsign" },
        { name: "Gang Sign 2", command: "gangsign2" },
        { name: "Gang Sign 3", command: "gangsign3" },
        { name: "Gang Sign 4", command: "gangsign4" },
        { name: "Passout", command: "passout" },
        { name: "Passout 2", command: "passout2" },
        { name: "Passout 3", command: "passout3" },
        { name: "Passout 4", command: "passout4" },
        { name: "Passout 5", command: "passout5" },
        { name: "Passout 6", command: "passout6" },
        { name: "Passout 7", command: "passout7" },
        { name: "Passout 8", command: "passout8" },
        { name: "Petting", command: "petting" },
        { name: "Crawl", command: "crawl" },
        { name: "Flip", command: "flip" },
        { name: "Flip 2", command: "flip2" },
        { name: "Slide", command: "slide" },
        { name: "Slide 2", command: "slide2" },
        { name: "Slide 3", command: "slide3" },
        { name: "Slugger", command: "slugger" },
        { name: "Flip Off", command: "flipoff" },
        { name: "Flip Off 2", command: "flipoff2" },
        { name: "Bow", command: "bow" },
        { name: "Bow 2", command: "bow2" },
        { name: "Key Fob", command: "keyfob" },
        { name: "Holster", command: "holster" },
        { name: "Holster 2", command: "holster2" },
        { name: "Holster 3", command: "holster3" },
        { name: "Holster 4 - Stop", command: "holster4" },
        { name: "Holster 5 - Stop 2", command: "holster5" },
        { name: "Slap", command: "slap" },
        { name: "Headbutt", command: "headbutt" },
        { name: "Fish Dance", command: "fishdance" },
        { name: "Peace", command: "peace" },
        { name: "Peace 2", command: "peace2" },
        { name: "Peace 3", command: "peace3" },
        { name: "Peace 4", command: "peace4" },
        { name: "Peace 5", command: "peace5" },
        { name: "Peace 6", command: "peace6" },
        { name: "Peace 7", command: "peace7" },
        { name: "Peace Female", command: "peacef" },
        { name: "CPR", command: "cpr" },
        { name: "CPR 2", command: "cpr2" },
        { name: "Ledge", command: "ledge" },
        { name: "Air Plane", command: "airplane" },
        { name: "Peek", command: "peek" },
        { name: "Cough", command: "cough" },
        { name: "Stretch", command: "stretch" },
        { name: "Stretch 2", command: "stretch2" },
        { name: "Stretch 3", command: "stretch3" },
        { name: "Stretch 4", command: "stretch4" },
        { name: "Celebrate", command: "celebrate" },
        { name: "Punching", command: "punching" },
        { name: "Punching 2", command: "punching2" },
        { name: "Superhero", command: "superhero" },
        { name: "Superhero 2", command: "superhero2" },
        { name: "Mind Control", command: "mindcontrol" },
        { name: "Mind Control 2", command: "mindcontrol2" },
        { name: "Clown", command: "clown" },
        { name: "Clown 2", command: "clown2" },
        { name: "Clown 3", command: "clown3" },
        { name: "Clown 4", command: "clown4" },
        { name: "Clown 5", command: "clown5" },
        { name: "Try Clothes", command: "tryclothes" },
        { name: "Try Clothes 2", command: "tryclothes2" },
        { name: "Try Clothes 3", command: "tryclothes3" },
        { name: "Try Clothes 4", command: "tryclothes4" },
        { name: "Try Clothes 5", command: "tryclothes5" },
        { name: "Nervous", command: "nervous" },
        { name: "Nervous 2", command: "nervous2" },
        { name: "Nervous 3", command: "nervous3" },
        { name: "Nervous 4", command: "nervous4" },
        { name: "Namaste", command: "namaste" },
        { name: "Threaten", command: "threaten" },
        { name: "Radio", command: "radio" },
        { name: "Earpiece", command: "earpiece" },
        { name: "Pull", command: "pull" },
        { name: "Bird", command: "bird" },
        { name: "Chicken", command: "chicken" },
        { name: "Bark", command: "bark" },
        { name: "Rabbit", command: "rabbit" },
        { name: "Hunched", command: "hunched" },
        { name: "BOI", command: "boi" },
        { name: "Adjust", command: "adjust" },
        { name: "Addict", command: "addict" },
        { name: "Hands Up", command: "handsup" },
        { name: "Hands Up 2", command: "handsup2" },
        { name: "Hands Up 3", command: "handsup3" },
        { name: "Hands Up 4", command: "handsup4" },
        { name: "Hands Up 5", command: "handsup5" },
        { name: "Valet", command: "valet" },
        { name: "Valet 2", command: "valet2" },
        { name: "Valet 3", command: "valet3" },
        { name: "Tighten (Yoga)", command: "tighten" },
        { name: "F Sex Pose", command: "fspose" },
        { name: "F Sex Pose 2", command: "fspose2" },
        { name: "F Sex Pose 3", command: "fspose3" },
        { name: "Shower Enter Female", command: "showerf" },
        { name: "Shower Female", command: "showerf2" },
        { name: "Shower Female 2", command: "showerf3" },
        { name: "Shower Enter Male", command: "showerm" },
        { name: "Shower Male 2", command: "showerm2" },
        { name: "Shower Male 3", command: "showerm3" },
        
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
let walkModeActive = false;

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

const btnWalkMode = document.getElementById('btn-walk-mode');
btnWalkMode.addEventListener('click', () => {
    walkModeActive = !walkModeActive;
    btnWalkMode.classList.toggle('active', walkModeActive);
    fetch(`https://AX_Anims/setWalkMode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: walkModeActive })
    });
});

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

    const categories = ['expresiones','bailes','caminar','compartidas','escenarios','props','sentarse'];

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
// Ya no hay botones, solo escuchar Y y N
document.addEventListener('keydown', (e) => {
    // Cerrar menú con ESC
    if (e.key === 'Escape' && !container.classList.contains('hidden')) {
        closeMenu();
        return;
    }

    // Cancelar animación con X desde el menú
    if ((e.key === 'x' || e.key === 'X') && !container.classList.contains('hidden')) {
        fetch(`https://AX_Anims/cancelAnim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        return;
    }

    // Modal compartidas
    if (sharedModal.classList.contains('hidden')) return;
    if (e.key === 'y' || e.key === 'Y') {
        clearTimeout(sharedTimeout);
        sharedModal.classList.add('hidden');
        fetch(`https://AX_Anims/acceptShared`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
    } else if (e.key === 'n' || e.key === 'N') {
        clearTimeout(sharedTimeout);
        sharedModal.classList.add('hidden');
        fetch(`https://AX_Anims/declineShared`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
    }
});

function showSharedModal(command, timeout) {
    let animName = command;
    for (const anim of ANIMATIONS.compartidas) {
        if (anim.command === command) { animName = anim.name; break; }
    }
    sharedAnimName.textContent = animName;

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