document.addEventListener('DOMContentLoaded', (event) => {
    var modals = document.querySelectorAll('.modal');
    var spans = document.querySelectorAll('.close');
    var backButtons = document.querySelectorAll('.back-button');

    spans.forEach(span => {
        span.onclick = function () {
            modals.forEach(modal => modal.style.display = "none");
        }
    });

    backButtons.forEach(button => {
        button.onclick = function () {
            modals.forEach(modal => modal.style.display = "none");
        }
    });

    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

    // Открытие модальных окон
    const footerButtons = document.querySelectorAll('.footer-button');
    footerButtons.forEach(button => {
        button.onclick = function () {
            var modalId = button.getAttribute('data-modal');
            document.getElementById(modalId).style.display = "block";
        }
    });
});



