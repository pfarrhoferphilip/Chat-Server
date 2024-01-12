/* CHANGE THIS TO YOUR SERVERS IP-ADRESS =>*/ const address = "localhost"; const Port = "8080";

if (!localStorage.getItem("username")) {
    localStorage.setItem("username", document.getElementById("username").value);
}

const socket = new WebSocket(`ws://${address}:${Port}`);
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
            const chatBox = document.getElementById('chat-box');
            const messageInput = document.getElementById('message-input');
            const message = messageInput.value;
            console.log(message);
            if (message != null && message != "" && message != last_message) {
                chatBox.innerHTML += `<p>Du: ${message}</p>`;
                chatBox.scrollTop = chatBox.scrollHeight;
                socket.send(`${localStorage.getItem("username")}: ${message}`);
                last_message = message;

            }
            messageInput.value = '';
        }

        function sendImage() {
            const chatBox = document.getElementById('chat-box');
            const imageInput = document.getElementById('image-input');
            const message = imageInput.value;
            console.log(message);
            if (message != null && message != "") {
                chatBox.innerHTML += `<p>Du: <img height="200px" src="${message}"></p>`;
                chatBox.scrollTop = chatBox.scrollHeight;
                socket.send(`${document.getElementById("username").value}: <img height="200px" src="${message}">`);
                last_message = message;

            }
            imageInput.value = '';
        }