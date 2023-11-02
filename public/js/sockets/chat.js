const chatId = document.getElementById("chatId").value;
const message = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const messagesContainer = document.getElementById("messages-container");
socket.emit("joinChat", chatId);

sendBtn.onclick = () => {
  let content = message.value;
  socket.emit("sendMessage", { chat: chatId, content, sender: id }, () => {
    message.value = "";
  }); //this id from init.js file
};

socket.on("newMessage", (msg) => {
  displayMessage(msg,msg.sender);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on("loadMessages", (messages) => {
  messagesContainer.innerHTML = ""; // Clear the container before appending messages
  messages.forEach((msg) => {
    displayMessage(msg, msg.sender);
  });

  // Scroll to the bottom to show existing messages
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
//create unique color for each
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  const hexColor = "#" + "00000".substring(0, 6 - c.length) + c;

  // Convert hex to RGB and lighten the color (adjust the brightness as needed)
  const rgb = parseInt(hexColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const brightness = 30; // Adjust brightness (0 to 100, 50 is default)

  const lighten = (color, percent) => Math.floor(color + (percent * (255 - color)) / 100);
  const lightenedColor =
    "#" +
    ((1 << 24) + (lighten(r, brightness) << 16) + (lighten(g, brightness) << 8) + lighten(b, brightness))
      .toString(16)
      .slice(1);

  return lightenedColor;
}


function displayMessage(msg, sender) {
  const messageDiv = document.createElement("div");
  const messageContent = document.createElement("span");

  // Assign a CSS class based on the sender's ID
  const messageClass = sender === id ? "my-message" : "friend-message";
  messageDiv.className = `message-bubble ${messageClass}`;

  // Generate lightened color based on sender's ID
  const messageColor = stringToColor(sender);
  messageDiv.style.backgroundColor = messageColor;

  messageContent.innerText = msg.content;
  messageDiv.appendChild(messageContent);

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
