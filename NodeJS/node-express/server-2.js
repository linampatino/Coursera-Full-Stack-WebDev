var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

//indicate the public folder contains all the files 
app.use(express.static(__dirname + '/public')); 

app.listen(port, hostname, function(){
	//this is executed when server stars to run
	console.log(`Server running at http://${hostname}:{port}/`);
});
