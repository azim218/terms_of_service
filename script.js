document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatBox = document.getElementById('chat-box');

    // URL вебхука для отправки сообщений в Discord
    const webhookUrl = 'https://discord.com/api/webhooks/1268558798696480861/0chltrwLyEZdNZuWuyVkOLTM9b-y-NW610UxG29troQNNqLns7m3Ju-tY1t_jk6v0qYz';  // Замените на свой URL вебхука

    // Функция для отправки сообщения через вебхук
    function sendMessageToDiscord(message) {
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent to Discord:', data);
            addMessageToChat(message, 'Вы');
        })
        .catch(error => {
            console.error('Error sending message to Discord:', error);
        });
    }

    // Функция для добавления сообщения в чат
    function addMessageToChat(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.textContent = `${sender}: ${message}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;  // Прокрутка вниз
    }

    // Обработка нажатия кнопки "Отправить"
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            sendMessageToDiscord(message);
            messageInput.value = '';  // Очистка поля ввода
        }
    });

    // Обработка нажатия клавиши "Enter" для отправки сообщений
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendButton.click();
        }
    });
});







