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
	res.sendfile(__dirname + '/index.html');
	//console.log(__dirname);
});
app.get('/images',function(req,res)
{
	res.send(__dirname + '/images');
});
io.sockets.on("connection",function(socket) 
{
	//console.log(socket);
	socket.on("userMsg",function(content) //listening to user msg userMsg
	{
		//io.sockets.emit("updateMsg","A user joined chat");
		io.sockets.emit("updateMsg",content); //sending msg to only user who connected to that socket
		//console.log(content);// it will return user emitted msg
		socket.on("disconnect",function(){clientDisconnect(content)});
	});
});
//disconnect funz. if user left the connection the below msg will come
function clientDisconnect(content) 
{
	io.sockets.emit("leftMsg",content.username + ' left chat');
}
