const socket = io('http://localhost:8000');

//Get DOM elements in respective js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('messenger_chat_sound.mp3');
//Function will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

//ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//If a new user joins, recieve the event from server
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
})

//If server send a message receive it
socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, 'left');
})

//If the form gets submitted send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';

})

