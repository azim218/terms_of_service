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

    const webhookUrl = 'https://discord.com/api/webhooks/1268558798696480861/0chltrwLyEZdNZuWuyVkOLTM9b-y-NW610UxG29troQNNqLns7m3Ju-tY1t_jk6v0qYz';
    
    // Функция для открытия модального окна
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        mainContent.classList.add('blur');
        footer.classList.add('blur');
    }

    // Функция для закрытия модального окна
    function closeModal(modal) {
        modal.style.display = 'none';
        mainContent.classList.remove('blur');
        footer.classList.remove('blur');
    }

    // Обработчики кликов по кнопкам
    rulesButton.addEventListener('click', () => openModal('rulesModal'));
    privacyButton.addEventListener('click', () => openModal('privacyModal'));
    contactButton.addEventListener('click', () => openModal('contactModal'));
    supportButton.addEventListener('click', () => openModal('supportModal'));

    // Обработчики кликов по кнопкам закрытия и кнопкам назад
    spans.forEach(span => span.addEventListener('click', () => {
        const modal = span.closest('.modal');
        closeModal(modal);
    }));
    backButtons.forEach(button => button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    }));

    // Функция для отправки сообщения в Discord через вебхук
    async function sendMessageToDiscord(message) {
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: message })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Ошибка при отправке сообщения:', errorText);
                return 'Ошибка при отправке сообщения';
            }

            const responseData = await response.text();
            return responseData;
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            return 'Ошибка при выполнении запроса';
        }
    }

    // Обработчик клика по кнопке отправки сообщения в поддержке
    supportSendButton.addEventListener('click', async () => {
        const message = supportMessageInput.value.trim();
        if (message) {
            const response = await sendMessageToDiscord(message);
            supportResponse.textContent = 'Ответ от бота: ' + response;
            supportMessageInput.value = ''; // Очистить поле ввода после отправки
        } else {
            supportResponse.textContent = 'Сообщение пустое.';
        }
    });

    // Обработчик клика по кнопке отправки сообщения в основной форме
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            const response = await sendMessageToDiscord(message);
            console.log('Ответ от бота:', response); // Логируем ответ в консоль
            messageInput.value = ''; // Очистить поле ввода после отправки
        } else {
            console.log('Сообщение пустое.');
        }
    });
});













