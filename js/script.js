'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

     // site timer

    const endTimer = '2022-07-20';

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

    function setTime(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(refreshClock, 1000);

            function refreshClock() {
                const time = GetTimeRemaining(endTimer);

                days.innerHTML = addZero(time.days);
                hours.innerHTML = addZero(time.hours);
                minutes.innerHTML = addZero(time.minutes);
                seconds.innerHTML = addZero(time.seconds);

                if (time.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
    }
    setTime('.timer', endTimer);

    // modal frame

    const modalCall = document.querySelectorAll('[data-modal]'),
          modalFrame = document.querySelector('.modal');

          modalCall.forEach((value) =>{
            value.addEventListener('click', () => {
                modalOpen();
            });
        });

    function modalOpen() {
        modalFrame.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalOpen);
    }

    function modalClose() {
        modalFrame.classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(modalOpen);
    }

    modalFrame.addEventListener('click', (e) => {
        let target = e.target;

        if (!target.closest('.modal__content') || target.hasAttribute('data-close'))  {
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

    // const modalTimerId = setTimeout(modalOpen ,10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Create elements for class

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

    const getData = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
           throw new Error(`Could not feth $
           {url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, title, descr, price}) => {
                new CardElement(
                    title,
                    descr,
                    price,
                    'грн',
                    img,
                    '.menu__field .container',
                     'menu__item'
                ).render();
            });
        });




    // Forms

    const form = document.querySelectorAll('form');

    const formMessage = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    form.forEach(item => {
        sendDataForm(item);
    });

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


            postData('http://localhost:3000/requests', json)
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
            modalOpen();
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
                modalClose();
            }, 3000);
        }
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


    // slider

        function simpleSlider(selector) {
            const sliderContainer = document.querySelector(selector),
            currentSlide = sliderContainer.querySelector('#current'),
            totalSlides = sliderContainer.querySelector('#total'),
            slides = sliderContainer.querySelectorAll('.offer__slide'),
            sliderPrev = sliderContainer.querySelector('.offer__slider-prev'),
            sliderNext = sliderContainer.querySelector('.offer__slider-next');
            let slideIndex = 1,
                slidesToScroll = 1;

            if (slides.length < 10) {
                totalSlides.textContent = `0${slides.length}`;
            } else {
                totalSlides.textContent = slides.length;
            }

            function changeSlide(index) {
                slideIndex += index ;
                if (slideIndex > slides.length) {
                    slideIndex = 1;
                } else if (slideIndex < 1) {
                    slideIndex = slides.length;
                }

                if (slides.length < 10) {
                    currentSlide.textContent = `0${slideIndex}`;
                } else {
                    currentSlide.textContent = slideIndex;
                }

                slides.forEach((value, index) => {
                    if (index === slideIndex - 1) {
                        value.classList.remove('hide');
                        value.classList.add('current-slide');
                        return;
                    }
                    value.classList.add('hide');
                    value.classList.remove('current-slide');
                });
            }

            changeSlide(0);

            sliderPrev.addEventListener('click', () => {
                changeSlide(-slidesToScroll);
            });
            sliderNext.addEventListener('click', () => {
                changeSlide(slidesToScroll);
            });
        }


        // slider init
        simpleSlider('.offer__slider');

        // events


});
