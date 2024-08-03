document.addEventListener('DOMContentLoaded', (event) => {
    const modals = document.querySelectorAll('.modal');
    const spans = document.querySelectorAll('.close');
    const backButtons = document.querySelectorAll('.back-button');
    const rulesButton = document.getElementById('rulesButton');
    const privacyButton = document.getElementById('privacyButton');
    const contactButton = document.getElementById('contactButton');
    const supportButton = document.getElementById('supportButton');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    
    const supportSendButton = document.getElementById('supportSendButton');
    const supportMessageInput = document.getElementById('supportMessageInput');
    const supportResponse = document.getElementById('supportResponse');
    
    const webhookUrl = 'https://discord.com/api/webhooks/1268558798696480861/0chltrwLyEZdNZuWuyVkOLTM9b-y-NW610UxG29troQNNqLns7m3Ju-tY1t_jk6v0qYz';  // Замените на свой URL вебхука

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

            // Получаем текст ответа, если он есть
            const responseData = await response.text();
            return responseData;  // Возвращаем текстовый ответ
        } catch (error) {
            console.error('Error sending message:', error);
            return null;  // Возвращаем null в случае ошибки
        }
    }

    // Отправка сообщения при нажатии на кнопку отправки чата
    sendButton.onclick = async function () {
        const message = messageInput.value.trim();
        if (message) {
            const response = await sendMessageToDiscord(message);
            if (response) {
                console.log('Response from Discord bot:', response);
            } else {
                console.log('Error or empty response');
            }
            messageInput.value = ''; // Очистить поле ввода после отправки
        } else {
            console.log('Message is empty');
        }
    };

    // Отправка сообщения при нажатии на кнопку отправки поддержки
    supportSendButton.onclick = async function () {
        const message = supportMessageInput.value.trim();
        if (message) {
            const response = await sendMessageToDiscord(message);
            if (supportResponse) {
                if (response) {
                    supportResponse.textContent = 'Ответ от бота: ' + response;
                } else {
                    supportResponse.textContent = 'Ошибка при получении ответа.';
                }
            } else {
                console.error('Support response element not found.');
            }
            supportMessageInput.value = ''; // Очистить поле ввода после отправки
        } else {
            if (supportResponse) {
                supportResponse.textContent = 'Сообщение пустое.';
            } else {
                console.error('Support response element not found.');
            }
        }
    };
});












