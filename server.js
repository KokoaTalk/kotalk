/* eslint-disable no-console */
const express = require('express');

const app = express();
const http = require('http').Server(app);
// socket io가  http 먹고 http.listen을 해줘야 한다.
// http는 node.js의 기본 package이므로 npm install http해주지 않아도 된다.
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.senffile('client.html');
});
// 사용자가 웹사이트 접속시 connection 이벤트
http.listen('3000', function() {
  console.log('Server on!');
});

/*
13번째 줄: 사용자 이름을 조립해 준 다음, io.to(socket.id).emit('change name', name)을 해줍니다. 이 문장을 좀 상세하게 설명할게요.
socket이 생성되면 11번째줄의 function(socket)에 의해 socket이라는 object가 생성되는데, 이 object는 접속한 사용자에 대한 object입니다. 각각의 socket object는 고유의 id를 가지며, socket.id에 저장되어 있습니다.
emit는 '(빛 따위를) 발하다'라는 뜻으로 이벤트를 서버에서 클라이언트로 전달하는 함수입니다.
'change name'은 이벤트 이름인데, 위에서 말했다시피 정해진 이벤트 이름이 아니고 제가 직접 만든 이벤트 이름입니다.
생성자 본인의 socket.id를 넣었으니 to에 의해 본인에게만 change name이라는 이벤트를 쏘는 문장입니다.
사용자가 접속하면 접속한 순서대로 user1, user2, user3등의 이름을 가지게 하기위한 코드입니다.
16번째 줄: disconnect시에 일어나는 이벤트인데, 따로 이벤트는 없고 console.log나 해줍시다.
20번째 줄: 'send message'라는 이벤트를 받았을때(on), 함께 전달받은 name과 text를 조립한후 io.emit을 해서 모든 접속자에게 'receive message'를 msg와 함께 쏩니다.
*/

// 이제 router와 server사이 연결해주자
// on은 수신자, emit은 송신자
let count = 1;
io.on('connection', function(socket) {
  console.log('user connected: ', socket.id);
  const name = `user${count++}`;

  io.to(socket.id).emit('change name', function() {});

  socket.on('disconnect', function() {
    // eslint-disable-next-line no-console
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name, text) {
    const msg = `${name} : ${text}`;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

http.listen('3000', function() {
  console.log('server on!');
});
