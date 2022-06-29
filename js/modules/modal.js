
// Закрытие модального окна
function modalClose(modalSelector) {
    document.querySelector(modalSelector).classList.remove('show');
    document.body.style.overflow = '';
    clearInterval(modalOpen);
}
// Открытие модального окна
function modalOpen(modalSelector) {
    document.querySelector(modalSelector).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function modal(modalData, modalSelector) {
    const modalCall = document.querySelectorAll(modalData),
            modalFrame = document.querySelector(modalSelector);
    // Добавляем событие Click'а на все кнопки
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

export default modal;
export {modalClose};
export {modalOpen};