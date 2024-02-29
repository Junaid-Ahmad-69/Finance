'use strict';
let w = window.innerWidth;
let xl = 1440;
let md = 768;
let ws = (w / 1440) * 10;

if (w >= md) {
    document.querySelector("html").style.fontSize = ws + "px";
}

window.addEventListener("resize", function () {
    w = window.innerWidth;
    xl = 1440;
    md = 768;
    ws = (w / 1440) * 10;

    if (w >= md) {
        document.querySelector("html").style.fontSize = ws + "px";
    }
});

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btnModal => btnModal.addEventListener("click", openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});