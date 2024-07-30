document.addEventListener('DOMContentLoaded', (event) => {
    var modal = document.getElementById("modal");
    var close = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            showModal(this.getAttribute('data-section'));
        });
    });

    close.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function showModal(section) {
        const modalBody = document.getElementById('modal-body');
        const sections = {
            'rules': '<h2>Основные правила</h2><ul><li>Не используйте бота для спама.</li><li>Не пытайтесь взломать или обойти ограничения бота.</li><li>Соблюдайте уважение и корректность в общении с ботом и другими пользователями.</li><li>Нельзя использовать бота для получения информации, которая противоречит законам вашей страны.</li></ul>',
            'contact': '<h2>Контакты</h2><p>Discord: azim218</p><p>Email: emilazimmuk@gmail.com</p>',
            'privacy': '<h2>Политика конфиденциальности</h2><p>Ваши данные будут защищены и не будут переданы третьим лицам без вашего согласия.</p><p>Для получения дополнительной информации свяжитесь с нами.</p>'
        };
        modalBody.innerHTML = sections[section];
        modal.style.display = "block";
    }

    // Добавление светлячков
    const body = document.querySelector('body');
    for (let i = 0; i < 3; i++) {
        const bug = document.createElement('div');
        bug.className = 'bug';
        bug.style.top = Math.random() * 100 + '%';
        bug.style.left = Math.random() * 100 + '%';
        body.appendChild(bug);
    }
});
