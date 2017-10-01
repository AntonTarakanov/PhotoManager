"use strict";
/* TODO console - временно, пока не будет нормальной авторизации */
function vkStart () {
    let source = getOptionsVK('source');
    console.log("link for get token - " + showLinkForToken());
    createRequest(source);
}
/* делает запрос на VK. JSONP. */
/* TODO разобраться что делать при большом кол-ве запросов */
/* TODO перепилить когда будет больше запросов и понятна архитектура их выполнения */
/* reqMethod - для маршрутизации */
/* url - готовый линк для запроса */
function createRequest(reqMethod, url) {
    let script = document.createElement('SCRIPT');
    switch (reqMethod) {
        case 'groups':
            script.src = getURLGroups();
            break;
        case 'getAlbumsGroup':
        case 'getPhotoAlbum':
            script.src = url;
            break;
        default:
            alert('На данный момент в программе нет такого запроса');
    }
    document.getElementsByTagName("head")[0].appendChild(script);
}
/* TODO переписать/удалить после появления конструктора запросов */
function getURLGroups() {
        let param = 'extended=1&count=10&fields=photo_50';
        return 'https://api.vk.com/method/groups.get?'+param+'&access_token='+getVKToken()+'&v=5.52&callback=drawArea';
}
/* callback функция для: groups */
/* TODO переписать параметр title */
function drawArea(result) {
    let items = result.response.items,
        cfg = [];
    for (let i=0; i<items.length; i++) {
        cfg[i]= {
            name: items[i].screen_name,
            id: items[i].id,
            photo: items[i].photo_50,
            title: 'группы'
        }
    }
    createAreaOptionsList(cfg);
}
/* Заполняем окно optionsVK. Использовать для вёрстки списка с полями name, id, photo */
function createAreaOptionsList(cfg) {
    let output;
    output = '<div class="pm_frame_title pm_title">'+cfg[1].title+'</div>';
    for (let i = 0; i<cfg.length; i++) {
        output += '<div class="pm_frame_optionsCell" data-name="'+cfg[i].name+'"'+' data-id="'+cfg[i].id+'">' +
            '<div class="">'+cfg[i].name+'</div>' +
            '<img src="'+cfg[i].photo+'" class="miniPhoto">' +
            '</div>'
    }
    windowOptionsVK.innerHTML = output;
    windowOptionsVK.addEventListener('click', optionsActivateVK);
}


/* TODO поправить. Работает только на div, при клике на надпись - не работает */
function optionsActivateVK() {
    let nameLink = event.target.dataset.name;
    let linkId = event.target.dataset.id;
    let url = 'https://api.vk.com/method/photos.getAlbums?owner_id=-'+linkId+'&need_covers=1&v=5.52&callback=consoleLogGetAlbums';
    createRequest('getAlbumsGroup', url);
}

function consoleLogGetAlbums(result) {
    createAlbums(result, 'vk')
}
/* TODO объеденить с createWindowOptions и сделать универсальным */
function createAlbums(result, api) {
    let frame = api === 'vk' ? windowOptionsVK : windowOptionsVK,
        items = result.response.items,
        output = '<div class="pm_frame_title pm_title">VK-albums</div>';
    for (let i = 0; i<items.length; i++) {
        output += '<div class="pm_frame_optionsCell" data-owner="'+items[i].owner_id+'"'+' data-id="'+items[i].id+'">' +
            '<div class="">'+items[i].title+'</div>' +
            '<img src="'+items[i].thumb_src+'" class="miniPhoto">' +
            '</div>'
    }
    frame.innerHTML = output;
    /* TODO спилить позже, когда дополнится логкика */
    /* добавляет data атрибут для обработки клика */
    if (api === 'vk') {
        windowOptionsVK.addEventListener('click', clickAlmumsVK);
        windowOptionsVK.dataset.type = 'vk';
    }
}

function clickAlbumsVK () {
    let owner = event.target.dataset.owner;
    let id = event.target.dataset.id;
    let url = 'https://api.vk.com/method/photos.get?owner_id=-'+owner+'&album_id='+id+'&v=5.52&callback=getPhotosAlbum';
    createRequest('getPhotoAlbum', url);
}
/*  */
function getPhotosAlbum() {
    createPhotoList();
    console.log();
}
/*  */
function createPhotoList() {
    console.log('photolist');
}