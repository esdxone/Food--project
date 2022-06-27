import {getData} from '../service/services';
function cards() {
    // Класс для формирования карточек меню
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
        // Метод конвертации валюты
        convertToUAH() {
            this.price = this.price * this.currencyValue;
        }
        // Метод формирования карточки товара
        render() {
            const block = document.createElement('div');
            //Если в конструктор класса передано больше классов, то добавляем их на карточку
            if (this.classes.length >= 1) {
                this.classes.forEach(className => block.classList.add(className));
            } else {
                this.block = 'menu__item';
                block.classList.add(this.block);
            }
            // Формируем вёрстку
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



    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, title, descr,price}) => {
                new CardElement( title, descr, price,'грн', img,'.menu__field .container','menu__item'
                ).render();
            });
        });
}

export default cards;