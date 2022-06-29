'use strict';

import tabs from './modules/tabs';
import cards from './modules/cards';
import calc from './modules/calc';
import form from './modules/form';
import modal from './modules/modal';
import simpleSlider from './modules/slider';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active');
    cards();
    calc();
    form('form');
    modal('[data-modal]','.modal');
    simpleSlider({
        selector: '.offer__slider',
        slideSelector: '.offer__slide',
        slidePrev: '.offer__slider-prev',
        slideNext: '.offer__slider-next',
        field: '.offer__slider-inner',
        slideToScroll: 1,
        transform: true,
        dots: true
    });
    timer('.timer','2022-07-20');

});