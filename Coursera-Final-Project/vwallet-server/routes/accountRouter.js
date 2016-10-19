var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Accounts = require('../models/accounts');

var accountRouter = express.Router();
accountRouter.use(bodyParser.json());

accountRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Accounts.find({}, function (err, account) {
        if (err) throw err;
        res.json(account);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    console.log('Account!');
    console.log(req.body);
    Accounts.create(req.body, function (err, account) {
        if (err) throw err;
        console.log('Account created!');
        var id = account._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Account with id: ' + id);
    });
})

    /*
    router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
    */

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Accounts.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});



accountRouter.route('/:accountId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Accounts.findById(req.params.accountId, function (err, account) {
        if (err) throw err;
        res.json(account);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    Accounts.findByIdAndUpdate(req.params.accountId, {
        $set: req.body
    }, {
        new: true
    }, function (err, account) {
        if (err) throw err;
        res.json(account);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Accounts.findByIdAndRemove(req.params.accountId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});



module.exports = accountRouter;