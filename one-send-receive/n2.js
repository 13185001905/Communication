var http = require('http');
var io = require('socket.io');

var server = http.createServer((req, res) => {

});

server.listen(2183);
io.listen(server).on('connection', (user) => {
  user.on('bbb', (str) => {
    console.log(str);
  })
});
