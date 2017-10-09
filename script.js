"use strict";
let buttonVK = document.getElementById('buttonVK'),
    windowOptionsVK = document.getElementById('windowOptionsVK'),
    windowOptionsPM = document.getElementById('windowOptionsPM'),
    bigPhotoArea = document.getElementById('bigPhotoArea'),
    vkLogo = document.getElementById('vkLogo');

let photoSet = [];

buttonVK.addEventListener('click', vkActivate);
bigPhotoArea.addEventListener('click', togglePhoto);
vkLogo.addEventListener('click', authVk);
/* Нажатие на 'поработаем с ВК' */
function vkActivate() {
    windowOptionsPM.style.display = 'none';
    windowOptionsVK.style.display = '';
    vkStart();
}
/* Показываем фотографию в большой области */
function showBigPhoto() {
    bigPhotoArea.src = photoSet[0].photo_604;
    bigPhotoArea.dataset.i = '0';
}
/* Пролистываем фото дальше. Ограничение 20 шт. */
function togglePhoto() {
    let serialNumber = +bigPhotoArea.dataset.i;
    if (serialNumber<19) {
        bigPhotoArea.src = photoSet[serialNumber+1].photo_604;
        bigPhotoArea.dataset.i = serialNumber+1;
    } else {
        showBigPhoto();
    }
}
/* TODO тут должен быть метод сохранения черз canvas и/или node.js */
function saveImage(img, fn) {
    /*let c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    let ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    c.toBlob(function (blob) {
        saveAs(blob, fn);
    });*/
}
/* TODO доделать авторизацию до конца */
function authVk() {
    location.href = getLinkAuthVk();
}