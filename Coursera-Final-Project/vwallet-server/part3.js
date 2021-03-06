﻿var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var accountRouter = require('./accountRouter');

var hostname = 'localhost';
var port = 3000;
var app = express();

app.use(morgan('dev'));
app.use('/account', accountRouter);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.status = 404;
    res.end("Error: Not supported");
});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});