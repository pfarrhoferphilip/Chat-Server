/* CHANGE THIS TO YOUR SERVERS IP-ADRESS =>*/ const address = "b8f5-193-170-158-243.ngrok-free.app"; const Protocol = "wss";

if (!localStorage.getItem("username")) {
    localStorage.setItem("username", document.getElementById("username").value);
}

document.getElementById("username").value = localStorage.getItem("username");

console.log(`${Protocol}://${address}`)
const socket = new WebSocket(`${Protocol}://${address}`);
        let last_message = "";

        const form = document.getElementById("form");
        const img_form = document.getElementById("img-form");

        // Add an event listener for the form submit event
        form.addEventListener("submit", function (event) {
            // First, prevent the default form submission behavior
            event.preventDefault();
            sendMessage();
        })
        img_form.addEventListener("submit", function (event) {
            // First, prevent the default form submission behavior
            event.preventDefault();
            sendImage();
        })

        socket.onopen = function (event) {
            console.log('WebSocket is connected.');
            sendServerMessage(`${localStorage.getItem("username")} has joined the Channel.`);
        };

        function setUsername() {
            localStorage.setItem("username", document.getElementById("username").value);
        }

        function sendServerMessage(msg) {
            const chatBox = document.getElementById('chat-box');
            const message = msg
            console.log(message);
            if (message != null && message != "" && message) {
                chatBox.innerHTML += `<p style="color:yellow">${message}</p>`;
                chatBox.scrollTop = chatBox.scrollHeight;
                socket.send(`<p style="color:yellow">${message}</p>`);

            }
        }

        socket.onmessage = function (event) {
            const chatBox = document.getElementById('chat-box');
            console.log(event);
            chatBox.innerHTML += `<p>${event.data}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        };

        function sendMessage() {
            let date = new Date();
            const chatBox = document.getElementById('chat-box');
            const messageInput = document.getElementById('message-input');
            const message = messageInput.value;
            console.log(message);
            if (message != null && message != "" && message != last_message) {
                chatBox.innerHTML += `<p>Du (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}): ${message}</p>`;
                chatBox.scrollTop = chatBox.scrollHeight;
                socket.send(`${localStorage.getItem("username")} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}): ${message}`);
                last_message = message;

            }
            messageInput.value = '';
        }

        function sendImage() {
            let date = new Date();
            const chatBox = document.getElementById('chat-box');
            const imageInput = document.getElementById('image-input');
            const message = imageInput.value;
            console.log(message);
            if (message != null && message != "") {
                chatBox.innerHTML += `<p>Du (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}): <img height="200px" src="${message}"></p>`;
                chatBox.scrollTop = chatBox.scrollHeight;
                socket.send(`${document.getElementById("username").value} (${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}): <img height="200px" src="${message}">`);
                last_message = message;

            }
            imageInput.value = '';
        }