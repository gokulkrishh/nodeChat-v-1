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
var users = 0;
var usrnames = {};
io.sockets.on("connection",function(socket) 
{
	//console.log(socket);
	clientConnect(socket);
function clientConnect(socket)
{
	users = users + 1;
	io.sockets.emit("onlineUsers",{userOnline:users}); //sending msg to only user who connected to that socket
	socket.on("userName",function(name)
	{
		socket.username = name;
		usrnames[name] = name;
		
		//console.log("user name is",username);
		io.sockets.emit("leftUser",usrnames);
		//console.log(usrnames.nameUser);
	});
	socket.on("userMsg",function(content) //listening to user msg userMsg
	{
		io.sockets.emit("updateMsg",content,socket.username);
	});
	//console.log(usrnames.name);
}
socket.on("disconnect",function()
{
	users = users - 1;
	delete usrnames[socket.username];// deleting the username in socket
	io.sockets.emit("onlineUsers",{userOnline:users});
	io.sockets.emit("leftUser",usrnames);
	console.log("is",usrnames);
});
});