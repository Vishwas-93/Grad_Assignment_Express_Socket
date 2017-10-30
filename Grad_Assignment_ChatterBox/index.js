var http = require('http');
var fs = require('fs');
var path = require('path');
var extractFilePath = require('./extractFilePath');
var express = require('express');
var appex = express();
var server = http.createServer(appex);
var io = require('socket.io')(server);
// var wss = require('./websockets-server.js')
// var socketiocon = require('./socketio-server.js');
var messages = [];
var clients = [];

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


console.log('WebSocket server started');
var errorHandler = function(err, res){
  // res.setHeader("Content-Type", "text/html");
  res.writeHead(404);
  res.end();
};

// Testing express
var express_starts = function (req, res, next) {
  console.log('Express started');
  appex.get(appex.use(express.static('app')), function(err, data){
    if(err){
      errorHandler(err, res);
      return;
    }
    else{
      res.end(data);
    }

  });
  next();
};



appex.use(express_starts);
server.listen(3000);
