var http = require('http');
var io = require('socket.io');

var server = http.createServer((req, res) => {

});

server.listen(2183);

var userNode = [];
var msgArr = [];
io.listen(server).on('connection', (user) => {
  user.on('name', (str) => {
    userNode.push(str);
    user.lastNames = str;
    user.broadcast.emit('user', userNode);
    user.emit('user', userNode);
    user.emit('allmsg', msgArr);
  });

  // 向客户端发送数据
  user.on('msg', (str) => {
    msgArr.push({
      userName: user.lastNames,
      msg: str,
      timer: new Date().toLocaleTimeString(),
      userNode: userNode
    });

    user.broadcast.emit('msg', {
      userName: user.lastNames,
      msg: str,
      timer: new Date().toLocaleTimeString(),
      userNode: userNode
    });
    // 给自己发
    user.emit('mymsg', {
      userName: user.lastNames,
      msg: str,
      timer: new Date().toLocaleTimeString(),
      userNode: userNode
    });
  });


  user.on('disconnect', () => {
    userNode.splice(userNode.indexOf(user.lastNames),1);
    user.broadcast.emit('userup',user.lastNames);
  });


});
