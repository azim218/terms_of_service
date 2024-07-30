document.addEventListener('DOMContentLoaded', (event) => {
    var modals = document.querySelectorAll('.modal');
    var spans = document.querySelectorAll('.close');
    var backButtons = document.querySelectorAll('.back-button');
    var rulesButton = document.getElementById('rulesButton');
    var privacyButton = document.getElementById('privacyButton');
    var contactButton = document.getElementById('contactButton');

    // Функция для закрытия всех модальных окон
    function closeModals() {
        modals.forEach(modal => modal.style.display = "none");
    }

    // Закрытие модальных окон при клике на крестик или кнопку "Назад"
    spans.forEach(span => {
        span.onclick = closeModals;
    });

    backButtons.forEach(button => {
        button.onclick = closeModals;
    });

    // Закрытие модальных окон при клике за пределами модального окна
    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            closeModals();
        }
    }

    // Открытие соответствующих модальных окон
    rulesButton.onclick = function () {
        document.getElementById('rulesModal').style.display = "block";
    };
    privacyButton.onclick = function () {
        document.getElementById('privacyModal').style.display = "block";
    };
    contactButton.onclick = function () {
        document.getElementById('contactModal').style.display = "block";
    };
});



