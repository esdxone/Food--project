/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings() {
        let items = document.querySelectorAll('.calculating__choose-item');

        items.forEach((item) => {
            if (item.hasAttribute('data-ratio') && localStorage.getItem('ratio')) {
                item.classList.remove('calculating__choose-item_active');
                if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    item.classList.add('calculating__choose-item_active');
                }
            } else {
                item.classList.remove('calculating__choose-item_active');
                if (item.getAttribute('id') === localStorage.getItem('sex')) {
                    item.classList.add('calculating__choose-item_active');
                }
            }
        });
    }
    initLocalSettings();

    function calcTotal() {

        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "0";
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getValue() {
        let items = document.querySelectorAll('.calculating__choose-item');
        items.forEach((item) => {
            if (item.tagName == "INPUT") {
                item.addEventListener('input', () => {

                    if (item.value.match(/\D/g)) {
                        item.style.borderBottom = '1px solid red';
                    } else {
                        item.style.borderBottom = 'none';
                    }

                    switch (item.getAttribute('id')) {
                        case 'height':
                            height = +item.value;
                            break;
                        case 'weight':
                            weight = +item.value;
                            break;
                        case 'age':
                            age = +item.value;
                            break;
                    }
                    calcTotal();
                });
            } else {
                item.addEventListener('click', (e) => {

                    if (e.target.hasAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                        items.forEach((item) => {
                            if (item.hasAttribute('data-ratio')) {
                                item.classList.remove('calculating__choose-item_active');
                            }
                            e.target.classList.add('calculating__choose-item_active');
                        });

                    } else {

                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                        items.forEach((item) => {
                            if (!item.hasAttribute('data-ratio')) {
                                item.classList.remove('calculating__choose-item_active');
                            }
                            e.target.classList.add('calculating__choose-item_active');
                        });

                    }
                    calcTotal();
                });
            }
        });
    }

    getValue();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/services */ "./js/service/services.js");

function cards() {
    class CardElement {

        constructor(title, desciption, price, currency, img, parent, ...classes) {
            this.title = title;
            this.desciption = desciption;
            this.price = price;
            this.img = img;
            this.parent = document.querySelector(parent);
            this.currency = currency;
            this.currencyValue = 3;
            this.classes = classes;
            this.convertToUAH();
        }

        convertToUAH() {
            this.price = this.price * this.currencyValue;
        }

        render() {
            const block = document.createElement('div');
            if (this.classes.length >= 1) {
                this.classes.forEach(className => block.classList.add(className));
            } else {
                this.block = 'menu__item';
                block.classList.add(this.block);
            }
            block.innerHTML = `
            <img src="${this.img}" alt="${this.title}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.desciption}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> ${this.currency}/дней</div>
            </div>
        `;

            this.parent.append(block);
        }
    }



    (0,_service_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, title, descr,price}) => {
                new CardElement( title, descr, price,'грн', img,'.menu__field .container','menu__item'
                ).render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _service_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/services */ "./js/service/services.js");



