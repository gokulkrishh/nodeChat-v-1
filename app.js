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


