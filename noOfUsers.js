var express = require('express') //required express module
  , app = express()
  , server = app.listen(1337); //creating a server with express using http module ref
var io = require('socket.io').listen(server);//required socket.io module which listen to http server

/* this and above is same
var express = require(“express”);
var app = express();
var socket = require(‘socket.io’);
var server = app.listen(4000);
var io = socket.listen(server); */

app.get('/',function(req,res) 
{
  res.sendfile(__dirname + '/Users.html');// send a file in current dir that is index.html
  //console.log(http.createServer(app));
});
var activeClients = 0;
 
io.sockets.on('connection', function(socket) // initialize connection from client and socket arg is used for further
{
  clientConnect(socket); //socker arg is passed to funz
  console.log(socket);
}); 
 
function clientConnect(socket){
  activeClients +=1;
  io.sockets.emit('message1', {clients:activeClients}); //will emit the msg
  
  socket.on('disconnect', function(){clientDisconnect()});
}
function clientDisconnect(){
  activeClients -=1;
  io.sockets.emit('message1', {clients:activeClients});
}

