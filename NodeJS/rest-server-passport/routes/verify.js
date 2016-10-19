var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {
        expiresIn:3600
    });
};


exports.verifyOrdinaryUser = function(req, res, next){
    console.log('verifyOrdinaryUser');
    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token){
        jwt.verify(token, config.secretKey, function(err,decoded){
            if (err){
                console.log('verifyOrdinaryUser: You are not authenticated ');
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            }else{
                console.log('verifyOrdinaryUser setting decoded::: ');
                req.decoded = decoded;
                console.log('req.decoded: ');
                next();
            }
        });
    }else{
        console.log('verifyOrdinaryUser: No token provided');
        var err = new Error('No token provided!');
        console.log(token);
        err.status = 403;
        return next(err);
    }
}

exports.verifyAdmin = function(req, res, next){
    console.log('verifyAdmin');
    
    var admin = req.decoded._doc.admin;
    console.log('verifyAdmin ', admin );
    
    if(!admin){
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }else{
        console.log('Admin is true');
        next();
    }
} 
