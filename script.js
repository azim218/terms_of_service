// Пример кода на JavaScript
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
    const botToken = 'MTI2Mzc5NjA5MTIwMDIwOTAxMQ.GVUMWv.UfkDKhsWQ_FhMH7EKhDM5hpVvXcai_gc0VL_JE'; // Замените на токен вашего бота
    const channelId = '1268562969944653904'; // Замените на ID вашего канала

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

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Ошибка при выполнении запроса:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.text();
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            return null;
        }
    }

    // Функция для получения сообщений из Discord канала
    async function getMessages() {
        try {
            const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
                headers: {
                    'Authorization': `Bot ${botToken}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Ошибка при получении сообщений:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const messages = await response.json();
            const latestMessage = messages.find(msg => msg.author.id === 'YOUR_BOT_ID'); // Замените на ID вашего бота
            if (latestMessage) {
                supportResponse.textContent = `Ответ от бота: ${latestMessage.content}`;
            } else {
                supportResponse.textContent = 'Нет ответа от бота.';
            }

        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
            supportResponse.textContent = 'Ошибка при получении ответа.';
        }
    }

    // Отправка сообщения при нажатии на кнопку отправки чата
    sendButton.onclick = async function () {
        const message = messageInput.value.trim();
        if (message) {
            const response = await sendMessageToDiscord(message);
            if (response) {
                console.log('Ответ от Discord:', response);
            } else {
                console.log('Ошибка или пустой ответ');
            }
            messageInput.value = ''; // Очистить поле ввода после отправки
        } else {
            console.log('Сообщение пустое, ничего не отправляем.');
        }
    };

    // Отправка сообщения при нажатии на кнопку отправки поддержки
    supportSendButton.onclick = async function () {
        const message = supportMessageInput.value.trim();
        if (message) {
            const response = await sendMessageToDiscord(message);
            if (response) {
                console.log('Ответ от Discord:', response);
                // Запускаем получение сообщений с периодичностью
                setInterval(getMessages, 5000); // Запрос каждые 5 секунд
            } else {
                console.log('Ошибка или пустой ответ');
            }
            supportMessageInput.value = ''; // Очистить поле ввода после отправки
        } else {
            console.log('Сообщение пустое, ничего не отправляем.');
        }
    };

    // Инициализация периодического запроса сообщений для поддержки
    setInterval(getMessages, 5000); // Запрос каждые 5 секунд
});














