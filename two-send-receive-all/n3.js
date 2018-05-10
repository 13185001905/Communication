var http = require('http');
var io = require('socket.io');

var server = http.createServer((req, res) => {

});

server.listen(2183);

// var arr = [];
io.listen(server).on('connection', (user) => {
  // arr.push(user);
  user.broadcast.emit('msg', '有人上线了');
  user.on('msg',(str) => {
    user.broadcast.emit('msg', str); // broadcast 除了自己，其他都发送
    user.emit('msg', str);
  });

  user.on('disconnect', () => {
    user.broadcast.emit('msg', '有人下线了');
  })
});
