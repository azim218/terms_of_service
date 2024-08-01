document.addEventListener('DOMContentLoaded', (event) => {
    var modals = document.querySelectorAll('.modal');
    var spans = document.querySelectorAll('.close');
    var backButtons = document.querySelectorAll('.back-button');
    var rulesButton = document.getElementById('rulesButton');
    var privacyButton = document.getElementById('privacyButton');
    var contactButton = document.getElementById('contactButton');
    var supportButton = document.getElementById('supportButton');
    var mainContent = document.querySelector('main');
    var footer = document.querySelector('footer');
    var sendButton = document.getElementById('sendButton');
    var messageInput = document.getElementById('messageInput');
    var supportForm = document.getElementById('supportForm');
    var supportMessageInput = document.getElementById('supportMessage');
    var responseContainer = document.createElement('div'); // Контейнер для отображения ответов
    responseContainer.classList.add('response-container');
    mainContent.appendChild(responseContainer);

    const webhookUrl = 'https://discord.com/api/webhooks/123456789012345678/your-webhook-token'; // Замените на свой URL вебхука

    // Функция для закрытия всех модальных окон
    function closeModals() {
        modals.forEach(modal => modal.style.display = "none");
        mainContent.classList.remove('blur');
        footer.classList.remove('blur');
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

    // Открытие соответствующих модальных окон с размытием фона
    rulesButton.onclick = function () {
        document.getElementById('rulesModal').style.display = "block";
        mainContent.classList.add('blur');
        footer.classList.add('blur');
    };
    privacyButton.onclick = function () {
        document.getElementById('privacyModal').style.display = "block";
        mainContent.classList.add('blur');
        footer.classList.add('blur');
    };
    contactButton.onclick = function () {
        document.getElementById('contactModal').style.display = "block";
        mainContent.classList.add('blur');
        footer.classList.add('blur');
    };
    supportButton.onclick = function () {
        document.getElementById('supportModal').style.display = "block";
        mainContent.classList.add('blur');
        footer.classList.add('blur');
    };

    // Функция для отправки сообщения в Discord через вебхук
    async function sendMessageToDiscord(message) {
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: message
                })
            });

            // Проверка на статус ответа
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error sending message:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('Message sent successfully');
            displayResponse('Сообщение отправлено успешно!');
            messageInput.value = ''; // Очистить поле ввода после отправки
        } catch (error) {
            console.error('Error sending message:', error);
            displayResponse('Ошибка отправки сообщения. Попробуйте еще раз.');
        }
    }

    // Отправка сообщения при нажатии на кнопку
    sendButton.onclick = function () {
        const message = messageInput.value.trim();
        if (message) {
            sendMessageToDiscord(message);
        } else {
            console.log('Message is empty');
        }
    };

    // Обработчик формы поддержки
    supportForm.onsubmit = async function (event) {
        event.preventDefault();
        const supportMessage = supportMessageInput.value.trim();
        if (supportMessage) {
            await sendMessageToDiscord(supportMessage);
            closeModals(); // Закрыть модальное окно после отправки сообщения
        } else {
            console.log('Support message is empty');
        }
    };

    // Функция для отображения ответов
    function displayResponse(response) {
        const responseElement = document.createElement('p');
        responseElement.textContent = response;
        responseContainer.appendChild(responseElement);

        // Автоматическая прокрутка вниз при добавлении нового ответа
        responseContainer.scrollTop = responseContainer.scrollHeight;
    }
});










