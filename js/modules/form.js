import {
    modalClose,
    modalOpen
} from './modal';
import {
    postData
} from '../service/services';

function form(formSelector) {
    const form = document.querySelectorAll(formSelector);
    // Указываем сообщения в зависимости от состояния формы
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
            // Устанавливаем анимацию загрузки
            const statusMessage = document.createElement('img');
            statusMessage.setAttribute('src', formMessage.loading);
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Отправляем данные на сервер
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
        // Показываем сообщение об успешной отправке
        function showSuccessModal(message) {
            const modalContentDialog = document.querySelector('.modal__dialog');

            modalContentDialog.classList.add('hide');
            modalOpen('.modal');
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
}

export default form;