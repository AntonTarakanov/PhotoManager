/*
* TODO когда блоков будет побольше вывести общие элементы и написать всё более красиво
* Тут будут рисоваться блоки
* */

/* Добавляет маленькие плиточные изображения */
function drawPhotoTile() {
    let tileView;
    tileView = '<div class="pm_frame_title pm_title" data-type="'+'">Фото плиткой</div><div class="pm_showInfo__tileView">';
    for (let i=0; i<photoSet.length; i++) {
        tileView += '<div class="pm_showInfo__tile" data-name="" data-id=""' +
            '" data-owner="" data-type="">' +
            '<img src="'+photoSet[i].photo_75+'" class="pm_showPhoto__middlePhoto">' + /* photo_130 */
            '</div>'
    }
    tileView += '</div>';
    windowOptionsVK.innerHTML = tileView;
    console.log(photoSet);
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