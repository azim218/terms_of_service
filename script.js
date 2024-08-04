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
    
    // URL вашего API
    const apiUrl = 'http://localhost:5000/receive_message_from_site'; // Замените на URL вашего API

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

    // Функция для отправки сообщения на API
    async function sendMessageToApi(message) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Ошибка при выполнении запроса:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            return null;
        }
    }

    // Отправка сообщения при нажатии на кнопку отправки поддержки
    supportSendButton.onclick = async function () {
        const message = supportMessageInput.value.trim();
        if (message) {
            const response = await sendMessageToApi(message);
            if (response && response.bot_message) {
                supportResponse.textContent = `Ответ от бота: ${response.bot_message}`;
            } else {
                supportResponse.textContent = 'Ошибка или пустой ответ';
            }
            supportMessageInput.value = ''; // Очистить поле ввода после отправки
        } else {
            console.log('Сообщение пустое, ничего не отправляем.');
        }
    };

});















