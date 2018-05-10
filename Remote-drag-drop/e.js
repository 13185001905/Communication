const express = require('express');
const io = require('socket.io');
var server = express();
var http = require('http').Server(server);

server.use('/',(req, res) => {
  // console.log(1);
  res.send('40040040');
});
http.listen(2131);
server.use('/',express.static('./'))

io.listen(http).on('connection', (user) => {
  console.log(1);
  user.emit('msg', 111);
})