"use strict";
let buttonVK = document.getElementById('buttonVK');
let windowOptionsVK = document.getElementById('windowOptionsVK');
let windowOptionsPM = document.getElementById('windowOptionsPM');

buttonVK.addEventListener('click', vkActivate);

function vkActivate () {
    windowOptionsPM.style.display = 'none';
    windowOptionsVK.style.display = '';
    vkStart();
}
