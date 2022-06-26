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

export default calc;