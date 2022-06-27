    function simpleSlider({
        selector, // Основной контейнер слайдера
        slideSelector, // Класс слайдов
        slideToScroll, // Количество слайдов для скролла (только для стрелок)
        slidePrev, // Класс навигации (Предыдущий слайд)
        slideNext, // Класс навигации (Следующий слайд)
        field, // Контейнер для слайдов (track)
        transform, // Смещение слайдов через transform (true/false)
        dots // Точки (true/false)
    }) {
        const sliderContainer = document.querySelector(selector),
            currentSlide = sliderContainer.querySelector('#current'),
            totalSlides = sliderContainer.querySelector('#total'),
            slides = sliderContainer.querySelectorAll(slideSelector),
            sliderPrev = sliderContainer.querySelector(slidePrev),
            sliderNext = sliderContainer.querySelector(slideNext),
            sliderWrapper = sliderContainer.querySelector('.offer__slider-wrapper'),
            sliderField = sliderContainer.querySelector(field),
            slideWidth = sliderContainer.querySelector('.offer__slide').offsetWidth;

        let slideIndex = 1,
            slidesToScroll = slideToScroll,
            offset = 0;
        // Если свойство transform = true, смещение слайдов будет реализовано через translate
        if (transform) {
            sliderField.style.width = slides.length * slideWidth + 'px';
            sliderField.classList.add('slider-track');
            slides.forEach((slide) => {
                slide.style.width = slideWidth + 'px';
            });
        }
        // Если dots = true, формируем навигационные точки
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
            // Переключаем слайд по клику на элемент
            sliderWrapper.addEventListener('click', (e) => {
                let attrIndex = +e.target.getAttribute('data-index');
                if (e.target.classList.contains('dot')) {
                    changeSlide(attrIndex);
                }
            });
        }
        // Переключаем на предыдущий слайд
        sliderPrev.addEventListener('click', () => {
            let sliderPosition = +sliderWrapper.getAttribute('data-current-slide');
            changeSlide(sliderPosition - slidesToScroll);
        });
        // Переключаем следующий слайд
        sliderNext.addEventListener('click', () => {
            let sliderPosition = +sliderWrapper.getAttribute('data-current-slide');
            changeSlide(sliderPosition + slidesToScroll);
        });

        function changeSlide(index) {

            slideIndex = index;

            // Цикличное переключение слайдов
            if (slideIndex > slides.length) {
                slideIndex = 1;
            } else if (slideIndex < 1) {
                slideIndex = slides.length;
            }

            // Уставливаем значения для счетчика слайдов
            if (slides.length < 10) {
                currentSlide.textContent = `0${slideIndex}`;
                totalSlides.textContent = `0${slides.length}`;
            } else {
                currentSlide.textContent = slideIndex;
                totalSlides.textContent = slides.length;
            }
            // Устанавливаем дата-атрибут с текущим слайдом
            sliderWrapper.setAttribute('data-current-slide', slideIndex);

            // Устанавливаем класс активности для точек
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
                // Переключение слайдов через классы show/hide
                slides.forEach((value, index) => {
                    if (index === slideIndex - 1) {
                        value.classList.remove('hide');
                        return;
                    }
                    value.classList.add('hide');
                });
            } else {
                // Переключение слайдов методом translate
                offset = slideWidth * (slideIndex - 1);
                sliderField.style.transform = `translateX(${-offset}px)`;
            }
        }
        // Устанавливаем слайд по умолчанию
        changeSlide(1);
    }



export default simpleSlider;