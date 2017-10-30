var port = 3001;
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];
var clients = [];


server.listen(port);
console.log('WebSocket server started');

io.on('connection', function(socket){
  console.log('Client connection established');
  clients.push(socket);
  messages.forEach(function(msg){
    socket.emit('message',msg);
  });

  socket.on('message', function(data){
    console.log(data);
    messages.push(data);
    socket.broadcast.emit('message',data);
  });

});
