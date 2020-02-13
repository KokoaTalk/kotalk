/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
const socket = io();
const chatForm = document.querySelector(".chat__chat-form");
const chatTextarea = document.querySelector(".chat-input__textarea");
const chatMessages = document.querySelector(".chat__messages");

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = e.currentTarget.querySelector(".chat-input__username").value;
  const message = chatTextarea.value;
  chatTextarea.value = "";
  chatTextarea.focus();
  socket.emit("serverReceiver", username, message);
});
socket.on("receiveMessage", msg => {
  const item = document.createElement("li.chat__message");
  item.innerText = `${msg}\n`;
  chatMessages.appendChild(item);
});
socket.on("changeUsername", name => {
  const chatUsername = document.querySelector(".chat-input__username");
  if (chatUsername.value === "") {
    chatUsername.value = name;
  }
});
