var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishModule = dishRouter(express, bodyParser);
app.use('/dishes', dishModule);

var promoModule = promoRouter(express, bodyParser);
app.use('/promotions', promoModule);

var leaderModule = leaderRouter(express, bodyParser);
app.use('/leadership', leaderModule);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
