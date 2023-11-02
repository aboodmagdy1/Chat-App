const chatId = document.getElementById("chatId").value;
const message = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages-container");
socket.emit("joinChat", chatId);

sendBtn.onclick = () => {
  let content = message.value;
  socket.emit("sendMessage", { chat: chatId, content, sender: id },()=>{
    message.value = "";
  
  }); //this id from init.js file
};

// ... (your existing code)

socket.on('newMessage', msg => {
  displayMessage(msg);
});

socket.on('loadMessages', messages => {
  messagesContainer.innerHTML = ''; // Clear the container before appending messages
  messages.forEach(msg => {
    displayMessage(msg);
  });
});

function displayMessage(msg) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message-bubble ${msg.sender === id ? 'my-message' : 'friend-message'}`;
  messageDiv.innerText = msg.content;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ... (rest of your code)
