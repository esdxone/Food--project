function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    // Проверяем наличие записей в localstorage
    !localStorage.getItem('sex') ? localStorage.setItem('sex', 'female') : sex =  localStorage.getItem('sex');
    !localStorage.getItem('ratio') ? localStorage.setItem('ratio', 1.375) : ratio =  localStorage.getItem('ratio');

    // Заполняем информацию для калькулятор из localstorage
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
        // Проверка на заполнение полей, если информации недостаточно записываем 0
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "0";
            return; //Останавливаем выполнение функции
        }
        //Проверка по полю "sex", в зависимости от значения разные формулы
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    // Получаем значения полей
    function getValue() {
        let items = document.querySelectorAll('.calculating__choose-item');
        items.forEach((item) => {
            // Получение значений со всех INPUT'ов
            if (item.tagName == "INPUT") {
                item.addEventListener('input', () => {
                    //Проверка строки на остуствие любых символов, кроме чисел
                    if (item.value.match(/\D/g)) {
                        item.style.borderBottom = '1px solid red';
                    } else {
                        item.style.borderBottom = 'none';
                    }
                    // Получаем значение атрибутов и записываем в переменные
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
                    // Вызываем функцинию по окончанию события
                    calcTotal();
                });
            } else {
                // Добавляем событие Click на все остальные элементы
                item.addEventListener('click', (e) => {
                    // Проверяем на наличие атрибута "data-ratio"
                    if (e.target.hasAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                        items.forEach((item) => { // Удаляем классы активности у всех элементов
                            if (item.hasAttribute('data-ratio')) {
                                item.classList.remove('calculating__choose-item_active');
                            }
                            e.target.classList.add('calculating__choose-item_active'); // Устанавливаем класс активности
                        });

                    } else {
                        // Получаем заниечение атрибута ID
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                        items.forEach((item) => { // Удаляем классы активности у всех элементов
                            if (!item.hasAttribute('data-ratio')) {
                                item.classList.remove('calculating__choose-item_active');
                            }
                            e.target.classList.add('calculating__choose-item_active');// Устанавливаем класс активности
                        });
                    }
                    // Вызываем функцинию по окончанию события
                    calcTotal();
                });
            }
        });
    }

    getValue();
}

export default calc;