var bodyParser = require('body-parser');
var express = require('express');

var mongoose = require('mongoose');
var Promotions = require('../models/promotion');
var Verify = require('./verify');

var promoRouter = express.Router();

	promoRouter.use(bodyParser.json());
	promoRouter.route('/')
		

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    
    Promotions.find({}, function(err, promo){
        if (err) throw err;
        res.json(promo);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
			
    Promotions.create(req.body, function(err, promo){
        if(err) throw err;
        
        console.log('Promotion created!');
        var id = promo._id;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
    });      
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
    
    Promotions.remove({}, function(err, resp){
        if(err)  throw err;
        res.json(resp);
    });    
});


promoRouter.route('/:promotionId')

.get(Verify.verifyOrdinaryUser,function(req,res,next){

    Promotions.findById(req.params.promotionId, function(err, promo){
        if(err) throw err;
        res.json(promo);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
				
    Promotions.findByIdAndUpdate(req.params.promotionId, 
        {
            $set: req.body
        },
        {
            new: true
        }, 
        function(err, promo){
            if(err) throw err;
            res.json(promo);
        }
    );
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next){
    
    Promotions.remove(req.params.promotionId, function(err, resp){
        if(err) throw err;
        res.json(resp);
    });
});
		
		
module.exports = promoRouter;