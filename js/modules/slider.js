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



export default simpleSlider;