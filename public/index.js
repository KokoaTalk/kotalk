/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
import io from 'socket.io';

const socket = io();

const chatForm = document.querySelector('.chat__chat-form');
const chatUsername = document.querySelector('.chat-input__username');
const chatTextarea = document.querySelector('.chat-input__textarea');
const chatMessages = document.querySelector('.chat__messages');

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = chatUsername.value;
  const message = chatTextarea.value;
  chatTextarea.value = '';
  chatTextarea.focus();
  socket.emit('serverReceiver', username, message);
});
socket.on('receiveMessage', msg => {
  const item = document.createElement('li.chat__message');
  item.innerText = `${msg}\n`;
  chatMessages.appendChild(item);
});
socket.on('changeUsername', name => {
  chatUsername.innerText = name;
});
