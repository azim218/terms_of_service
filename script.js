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
    var supportSendButton = document.getElementById('supportSendButton');
    var supportMessageInput = document.getElementById('supportMessageInput');
    var supportResponseContainer = document.getElementById('supportResponseContainer');

    const webhookUrl = 'https://discord.com/api/webhooks/1268558798696480861/0chltrwLyEZdNZuWuyVkOLTM9b-y-NW610UxG29troQNNqLns7m3Ju-tY1t_jk6v0qYz';  // Замените на актуальный URL вебхука

    function closeModals() {
        modals.forEach(modal => modal.style.display = "none");
        mainContent.classList.remove('blur');
        footer.classList.remove('blur');
    }

    spans.forEach(span => {
        span.onclick = closeModals;
    });

    backButtons.forEach(button => {
        button.onclick = closeModals;
    });

    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            closeModals();
        }
    }

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
                console.error('Error sending message:', errorText);
                supportResponseContainer.innerHTML = `<p>Error sending message: ${errorText}</p>`;
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            supportResponseContainer.innerHTML = `<p>Message sent successfully!</p><p>${result.content}</p>`;
        } catch (error) {
            console.error('Error sending message:', error);
            supportResponseContainer.innerHTML = `<p>Error sending message: ${error.message}</p>`;
        }
    }

    sendButton.onclick = function () {
        const message = messageInput.value.trim();
        if (message) {
            sendMessageToDiscord(message);
        } else {
            console.log('Message is empty');
        }
    };

    supportSendButton.onclick = function () {
        const message = supportMessageInput.value.trim();
        if (message) {
            sendMessageToDiscord(message);
        } else {
            console.log('Message is empty');
        }
    };
});










