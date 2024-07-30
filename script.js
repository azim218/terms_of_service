body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: url('path/to/your/background.jpeg') no-repeat center center;
    background-size: cover;
    color: #333;
    position: relative;
    overflow: hidden;
}

header, footer {
    background-color: #333;
    color: white;
    padding: 10px 0;
    text-align: center;
}

h1, h2 {
    text-align: center;
}

button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #555;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.5s ease;
}

.modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
    text-align: center;
    animation: fadeIn 0.5s;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.firefly {
    position: absolute;
    width: 20px;
    height: 20px;
    background: yellow;
    border-radius: 50%;
    text-align: center;
    color: black;
    line-height: 20px;
    cursor: pointer;
    animation: move 10s linear infinite, blink 1.5s linear infinite;
    box-shadow: 0 0 10px yellow;
}

@keyframes move {
    0% { transform: translate(0, 0); }
    25% { transform: translate(calc(100vw - 20px), 0); }
    50% { transform: translate(calc(100vw - 20px), calc(100vh - 20px)); }
    75% { transform: translate(0, calc(100vh - 20px)); }
    100% { transform: translate(0, 0); }
}

@keyframes blink {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}


