// ==UserScript==
// @name         GoMap_Enhancement
// @namespace    https://greasyfork.org/scripts/33147
// @version      0.69
// @icon         http://cdn.marketplaceimages.windowsphone.com/v8/images/603207c6-16dd-48fe-af57-9a8544e82f44
// @description  making GoMap.eu more friendly
// @author       niu541412@gmail.com
// @license      MIT License
// @match        *://*.gomap.eu/*
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';
    //detect mobile device. https://stackoverflow.com/questions/21741841/#answer-21742107
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var isMobile = false;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone|android|iPad|iPhone|iPod/i.test(userAgent))
        isMobile = true;


    //Remove advertisement bar (with Adblock-like extensions better) & some useless links.
    document.getElementsByClassName('adslot_1')[0].style.height = 0;
    document.querySelectorAll(".modal-content>p")[3].insertAdjacentHTML('beforeend', "<br><a href='https://www.facebook.com/gomapnews/posts/' target='_blank'>Facebook</a>");
    document.querySelectorAll(".modal-content>p")[4].remove();
    document.getElementById("donation").nextElementSibling.nextElementSibling.remove();
    document.getElementById("donation").nextElementSibling.remove();
    document.getElementById("donation").remove();
    var checkExist = setInterval(function() {
        if (document.getElementsByClassName("leaflet-control-attribution leaflet-control").length) {
            clearInterval(checkExist);
            document.getElementsByClassName("leaflet-control-attribution leaflet-control")[0].style.visibility = "hidden";
        }
    }, 100);

    //Decorate menu button and something else.
    var mql = window.matchMedia("(max-width: 800px)");
    mql.addListener(handleOrientationChange);
    handleOrientationChange(mql);

    function handleOrientationChange(mql) {
        if (mql.matches) {
            document.getElementById("menuToggle").style.right = "14px";
            document.getElementById("menuToggle").style.top = "45px";
            //$("#menuToggle")[0].style.top = "35px"; //jQuery
        } else {
            document.getElementById("menuToggle").style.top = "10px";
            document.getElementById("menuToggle").style.right = "";
        }
    }

    document.getElementById("menuToggle").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    document.getElementById("menuToggle").style.padding = "4.5px 4px 4.5px 4px";
    document.getElementById("menuToggle").style.boxShadow = "0 1px 5px rgba(0,0,0,0.65)";
    document.getElementById("menuToggle").style.borderRadius = "3px";
    $("#menuToggle > span").css({
        "width": "18px",
        "height": "3px",
        "margin-bottom": "2px",
        "margin-top": "2px"
    });

    //Add fullscreen button to OpenStreet Map.
    $("#mapo").prepend('<div id="fullscreen" title="Toggle fullscreen" onclick="toggleFullScreen()"></div>');
    document.getElementById("fullscreen").style.cssText = "opacity: 0.8; width:26px; height:26px; display: block; position: absolute; z-index: 800; top: 10px; right: 14px; cursor: pointer";
    document.getElementById("fullscreen").style.boxShadow = "0 1px 5px rgba(0,0,0,0.65)";
    document.getElementById("fullscreen").style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    document.getElementById("fullscreen").style.borderRadius = "3px";
    document.getElementById("fullscreen").style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAAAUklEQVR4AWOgGhgF/8HwPIrYeYgoIU0OKGIOxGm6jyJ2n5Cm8wwOQEUGKGIGQBEHoAwB0AA0FwEbSAgOBBwWmggHBOVBTjhyKU9GhBMslcAoAABPu2Hh6JIyeQAAAABJRU5ErkJggg==) ";
    //document.body.insertAdjacentHTML('afterbegin',"<button id='fullscreen' style='background-image:url(https://....png?raw=ture); width:15px; height:15px; padding: 0px' onclick='toggleFullScreen()'></button>");
    document.getElementById('fullscreen').addEventListener('click', toggleFullScreen, false);
    //full screen, from mozilla.org
    function toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        } else {
            cancelFullScreen.call(doc);
        }
    }


    //Add some quick settings in the menu.
    document.getElementById("lang").parentElement.firstElementChild.replaceWith("");
    document.getElementById("mapprovider").style.cssText = "position: relative;left: 3em";
    document.getElementById("lang").style.cssText = "position: relative;left: 2em";
    if (localStorage.getItem('lang') == 'en') {
        document.getElementById("pokemon-checkbox").nextElementSibling.textContent = "Pokemon display";
        document.getElementById("gyms-checkbox").nextElementSibling.textContent = "Gym display";
        document.getElementById("pstops-checkbox").nextElementSibling.textContent = "Pokestop display";
        document.getElementById("mapprovider").parentElement.childNodes[0].textContent = "Select map:";
        for (var i = 0; i < document.getElementById("raidsel").options.length; i++)
            switch (document.getElementById("raidsel").options[i].value) {
                case "0":
                    document.getElementById("raidsel").options[i].textContent = "Gyms and Raids";
                    break;
                case "1":
                    document.getElementById("raidsel").options[i].textContent = "only Raids";
                    break;
                case "5":
                    document.getElementById("raidsel").options[i].textContent = "only legendary raids";
                    break;
            }
    }

    $(".chckbox").eq(0).append("<button id='hideall'   style='margin-left: 30px; border-radius:5px;' onclick='hide_all()' title='Hide all the Pokémon'>Hide all</button>");
    $(".chckbox").eq(0).append("<button id='recommend' style='margin-left: 20px; border-radius:5px;' onclick='recommend_PM()' title='Some recommended Pokémon will be shown'>Recommended</button>");
    $(".chckbox").eq(0).append("<button id='smallall'  style='margin-left: 20px; border-radius:5px;' onclick='small_all()' title='set all the icons to small ones'>Small icons</button>");
    document.getElementById('hideall').addEventListener('click', hide_all, false);
    document.getElementById('recommend').addEventListener('click', recommend_PM, false);
    document.getElementById('smallall').addEventListener('click', small_all, false);
    var modal = document.getElementById('myModal');
    var changed;

    function refreshPage() {
        if (changed) {
            swal({
                    title: "GoMap_Enhancement userscripts:",
                    text: "Settings have been saved.\n Refreshing now.",
                    type: "info",
                },
                function() {
                    location.reload();
                });
        }
    }

    function switch_all() {
        for (var i = 0; i < $('#modal-container .pokemon').length; i++) {
            if ($('#modal-container .pokemon')[i].className == 'pokemon red') {
                $('#modal-container .pokemon')[i].className = 'pokemon green';
            } else {
                $('#modal-container .pokemon')[i].className = 'pokemon red';
            }
        }
        var excludedPokemon = $('#modal-container .pokemon.red').map(function(idx, x) {
            return parseInt(x.dataset.pokemonId);
        }).toArray();
        localStorage.setItem('excludedPokemon', JSON.stringify(excludedPokemon));
        changed = true;
        modal.style.display = "none";
        refreshPage();
    }

    function hide_all() {
        for (var i = 0; i < $('#modal-container .pokemon').length; i++) {
            $('#modal-container .pokemon')[i].className = 'pokemon red';
        }
        var excludedPokemon = $('#modal-container .pokemon.red').map(function(idx, x) {
            return parseInt(x.dataset.pokemonId);
        }).toArray();
        localStorage.setItem('excludedPokemon', JSON.stringify(excludedPokemon));
        changed = true;
        modal.style.display = "none";
        refreshPage();
    }

    function small_all() {
        for (var i = 0; i < $('#modal-container2 .pokemon').length; i++) {
            $('#modal-container2 .pokemon')[i].className = 'pokemon red';
        }
        var frontpokes = $('#modal-container2 .pokemon.green').map(function(idx, x) {
            return parseInt(x.dataset.pokemonId);
        }).toArray();
        localStorage.setItem('frontpokes', JSON.stringify(frontpokes));
        changed = true;
        modal.style.display = "none";
        refreshPage();
    }

    Array.prototype.diff = function(a) {
        return this.filter(function(i) {
            return a.indexOf(i) < 0;
        });
    };

    function recommend_PM() {
        for (var i = 1, allPokemon = []; i <= 386; i++) allPokemon.push(i);
        var includedPokemon = [25, 26, 83, 113, 115, 128, 130, 131, 137, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, //Gen 1
            201, 214, 222, 225, 233, 235, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, //Gen 2
            287, 288, 289, 311, 351, 335, 349, 350, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386 //Gen3
        ];
        var excludedPokemon = allPokemon.diff(includedPokemon);
        localStorage.setItem('excludedPokemon', JSON.stringify(excludedPokemon));
        changed = true;
        modal.style.display = "none";
        refreshPage();
    }


    //Add Notification
    $(".chckbox").last().after("<div class='chckbox'><input type='checkbox' id='nty_checkbox'> <label for='notify-checkbox'>Notification (Scan the big-icon list below)</label><br></div>");
    document.getElementById('nty_checkbox').checked = GM_getValue("nty_checkbox") || false;
    document.getElementById('nty_checkbox').onchange = switch_ntf;

    function switch_ntf() {
        GM_setValue("nty_checkbox", document.getElementById('nty_checkbox').checked);
        if (!document.getElementById('nty_checkbox').checked) {
            document.getElementById('nty_setting').style.display = "none";
            clearInterval(scan_id);
        } else {
            Notification.requestPermission();
            document.getElementById('nty_setting').style.display = "";
            clearInterval(scan_id);
            scan_id = setInterval(scan_poke, 30000);
        }
    }

    $(".chckbox").eq(3).append('<div id="nty_setting" style="padding-left: 30px"><select id="nty_sel" title="Scanning method"><option value="auto">Automatic positioning</option><option value="manual">Manually fixed positioning</option></div>');
    document.getElementById('nty_sel').style.width = "150px";
    document.getElementById('nty_sel').value = GM_getValue("nty_sel") || "auto";
    document.getElementById('nty_sel').onchange = update_ntf_scan;

    $("#nty_sel").after('<span style="padding-left: 10px"> Radius <input type="number" id="nty_rad" title="Scannig Radius:"/> km</span>');
    document.getElementById('nty_rad').style.borderRadius = "5px";
    document.getElementById('nty_rad').placeholder = "Scannig Radius";
    document.getElementById('nty_rad').step = "0.1";
    document.getElementById('nty_rad').min = "0.5";
    document.getElementById('nty_rad').max = "10.0";
    document.getElementById('nty_rad').value = GM_getValue("nty_rad") || 0.5;
    document.getElementById('nty_rad').onchange = update_ntf_scan;

    $("#nty_setting").prepend('<span>Sound: <input type="checkbox" id="nty_sound" title="Notification Sound" />');
    $("#nty_sound").after('<span style="display:inline-block; width: 30px;"></span>Vibration: <input type="checkbox" id="nty_vibration" title="Notification Vibration" />');
    $("#nty_vibration").after('<span style="display:inline-block; width: 30px;"></span><a href="https://greasyfork.org/scripts/33147/#additional-info" target="_blank">Tips</a></span><br>');
    document.getElementById('nty_sound').checked = GM_getValue("nty_sound") || false;
    document.getElementById('nty_vibration').checked = GM_getValue("nty_vibration") || false;
    document.getElementById('nty_sound').onchange = function() {
        GM_setValue("nty_sound", document.getElementById('nty_sound').checked);
    };
    document.getElementById('nty_vibration').onchange = function() {
        GM_setValue("nty_vibration", document.getElementById('nty_vibration').checked);
    };

    $("#nty_setting").append('<br><span id="nty_coords"> Latitude: <input type="number" id="nty_lttd" title="Notification Latitude" />');
    $("#nty_coords").append('<span style="display:inline-block; width: 10px;"></span>Longitude: <input type="number" id="nty_lgtd" title="Notification Longitude" /></span>');
    document.getElementById('nty_coords').style.display = (GM_getValue("nty_sel") == "manual") && "inline" || "none";
    document.getElementById('nty_lttd').style.borderRadius = "5px";
    document.getElementById('nty_lttd').style.width = "80px";
    document.getElementById('nty_lttd').placeholder = "Latitude";
    document.getElementById('nty_lttd').step = "0.1";
    document.getElementById('nty_lttd').min = "-90.0";
    document.getElementById('nty_lttd').max = "90.0";
    document.getElementById('nty_lttd').value = GM_getValue("nty_lttd") || 50.0;
    document.getElementById('nty_lgtd').style.borderRadius = "5px";
    document.getElementById('nty_lgtd').style.width = "80px";
    document.getElementById('nty_lgtd').placeholder = "Longitude";
    document.getElementById('nty_lgtd').step = "0.1";
    document.getElementById('nty_lgtd').min = "-180.0";
    document.getElementById('nty_lgtd').max = "180.0";
    document.getElementById('nty_lgtd').value = GM_getValue("nty_lgtd") || 10.0;
    document.getElementById('nty_lttd').onchange = update_ntf_scan;
    document.getElementById('nty_lgtd').onchange = update_ntf_scan;

    document.getElementById('nty_setting').style.display = GM_getValue("nty_checkbox") && "block" || "none";


    function update_ntf_scan() {
        GM_setValue("nty_sel", document.getElementById('nty_sel').value);
        GM_setValue("nty_rad", document.getElementById('nty_rad').value);
        switch (document.getElementById('nty_sel').value) {
            case "auto":
                document.getElementById('nty_coords').style.display = "none";
                navigator.geolocation.getCurrentPosition(function(position) {
                    //console.log(position.coords.latitude, position.coords.longitude);
                    GM_setValue("nty_lttd", position.coords.latitude);
                    GM_setValue("nty_lgtd", position.coords.longitude);
                });
                break;
            case "manual":
                document.getElementById('nty_coords').style.display = "";
                GM_setValue("nty_lttd", document.getElementById('nty_lttd').value);
                GM_setValue("nty_lgtd", document.getElementById('nty_lgtd').value);
                break;
        }
        //console.log(GM_getValue("nty_sel"),GM_getValue("nty_lttd"),GM_getValue("nty_lgtd"));
    }



    var bnds;
    var bndw;
    var bndn;
    var bnde;
    var maxeid = 0;
    //var maxgid = 0;
    var ntysound = new Audio('../static/notify.mp3');
    var scan_id;
    //scan_poke();

    function scan_poke() {
        update_ntf_scan();
        bnds = 1*GM_getValue("nty_lttd") - 0.009 * GM_getValue("nty_rad");
        bndn = 1*GM_getValue("nty_lttd") + 0.009 * GM_getValue("nty_rad");
        bndw = 1*GM_getValue("nty_lgtd") - 0.014 * GM_getValue("nty_rad");
        bnde = 1*GM_getValue("nty_lgtd") + 0.014 * GM_getValue("nty_rad");
        //console.log("N",bndn,"S",bnds,"W",bndw,"E",bnde);
        var notifyPokemon = JSON.parse(localStorage.getItem('frontpokes'));
        for (var i = 1, allPokemon = []; i <= 386; i++) allPokemon.push(i);
        var excludedPokemon = allPokemon.diff(notifyPokemon);
        var lang = document.getElementById("lang").value;

        var ajdata = {
            'mid': maxeid,
            'ex': JSON.stringify(excludedPokemon),
            'w': bndw,
            'e': bnde,
            'n': bndn,
            's': bnds
        };
        /*if (document.getElementById('gyms-checkbox').checked) {
            ajdata.gid = maxgid;
        }*/
        $.ajax({
            url: "https://mapdata2.gomap.eu/mnew.php",
            type: 'GET',
            data: ajdata,
            dataType: "json"
        }).done(function(result) {
            //console.log(result);
            //console.log(maxeid);
            $.each(result.pokemons, function(i, item) {
                if (item.eid > maxeid) {
                    maxeid = item.eid;
                }
                var d_time = new Date(item.disappear_time * 1000);
                var dateString =
                    ("0" + d_time.getHours()).slice(-2) + ":" +
                    ("0" + d_time.getMinutes()).slice(-2) + ":" +
                    ("0" + d_time.getSeconds()).slice(-2);
                if (GM_getValue("nty_sound") === true)
                    ntysound.play();
                //console.log(item.pokemon_id);
                var nty = new Notification(pokeNames[lang][item.pokemon_id] + ": " + item.latitude.toFixed(3) + ", " + item.longitude.toFixed(3), {
                    body: "Disapper Time: " + dateString,
                    icon: "../static/icons/" + item.pokemon_id + ".png",
                    vibrate: [100, 100, 100]
                });
                setTimeout(function() {
                    nty.close();
                }, isMobile && 60000 || 10000);
            });
            /*$.each(result.gyms, function(i, item) {
                if (item.ts > maxgid) {
                    maxgid = item.ts;
                }
                if (notifyPokemon.includes(item.rpid)) {
                    d_time = new Date(item.re * 1000);
                    dateString =
                        ("0" + d_time.getHours()).slice(-2) + ":" +
                        ("0" + d_time.getMinutes()).slice(-2) + ":" +
                        ("0" + d_time.getSeconds()).slice(-2);
                    new Notification(pokeNames.en[item.pokemon_id] + "Raid: " + item.latitude.toFixed(3) + ", " + item.longitude.toFixed(3), {
                        body: "End Time: " + dateString,
                        icon: "../static/icons/" + item.pokemon_id + ".png"
                    });
                } else {
                    if (item.rpid == 5) {
                        d_time = new Date(item.re * 1000);
                        dateString =
                            ("0" + d_time.getHours()).slice(-2) + ":" +
                            ("0" + d_time.getMinutes()).slice(-2) + ":" +
                            ("0" + d_time.getSeconds()).slice(-2);
                        new Notification(Legendary + "Raid: " + item.latitude.toFixed(3) + ", " + item.longitude.toFixed(3), {
                            body: "End Time: " + dateString,
                            icon: "../static/favicon.ico"
                        });
                    }
                }
            });*/
        });
    }

    if (GM_getValue("nty_checkbox")) {
        setTimeout(scan_poke, 5000);
        scan_id = setInterval(scan_poke, 30000);
    }

    //replace icon, in developing
    //  pppp = $('#modal-container .pokemon');
    //  $('#modal-container .pokemon')[24].src.replace("https://gomap.eu/static/icons/","www.pokewiki.de/images/4/42/Pokémonicon_0");

    //add more languages, in developing
    //$("select#lang").append('<option value="zh_CN">简体中文</option>');
    //$("select#lang").append('<option value="zh_TW">繁体中文</option>');
    /*function changeLang() {
        lang = document.getElementById("lang").value;
        localStorage.lang = lang;
    }
     langs = {
        'zh_CN': '简体中文',
        'zh_TW': '繁體中文'
    };*/
    var pokeNames = {
        'de': ["", "Bisasam", "Bisaknosp", "Bisaflor", "Glumanda", "Glutexo", "Glurak", "Schiggy", "Schillok", "Turtok", "Raupy", "Safcon", "Smettbo", "Hornliu", "Kokuna", "Bibor", "Taubsi", "Tauboga", "Tauboss", "Rattfratz", "Rattikarl", "Habitak", "Ibitak", "Rettan", "Arbok", "Pikachu", "Raichu", "Sandan", "Sandamer", "NidoranW", "Nidorina", "Nidoqueen", "NidoranM", "Nidorino", "Nidoking", "Piepi", "Pixi", "Vulpix", "Vulnona", "Pummeluff", "Knuddeluff", "Zubat", "Golbat", "Myrapla", "Duflor", "Giflor", "Paras", "Parasek", "Bluzuk", "Omot", "Digda", "Digdri", "Mauzi", "Snobilikat", "Enton", "Entoron", "Menki", "Rasaff", "Fukano", "Arkani", "Quapsel", "Quaputzi", "Quappo", "Abra", "Kadabra", "Simsala", "Machollo", "Maschock", "Machomei", "Knofensa", "Ultrigaria", "Sarzenia", "Tentacha", "Tentoxa", "Kleinstein", "Georok", "Geowaz", "Ponita", "Gallopa", "Flegmon", "Lahmus", "Magnetilo", "Magneton", "Porenta", "Dodu", "Dodri", "Jurob", "Jugong", "Sleima", "Sleimok", "Muschas", "Austos", "Nebulak", "Alpollo", "Gengar", "Onix", "Traumato", "Hypno", "Krabby", "Kingler", "Voltobal", "Lektrobal", "Owei", "Kokowei", "Tragosso", "Knogga", "Kicklee", "Nockchan", "Schlurp", "Smogon", "Smogmog", "Rihorn", "Rizeros", "Chaneira", "Tangela", "Kangama", "Seeper", "Seemon", "Goldini", "Golking", "Sterndu", "Starmie", "Pantimos", "Sichlor", "Rossana", "Elektek", "Magmar", "Pinsir", "Tauros", "Karpador", "Garados", "Lapras", "Ditto", "Evoli", "Aquana", "Blitza", "Flamara", "Porygon", "Amonitas", "Amoroso", "Kabuto", "Kabutops", "Aerodactyl", "Relaxo", "Arktos", "Zapdos", "Lavados", "Dratini", "Dragonir", "Dragoran", "Mewtu", "Mew", "Endivie", "Lorblatt", "Meganie", "Feurigel", "Igelavar", "Tornupto", "Karnimani", "Tyracroc", "Impergator", "Wiesor", "Wiesenior", "Hoothoot", "Noctuh", "Ledyba", "Ledian", "Webarak", "Ariados", "Iksbat", "Lampi", "Lanturn", "Pichu", "Pii", "Fluffeluff", "Togepi", "Togetic", "Natu", "Xatu", "Voltilamm", "Waaty", "Ampharos", "Blubella", "Marill", "Azumarill", "Mogelbaum", "Quaxo", "Hoppspross", "Hubelupf", "Papungha", "Griffel", "Sonnkern", "Sonnflora", "Yanma", "Felino", "Morlord", "Psiana", "Nachtara", "Kramurx", "Laschoking", "Traunfugil", "Icognito", "Woingenau", "Girafarig", "Tannza", "Forstellka", "Dummisel", "Skorgla", "Stahlos", "Snubbull", "Granbull", "Baldorfish", "Scherox", "Pottrott", "Skaraborn", "Sniebel", "Teddiursa", "Ursaring", "Schneckmag", "Magcargo", "Quiekel", "Keifel", "Corasonn", "Remoraid", "Octillery", "Botogel", "Mantax", "Panzaeron", "Hunduster", "Hundemon", "Seedraking", "Phanpy", "Donphan", "Porygon2", "Damhirplex", "Farbeagle", "Rabauz", "Kapoera", "Kussilla", "Elekid", "Magby", "Miltank", "Heiteira", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Despotar", "Lugia", "Ho-Oh", "Celebi", "Geckarbor", "Reptain", "Gewaldro", "Flemmli", "Jungglut", "Lohgock", "Hydropi", "Moorabbel", "Sumpex", "Fiffyen", "Magnayen", "Zigzachs", "Geradaks", "Waumpel", "Schaloko", "Papinella", "Panekon", "Pudox", "Loturzel", "Lombrero", "Kappalores", "Samurzel", "Blanas", "Tengulist", "Schwalbini", "Schwalboss", "Wingull", "Pelipper", "Trasla", "Kirlia", "Guardevoir", "Gehweiher", "Maskeregen", "Knilz", "Kapilz", "Bummelz", "Muntier", "Letarking", "Nincada", "Ninjask", "Ninjatom", "Flurmel", "Krakeelo", "Krawumms", "Makuhita", "Hariyama", "Azurill", "Nasgnet", "Eneco", "Enekoro", "Zobiris", "Flunkifer", "Stollunior", "Stollrak", "Stolloss", "Meditie", "Meditalis", "Frizelbliz", "Voltenso", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Schluppuck", "Schlukwech", "Kanivanha", "Tohaido", "Wailmer", "Wailord", "Camaub", "Camerupt", "Qurtel", "Spoink", "Groink", "Pandir", "Knacklion", "Vibrava", "Libelldra", "Tuska", "Noktuska", "Wablu", "Altaria", "Sengo", "Vipitis", "Lunastein", "Sonnfel", "Schmerbe", "Welsar", "Krebscorps", "Krebutack", "Puppance", "Lepumentas", "Liliep", "Wielie", "Anorith", "Armaldo", "Barschwa", "Milotic", "Formeo", "Kecleon", "Shuppet", "Banette", "Zwirrlicht", "Zwirrklop", "Tropius", "Palimpalim", "Absol", "Isso", "Schneppke", "Firnontor", "Seemops", "Seejong", "Walraisa", "Perlu", "Aalabyss", "Saganabyss", "Relicanth", "Liebiskus", "Kindwurm", "Draschel", "Brutalanda", "Tanhel", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys", "Chelast", "Chelcarain", "Chelterrar", "Panflam", "Panpyro", "Panferno", "Plinfa", "Pliprin", "Impoleon", "Staralili", "Staravia", "Staraptor", "Bidiza", "Bidifas", "Zirpurze", "Zirpeise", "Sheinux", "Luxio", "Luxtra", "Knospi", "Roserade", "Koknodon", "Rameidon", "Schilterus", "Bollterus", "Burmy", "Burmadame", "Moterpel", "Wadribie", "Honweisel", "Pachirisu", "Bamelin", "Bojelin", "Kikugi", "Kinoso", "Schalellos", "Gastrodon", "Ambidiffel", "Driftlon", "Drifzepeli", "Haspiror", "Schlapor", "Traunmagil", "Kramshef", "Charmian", "Shnurgarst", "Klingplim", "Skunkapuh", "Skuntank", "Bronzel", "Bronzong", "Mobai", "Pantimimi", "Wonneira", "Plaudagei", "Kryppuk", "Kaumalat", "Knarksel", "Knakrack", "Mampfaxo", "Riolu", "Lucario", "Hippopotas", "Hippoterus", "Pionskora", "Piondragi", "Glibunkel", "Toxiquak", "Venuflibis", "Finneon", "Lumineon", "Mantirps", "Shnebedeck", "Rexblisar", "Snibunna", "Magnezone", "Schlurplek", "Rihornior", "Tangoloss", "Elevoltek", "Magbrant", "Togekiss", "Yanmega", "Folipurba", "Glaziola", "Skorgro", "Mamutel", "Porygon-Z", "Galagladi", "Voluminas", "Zwirrfinst", "Frosdedje", "Rotom", "Selfe", "Vesprit", "Tobutz", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", "Victini", "Serpifeu", "Efoserp", "Serpiroyal", "Floink", "Ferkokel", "Flambirex", "Ottaro", "Zwottronin", "Admurai", "Nagelotz", "Kukmarda", "Yorkleff", "Terribark", "Bissbark", "Felilou", "Kleoparda", "Vegimak", "Vegichita", "Grillmak", "Grillchita", "Sodamak", "Sodachita", "Somniam", "Somnivora", "Dusselgurr", "Navitaub", "Fasasnob", "Elezeba", "Zebritz", "Kiesling", "Sedimantur", "Brockoloss", "Fleknoil", "Fletiamo", "Rotomurf", "Stalobor", "Ohrdoch", "Praktibalk", "Strepoli", "Meistagrif", "Schallquap", "Mebrana", "Branawarz", "Jiutesto", "Karadonis", "Strawickl", "Folikon", "Matrifol", "Toxiped", "Rollum", "Cerapendra", "Waumboll", "Elfun", "Lilminip", "Dressella", "Barschuft", "Ganovil", "Rokkaiman", "Rabigator", "Flampion", "Flampivian", "Maracamba", "Lithomith", "Castellith", "Zurrokex", "Irokex", "Symvolara", "Makabaja", "Echnatoll", "Galapaflos", "Karippas", "Flapteryx", "Aeropteryx", "Unrat&uuml;tox", "Deponitox", "Zorua", "Zoroark", "Picochilla", "Chillabell", "Mollimorba", "Hypnomorba", "Morbitesse", "Monozyto", "Mitodos", "Zytomega", "Piccolente", "Swaroness", "Gelatini", "Gelatroppo", "Gelatwino", "Sesokitz", "Kronjuwild", "Emolga", "Laukaps", "Cavalanzas", "Tarnpignon", "Hutsassa", "Quabbel", "Apoquallyp", "Mamolida", "Wattzapf", "Voltula", "Kastadur", "Tentantel", "Klikk", "Kliklak", "Klikdiklak", "Zapplardin", "Zapplalek", "Zapplarang", "Pygraulon", "Megalon", "Lichtel", "Laternecto", "Skelabra", "Milza", "Sharfax", "Maxax", "Petznief", "Siberio", "Frigometri", "Schnuthelm", "Hydragil", "Flunschlik", "Lin-Fu", "Wie-Shu", "Shardrago", "Golbit", "Golgantes", "Gladiantri", "Caesurio", "Bisofank", "Geronimatz", "Washakwil", "Skallyk", "Grypheldis", "Furnifrass", "Fermicula", "Kapuno", "Duodino", "Trikephalo", "Ignivor", "Ramoth", "Kobalium", "Terrakium", "Viridium", "Boreos", "Voltolos", "Reshiram", "Zekrom", "Demeteros", "Kyurem", "Keldeo", "Meloetta", "Genesect", "Igamaro", "Igastarnish", "Brigaron", "Fynx", "Rutena", "Fennexis", "Froxy", "Amphizel", "Quajutsu", "Scoppel", "Grebbit", "Dartiri", "Dartignis", "Fiaro", "Purmel", "Puponcho", "Vivillon", "Leufeo", "Pyroleo", "Flab&eacute;b&eacute;", "FLOETTE", "Florges", "M&auml;hikel", "Chevrumm", "Pam-Pam", "Pandagro", "Coiffwaff", "Psiau", "Psiaugon", "Gramokles", "Duokles", "Durengard", "Parfi", "Parfinesse", "Flauschling", "Sabbaione", "Iscalar", "Calamanero", "Bithora", "Thanathora", "Algitt", "Tandrak", "Scampisto", "Wummer", "Eguana", "Elezard", "Balgoras", "Monargoras", "Amarino", "Amagarga", "Feelinara", "Resladero", "DEDENNE", "Rocara", "Viscora", "Viscargot", "Viscogon", "Clavion", "Paragoni", "Trombork", "Irrbis", "Pumpdjinn", "Arktip", "Arktilas", "eF-eM", "UHaFnir", "Xerneas", "Yveltal", "Zygarde", "Diancie", "Hoopa", "Volcanion"],
        'en': ["", "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "NidoranF", "Nidorina", "Nidoqueen", "NidoranM", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-Oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys", "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio", "Luxray", "Budew", "Roserade", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Burmy", "Wormadam", "Mothim", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Mismagius", "Honchkrow", "Glameow", "Purugly", "Chingling", "Stunky", "Skuntank", "Bronzor", "Bronzong", "Bonsly", "Mime Jr.", "Happiny", "Chatot", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Hippopotas", "Hippowdon", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Finneon", "Lumineon", "Mantyke", "Snover", "Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior", "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega", "Leafeon", "Glaceon", "Gliscor", "Mamoswine", "Porygon-Z", "Gallade", "Probopass", "Dusknoir", "Froslass", "Rotom", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", "Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog", "Lillipup", "Herdier", "Stoutland", "Purrloin", "Liepard", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Munna", "Musharna", "Pidove", "Tranquill", "Unfezant", "Blitzle", "Zebstrika", "Roggenrola", "Boldore", "Gigalith", "Woobat", "Swoobat", "Drilbur", "Excadrill", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Tympole", "Palpitoad", "Seismitoad", "Throh", "Sawk", "Sewaddle", "Swadloon", "Leavanny", "Venipede", "Whirlipede", "Scolipede", "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Basculin", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan", "Maractus", "Dwebble", "Crustle", "Scraggy", "Scrafty", "Sigilyph", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Trubbish", "Garbodor", "Zorua", "Zoroark", "Minccino", "Cinccino", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Ducklett", "Swanna", "Vanillite", "Vanillish", "Vanilluxe", "Deerling", "Sawsbuck", "Emolga", "Karrablast", "Escavalier", "Foongus", "Amoonguss", "Frillish", "Jellicent", "Alomomola", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Klink", "Klang", "Klinklang", "Tynamo", "Eelektrik", "Eelektross", "Elgyem", "Beheeyem", "Litwick", "Lampent", "Chandelure", "Axew", "Fraxure", "Haxorus", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Stunfisk", "Mienfoo", "Mienshao", "Druddigon", "Golett", "Golurk", "Pawniard", "Bisharp", "Bouffalant", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Larvesta", "Volcarona", "Cobalion", "Terrakion", "Virizion", "Tornadus", "Thundurus", "Reshiram", "Zekrom", "Landorus", "Kyurem", "Keldeo", "Meloetta", "Genesect", "Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Fletchling", "Fletchinder", "Talonflame", "Scatterbug", "Spewpa", "Vivillon", "Litleo", "Pyroar", "Flab&eacute;b&eacute;", "Floette", "Florges", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Espurr", "Meowstic", "Honedge", "Doublade", "Aegislash", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Inkay", "Malamar", "Binacle", "Barbaracle", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Helioptile", "Heliolisk", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink", "Goomy", "Sliggoo", "Goodra", "Klefki", "Phantump", "Trevenant", "Pumpkaboo", "Gourgeist", "Bergmite", "Avalugg", "Noibat", "Noivern", "Xerneas", "Yveltal", "Zygarde", "Diancie", "Hoopa", "Volcanion"],
        'zh_CN': ["", "妙蛙种子", "妙蛙草", "妙蛙花", "小火龙", "火恐龙", "喷火龙", "杰尼龟", "卡咪龟", "水箭龟", "绿毛虫", "铁甲蛹", "巴大蝶", "独角虫", "铁壳蛹", "大针蜂", "波波", "比比鸟", "大比鸟", "小拉达", "拉达", "烈雀", "大嘴雀", "阿柏蛇", "阿柏怪", "皮卡丘", "雷丘", "穿山鼠", "穿山王", "尼多兰", "尼多娜", "尼多后", "尼多朗", "尼多力诺", "尼多王", "皮皮", "皮可西", "六尾", "九尾", "胖丁", "胖可丁", "超音蝠", "大嘴蝠", "走路草", "臭臭花", "霸王花", "派拉斯", "派拉斯特", "毛球", "摩鲁蛾", "地鼠", "三地鼠", "喵喵", "猫老大", "可达鸭", "哥达鸭", "猴怪", "火暴猴", "卡蒂狗", "风速狗", "蚊香蝌蚪", "蚊香君", "蚊香泳士", "凯西", "勇基拉", "胡地", "腕力", "豪力", "怪力", "喇叭芽", "口呆花", "大食花", "玛瑙水母", "毒刺水母", "小拳石", "隆隆石", "隆隆岩", "小火马", "烈焰马", "呆呆兽", "呆壳兽", "小磁怪", "三合一磁怪", "大葱鸭", "嘟嘟", "嘟嘟利", "小海狮", "白海狮", "臭泥", "臭臭泥", "大舌贝", "刺甲贝", "鬼斯", "鬼斯通", "耿鬼", "大岩蛇", "催眠貘", "引梦貘人", "大钳蟹", "巨钳蟹", "霹雳电球", "顽皮雷弹", "蛋蛋", "椰蛋树", "卡拉卡拉", "嘎啦嘎啦", "飞腿郎", "快拳郎", "大舌头", "瓦斯弹", "双弹瓦斯", "独角犀牛", "钻角犀兽", "吉利蛋", "蔓藤怪", "袋兽", "墨海马", "海刺龙", "角金鱼", "金鱼王", "海星星", "宝石海星", "魔墙人偶", "飞天螳螂", "迷唇姐", "电击兽", "鸭嘴火兽", "凯罗斯", "肯泰罗", "鲤鱼王", "暴鲤龙", "拉普拉斯", "百变怪", "伊布", "水伊布", "雷伊布", "火伊布", "多边兽", "菊石兽", "多刺菊石兽", "化石盔", "镰刀盔", "化石翼龙", "卡比兽", "急冻鸟", "闪电鸟", "火焰鸟", "迷你龙", "哈克龙", "快龙", "超梦", "梦幻", "菊草叶", "月桂叶", "大竺葵", "火球鼠", "火岩鼠", "火暴兽", "小锯鳄", "蓝鳄", "大力鳄", "尾立", "大尾立", "咕咕", "猫头夜鹰", "芭瓢虫", "安瓢虫", "圆丝蛛", "阿利多斯", "叉字蝠", "灯笼鱼", "电灯怪", "皮丘", "皮宝宝", "宝宝丁", "波克比", "波克基古", "天然雀", "天然鸟", "咩利羊", "茸茸羊", "电龙", "美丽花", "玛力露", "玛力露丽", "树才怪", "蚊香蛙皇", "毽子草", "毽子花", "毽子棉", "长尾怪手", "向日种子", "向日花怪", "蜻蜻蜓", "乌波", "沼王", "太阳伊布", "月亮伊布", "黑暗鸦", "呆呆王", "梦妖", "未知图腾", "果然翁", "麒麟奇", "榛果球", "佛烈托斯", "土龙弟弟", "天蝎", "大钢蛇", "布鲁", "布鲁皇", "千针鱼", "巨钳螳螂", "壶壶", "赫拉克罗斯", "狃拉", "熊宝宝", "圈圈熊", "熔岩虫", "熔岩蜗牛", "小山猪", "长毛猪", "太阳珊瑚", "铁炮鱼", "章鱼桶", "信使鸟", "巨翅飞鱼", "盔甲鸟", "戴鲁比", "黑鲁加", "刺龙王", "小小象", "顿甲", "多边兽Ⅱ", "惊角鹿", "图图犬", "无畏小子", "战舞郎", "迷唇娃", "电击怪", "鸭嘴宝宝", "大奶罐", "幸福蛋", "雷公", "炎帝", "水君", "幼基拉斯", "沙基拉斯", "班基拉斯", "洛奇亚", "凤王", "时拉比", "木守宫", "森林蜥蜴", "蜥蜴王", "火稚鸡", "力壮鸡", "火焰鸡", "水跃鱼", "沼跃鱼", "巨沼怪", "土狼犬", "大狼犬", "蛇纹熊", "直冲熊", "刺尾虫", "甲壳茧", "狩猎凤蝶", "盾甲茧", "毒粉蛾", "莲叶童子", "莲帽小童", "乐天河童", "橡实果", "长鼻叶", "狡猾天狗", "傲骨燕", "大王燕", "长翅鸥", "大嘴鸥", "拉鲁拉丝", "奇鲁莉安", "沙奈朵", "溜溜糖球", "雨翅蛾", "蘑蘑菇", "斗笠菇", "懒人獭", "过动猿", "请假王", "土居忍士", "铁面忍者", "脱壳忍者", "咕妞妞", "吼爆弹", "爆音怪", "幕下力士", "铁掌力士", "露力丽", "朝北鼻", "向尾喵", "优雅猫", "勾魂眼", "大嘴娃", "可可多拉", "可多拉", "波士可多拉", "玛沙那", "恰雷姆", "落雷兽", "雷电兽", "正电拍拍", "负电拍拍", "电萤虫", "甜甜萤", "毒蔷薇", "溶食兽", "吞食兽", "利牙鱼", "巨牙鲨", "吼吼鲸", "吼鲸王", "呆火驼", "喷火驼", "煤炭龟", "跳跳猪", "噗噗猪", "晃晃斑", "大颚蚁", "超音波幼虫", "沙漠蜻蜓", "刺球仙人掌", "梦歌仙人掌", "青绵鸟", "七夕青鸟", "猫鼬斩", "饭匙蛇", "月石", "太阳岩", "泥泥鳅", "鲶鱼王", "龙虾小兵", "铁螯龙虾", "天秤偶", "念力土偶", "触手百合", "摇篮百合", "太古羽虫", "太古盔甲", "丑丑鱼", "美纳斯", "漂浮泡泡", "变隐龙", "怨影娃娃", "诅咒娃娃", "夜巡灵", "彷徨夜灵", "热带龙", "风铃铃", "阿勃梭鲁", "小果然", "雪童子", "冰鬼护", "海豹球", "海魔狮", "帝牙海狮", "珍珠贝", "猎斑鱼", "樱花鱼", "古空棘鱼", "爱心鱼", "宝贝龙", "甲壳龙", "暴飞龙", "铁哑铃", "金属怪", "巨金怪", "雷吉洛克", "雷吉艾斯", "雷吉斯奇鲁", "拉帝亚斯", "拉帝欧斯", "盖欧卡", "固拉多", "烈空坐", "基拉祈", "代欧奇希斯", "草苗龟", "树林龟", "土台龟", "小火焰猴", "猛火猴", "烈焰猴", "波加曼", "波皇子", "帝王拿波", "姆克儿", "姆克鸟", "姆克鹰", "大牙狸", "大尾狸", "圆法师", "音箱蟀", "小猫怪", "勒克猫", "伦琴猫", "含羞苞", "罗丝雷朵", "头盖龙", "战槌龙", "盾甲龙", "护城龙", "结草儿", "结草贵妇", "绅士蛾", "三蜜蜂", "蜂女王", "帕奇利兹", "泳圈鼬", "浮潜鼬", "樱花宝", "樱花儿", "无壳海兔", "海兔兽", "双尾怪手", "飘飘球", "随风球", "卷卷耳", "长耳兔", "梦妖魔", "乌鸦头头", "魅力喵", "东施喵", "铃铛响", "臭鼬噗", "坦克臭鼬", "铜镜怪", "青铜钟", "盆才怪", "魔尼尼", "小福蛋", "聒噪鸟", "花岩怪", "圆陆鲨", "尖牙陆鲨", "烈咬陆鲨", "小卡比兽", "利欧路", "路卡利欧", "沙河马", "河马兽", "钳尾蝎", "龙王蝎", "不良蛙", "毒骷蛙", "尖牙笼", "荧光鱼", "霓虹鱼", "小球飞鱼", "雪笠怪", "暴雪王", "玛狃拉", "自爆磁怪", "大舌舔", "超甲狂犀", "巨蔓藤", "电击魔兽", "鸭嘴炎兽", "波克基斯", "远古巨蜓", "叶伊布", "冰伊布", "天蝎王", "象牙猪", "多边兽Ｚ", "艾路雷朵", "大朝北鼻", "黑夜魔灵", "雪妖女", "洛托姆", "由克希", "艾姆利多", "亚克诺姆", "帝牙卢卡", "帕路奇亚", "席多蓝恩", "雷吉奇卡斯", "骑拉帝纳", "克雷色利亚", "霏欧纳", "玛纳霏", "达克莱伊", "谢米", "阿尔宙斯", "比克提尼", "藤藤蛇", "青藤蛇", "君主蛇", "暖暖猪", "炒炒猪", "炎武王", "水水獭", "双刃丸", "大剑鬼", "探探鼠", "步哨鼠", "小约克", "哈约克", "长毛狗", "扒手猫", "酷豹", "花椰猴", "花椰猿", "爆香猴", "爆香猿", "冷水猴", "冷水猿", "食梦梦", "梦梦蚀", "豆豆鸽", "咕咕鸽", "高傲雉鸡", "斑斑马", "雷电斑马", "石丸子", "地幔岩", "庞岩怪", "滚滚蝙蝠", "心蝙蝠", "螺钉地鼠", "龙头地鼠", "差不多娃娃", "搬运小匠", "铁骨土人", "修建老匠", "圆蝌蚪", "蓝蟾蜍", "蟾蜍王", "投摔鬼", "打击鬼", "虫宝包", "宝包茧", "保姆虫", "百足蜈蚣", "车轮球", "蜈蚣王", "木棉球", "风妖精", "百合根娃娃", "裙儿小姐", "野蛮鲈鱼", "黑眼鳄", "混混鳄", "流氓鳄", "火红不倒翁", "达摩狒狒", "街头沙铃", "石居蟹", "岩殿居蟹", "滑滑小子", "头巾混混", "象征鸟", "哭哭面具", "死神棺", "原盖海龟", "肋骨海龟", "始祖小鸟", "始祖大鸟", "破破袋", "灰尘山", "索罗亚", "索罗亚克", "泡沫栗鼠", "奇诺栗鼠", "哥德宝宝", "哥德小童", "哥德小姐", "单卵细胞球", "双卵细胞球", "人造细胞卵", "鸭宝宝", "舞天鹅", "迷你冰", "多多冰", "双倍多多冰", "四季鹿", "萌芽鹿", "电飞鼠", "盖盖虫", "骑士蜗牛", "哎呀球菇", "败露球菇", "轻飘飘", "胖嘟嘟", "保姆曼波", "电电虫", "电蜘蛛", "种子铁球", "坚果哑铃", "齿轮儿", "齿轮组", "齿轮怪", "麻麻小鱼", "麻麻鳗", "麻麻鳗鱼王", "小灰怪", "大宇怪", "烛光灵", "灯火幽灵", "水晶灯火灵", "牙牙", "斧牙龙", "双斧战龙", "喷嚏熊", "冻原熊", "几何雪花", "小嘴蜗", "敏捷虫", "泥巴鱼", "功夫鼬", "师父鼬", "赤面龙", "泥偶小人", "泥偶巨人", "驹刀小兵", "劈斩司令", "爆炸头水牛", "毛头小鹰", "勇士雄鹰", "秃鹰丫头", "秃鹰娜", "熔蚁兽", "铁蚁", "单首龙", "双首暴龙", "三首恶龙", "燃烧虫", "火神蛾", "勾帕路翁", "代拉基翁", "毕力吉翁", "龙卷云", "雷电云", "莱希拉姆", "捷克罗姆", "土地云", "酋雷姆", "凯路迪欧", "美洛耶塔", "盖诺赛克特", "哈力栗", "胖胖哈力", "布里卡隆", "火狐狸", "长尾火狐", "妖火红狐", "呱呱泡蛙", "呱头蛙", "甲贺忍蛙", "掘掘兔", "掘地兔", "小箭雀", "火箭雀", "烈箭鹰", "粉蝶虫", "粉蝶蛹", "彩粉蝶", "小狮狮", "火炎狮", "花蓓蓓", "花叶蒂", "花洁夫人", "坐骑小羊", "坐骑山羊", "顽皮熊猫", "流氓熊猫", "多丽米亚", "妙喵", "超能妙喵", "独剑鞘", "双剑鞘", "坚盾剑", "粉香香", "芳香精", "绵绵泡芙", "胖甜妮", "好啦鱿", "乌贼王", "龟脚脚", "龟足巨铠", "垃垃藻", "毒藻龙", "铁臂枪虾", "钢炮臂虾", "伞电蜥", "光电伞蜥", "宝宝暴龙", "怪颚龙", "冰雪龙", "冰雪巨龙", "仙子伊布", "摔角鹰人", "咚咚鼠", "小碎钻", "黏黏宝", "黏美儿", "黏美龙", "钥圈儿", "小木灵", "朽木妖", "南瓜精", "南瓜怪人", "冰宝", "冰岩怪", "嗡蝠", "音波龙", "哲尔尼亚斯", "伊裴尔塔尔", "基格尔德", "蒂安希", "胡帕", "波尔凯尼恩", "木木枭", "投羽枭", "狙射树枭", "火斑喵", "炎热喵", "炽焰咆哮虎", "球球海狮", "花漾海狮", "西狮海壬", "小笃儿", "喇叭啄鸟", "铳嘴大鸟", "猫鼬少", "猫鼬探长", "强颚鸡母虫", "虫电宝", "锹农炮虫", "好胜蟹", "好胜毛蟹", "花舞鸟", "萌虻", "蝶结萌虻", "岩狗狗", "鬃岩狼人", "弱丁鱼", "好坏星", "超坏星", "泥驴仔", "重泥挽马", "滴蛛", "滴蛛霸", "伪螳草", "兰螳花", "睡睡菇", "灯罩夜菇", "夜盗火蜥", "焰后蜥", "童偶熊", "穿着熊", "甜竹竹", "甜舞妮", "甜冷美后", "花疗环环", "智挥猩", "投掷猴", "胆小虫", "具甲武者", "沙丘娃", "噬沙堡爷", "拳海参", "属性：空", "银伴战兽", "小陨星", "树枕尾熊", "爆焰龟兽", "托戈德玛尔", "谜拟Q", "磨牙彩皮鱼", "老翁龙", "破破舵轮", "心鳞宝", "鳞甲龙", "杖尾鳞甲龙", "卡璞・鸣鸣", "卡璞・蝶蝶", "卡璞・哞哞", "卡璞・鳍鳍", "科斯莫古", "科斯莫姆", "索尔迦雷欧", "露奈雅拉", "虚吾伊德", "爆肌蚊", "费洛美螂", "电束木", "铁火辉夜", "纸御剑", "恶食大王", "奈克洛兹玛", "玛机雅娜", "玛夏多"]
    };
})();