function form(formSelector) {
    const form = document.querySelectorAll(formSelector);

    const formMessage = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    form.forEach(item => {
        sendDataForm(item);
    });


    function sendDataForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.setAttribute('src', formMessage.loading);
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            (0,_service_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    showSuccessModal(formMessage.success);
                    statusMessage.remove();
                }).catch(() => {
                    showSuccessModal(formMessage.failure);
                }).finally(() => {
                    form.reset();
                });
        });

        function showSuccessModal(message) {
            const modalContentDialog = document.querySelector('.modal__dialog');

            modalContentDialog.classList.add('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal');
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>`;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                modalContentDialog.classList.remove('hide');
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)();
            }, 3000);
        }
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalClose": () => (/* binding */ modalClose),
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen)
/* harmony export */ });
function modalClose(modalSelector) {
    document.querySelector(modalSelector).classList.remove('show');
    document.body.style.overflow = '';
    clearInterval(modalOpen);
}

function modalOpen(modalSelector) {
    document.querySelector(modalSelector).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function modal(modalData, modalSelector) {
    const modalCall = document.querySelectorAll(modalData),
            modalFrame = document.querySelector(modalSelector);

    modalCall.forEach((value) => {
        value.addEventListener('click', () => {
            modalOpen(modalSelector);
        });
    });

    modalFrame.addEventListener('click', (e) => {
        let target = e.target;

        if (!target.closest('.modal__content') || target.hasAttribute('data-close')) {
            modalFrame.classList.remove('show');
            document.body.style.overflow = '';
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalFrame.classList.contains('show')) {
            modalFrame.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10) {
            modalOpen(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
    function simpleSlider({
        selector,
        slideSelector,
        slideToScroll,
        slidePrev,
        slideNext,
        wrapper,
        field,
        transform,
        dots
    }) {
        const sliderContainer = document.querySelector(selector),
            currentSlide = sliderContainer.querySelector('#current'),
            totalSlides = sliderContainer.querySelector('#total'),
            slides = sliderContainer.querySelectorAll(slideSelector),
            sliderPrev = sliderContainer.querySelector(slidePrev),
            sliderNext = sliderContainer.querySelector(slideNext),
            sliderWrapper = sliderContainer.querySelector(wrapper),
            sliderField = sliderContainer.querySelector(field),
            slideWidth = sliderContainer.querySelector('.offer__slide').offsetWidth;

        let slideIndex = 1,
            slidesToScroll = slideToScroll,
            offset = 0;

        if (transform) {
            sliderField.style.width = slides.length * slideWidth + 'px';
            sliderField.classList.add('slider-track');
            slides.forEach((slide) => {
                slide.style.width = slideWidth + 'px';
            });
        }

        if (dots) {
            const dotsContainer = document.createElement('div');
            dotsContainer.classList.add('carousel-indicators');
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('data-index', i + 1);
                dotsContainer.append(dot);
            }
            sliderWrapper.append(dotsContainer);

            sliderWrapper.addEventListener('click', (e) => {
                let attrIndex = +e.target.getAttribute('data-index');
                if (e.target.classList.contains('dot')) {
                    changeSlide(attrIndex);
                }
            });
        }

        sliderPrev.addEventListener('click', () => {
            let sliderPosition = +sliderWrapper.getAttribute('data-current-slide');
            changeSlide(sliderPosition - slidesToScroll);
        });
        sliderNext.addEventListener('click', () => {
            let sliderPosition = +sliderWrapper.getAttribute('data-current-slide');
            changeSlide(sliderPosition + slidesToScroll);
        });

        function changeSlide(index) {

            slideIndex = index;

            if (slideIndex > slides.length) {
                slideIndex = 1;
            } else if (slideIndex < 1) {
                slideIndex = slides.length;
            }

            if (slides.length < 10) {
                currentSlide.textContent = `0${slideIndex}`;
                totalSlides.textContent = `0${slides.length}`;
            } else {
                currentSlide.textContent = slideIndex;
                totalSlides.textContent = slides.length;
            }

            sliderWrapper.setAttribute('data-current-slide', slideIndex);

            if (dots) {
                const dots = sliderContainer.querySelectorAll('.dot'),
                    sliderPosition = sliderWrapper.getAttribute('data-current-slide');
                dots.forEach((value, index) => {
                    if (+sliderPosition === index + 1) {
                        value.classList.add('active');
                        return;
                    }
                    value.classList.remove('active');
                });
            }

            if (!transform) {
                slides.forEach((value, index) => {
                    if (index === slideIndex - 1) {
                        value.classList.remove('hide');
                        return;
                    }
                    value.classList.add('hide');
                });
            } else {
                offset = slideWidth * (slideIndex - 1);
                sliderField.style.transform = `translateX(${-offset}px)`;
            }
        }
        // default slide
        changeSlide(1);
    }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (simpleSlider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabSelector, tabContent, tabParent, activeClass) {

    const tabs = document.querySelectorAll(tabSelector),
        tabsContent = document.querySelectorAll(tabContent),
        tabsParent = document.querySelector(tabParent);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(selector ,timeToEnd) {
    const endTimer = timeToEnd;

    function GetTimeRemaining(endtime) {

        let days, hours, minutes, seconds;
        const time = Date.parse(endtime) - Date.parse(new Date());

        if (time <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
                hours = Math.floor((time / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((time / 1000 / 60) % 60),
                seconds = Math.floor((time / 1000) % 60);
        }

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setTime(endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(refreshClock, 1000);

        function refreshClock() {
            const time = GetTimeRemaining(endtime);

            days.innerHTML = addZero(time.days);
            hours.innerHTML = addZero(time.hours);
            minutes.innerHTML = addZero(time.minutes);
            seconds.innerHTML = addZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setTime(endTimer);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/service/services.js":
/*!********************************!*\
  !*** ./js/service/services.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await res.json();
};
const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not feth $
       {url}, status: ${res.status}`);
    }
    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]','.modal');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        selector: '.offer__slider',
        slideSelector: '.offer__slide',
        slidePrev: '.offer__slider-prev',
        slideNext: '.offer__slider-next',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slideToScroll: 1,
        transform: true,
        dots: true
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('2022-07-20');

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map