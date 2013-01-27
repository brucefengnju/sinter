var path = require('path');
var express = require('express');
var ndir = require('ndir');
var config = require('./config').config;
var app = express.createServer();

app.configure(function(){
	app.set('view engine', 'jade');
	app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res){
	res.render("index.jade", {layout:false});
});
app.listen(8080);