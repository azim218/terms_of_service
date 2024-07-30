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

    // Добавление светлячков
    const fireflies = [
        { id: 'rulesModal', label: 'Правила' },
        { id: 'privacyModal', label: 'Политика' },
        { id: 'contactModal', label: 'Контакты' }
    ];

    fireflies.forEach((firefly, index) => {
        let el = document.createElement('div');
        el.className = 'firefly';
        el.textContent = firefly.label;
        el.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
        el.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
        el.style.animationDelay = `${index * 2}s`; // Задержка для анимации
        el.onclick = function () {
            document.getElementById(firefly.id).style.display = "block";
        };
        document.body.appendChild(el);
    });
});



