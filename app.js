var express = require('express');
var io = require('socket.io');
var fs = require('fs');

var app = express();
var obj = JSON.parse(fs.readFileSync("./configPort.json"));
var host = obj.host;
var port = obj.port;

app.get('/',function(req,res) 
{
	res.sendfile(__dirname + '/index.html');// send a file in current dir that is index.html
	//console.log(__dirname+'/index.html');
});
app.listen(port,host);
console.log("Listening to "+host+":"+port);

