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
        case 'getPhoto':
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
/* callback функция для: groups, getAlbums */
/* TODO переписать параметр title */
function drawArea(result) {
    console.log(result);
    let items = result.response.items,
        cfg = [];
    for (let i=0; i<items.length; i++) {
        cfg[i]= {
            name: items[i].screen_name || items[i].title,
            id: items[i].id,
            photo: items[i].photo_50 || items[i].thumb_src,
            title: 'группы/альбомы',
            owner: items[i].name || items[i].owner_id,
            type: items[i].type
        }
    }
    createAreaOptionsList(cfg);
}
/* Заполняем окно optionsVK. Использовать для вёрстки списка с полями name, id, photo */
function createAreaOptionsList(cfg) {
    let output;
    output = '<div class="pm_frame_title pm_title" data-type="'+'">'+cfg[1].title+'</div>';
    for (let i = 0; i<cfg.length; i++) {
        let type = cfg[i].type ? cfg[i].type : '';
        output += '<div class="pm_frame_optionsCell" data-name="'+
            cfg[i].name+'"'+' data-id="'+cfg[i].id+
            '" data-owner="'+cfg[i].owner+'" data-type="'+type+'">' +
            '<div class="">'+cfg[i].name+'</div>' +
            '<img src="'+cfg[i].photo+'" class="pm_showPhoto__miniPhoto">' +
            '</div>'
    }
    windowOptionsVK.innerHTML = output;
    windowOptionsVK.addEventListener('click', optionsActivateVK);
}
/* TODO поправить. Работает только на div, при клике на надпись - не работает */
function optionsActivateVK() {
    let cfg = {
        name: event.target.dataset.name,
        id: event.target.dataset.id,
        owner: event.target.dataset.owner
    },
        type = event.target.dataset.type;
    if (type) {
        createRequest('getAlbumsGroup', getUrlAlbums(cfg));
    } else {
        createRequest('getPhoto', getUrlPhotos(cfg));
    }
}
/* отдаёт ссылку для запроса получения альбомов группы */
function getUrlAlbums(cfg) {
    return 'https://api.vk.com/method/photos.getAlbums?owner_id=-'+cfg.id+'&need_covers=1&v=5.52&callback=drawArea';
}
/* отдаёт ссылку для запроса получения фотографий альбома */
function getUrlPhotos(cfg) {
    return 'https://api.vk.com/method/photos.get?owner_id='+cfg.owner+'&album_id='+cfg.id+'&count=50&v=5.52&callback=responsePhoto';
}

function responsePhoto(result) {
    photoSet = result.response.items;
    drawPhotoTile();
    showBigPhoto();
}
