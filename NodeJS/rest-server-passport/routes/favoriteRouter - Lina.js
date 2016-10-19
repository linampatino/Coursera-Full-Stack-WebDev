var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

var Favorites = require('../models/favorite');

var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());
favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
   
    var idUser = req.decoded._doc._id;
    Favorites.find({ postedBy: idUser })
        .populate('postedBy')
        .populate('dishes')
        .exec( function(err, dish){
        if(err) throw err;
        res.json(dish);
    });
})


.post(Verify.verifyOrdinaryUser,  function(req, res, next){
    if (!Array.isArray(req.body)){
        
        var idUser = req.decoded._doc._id;
        
        Favorites.findOne({ postedBy: idUser }, function(err, fav){

            console.log('favorite:' + fav);
            console.log('Req body:',req.body);

            if(fav=== null){

                fav = new Favorites({
                    postedBy: idUser,
                    dishes: req.body
                });

            }else{
                
                console.log('ante sfor:');
                for(var i=0; i < fav.dishes.length; i++){
                    
                    console.log('for:' + fav.dishes[i]);
                    console.log('for req:', req.body);
                    console.log('req.body._id', req.body._id);
                    
                    if (fav.dishes[i] == req.body._id){
                        res.end('The dish already exists!!');
                        return;
                    }
                }
                
                fav.dishes.push(req.body);
            }
                console.log('saving:' );
                fav.save(function(err, fav){
                    if(err) throw err;

                    console.log('favorite:', fav);
                    res.json(fav);
                });
        }); 
                
    }else{
        console.log('Array:');
        res.end('you can not send an array of disheses');
        return;
    }
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    var idUser = req.decoded._doc._id;
    Favorites.remove({ postedBy: idUser }, function(err, resp){
        if(err)  throw err;
        res.json(resp);
    });    
});


/****** Favorite by dishId ******/

favoriteRouter.route('/:dishId')

.delete(Verify.verifyOrdinaryUser,function(req, res, next){
    
    var idUser = req.decoded._doc._id;
        
        Favorites.findOne({ postedBy: idUser }, function(err, fav){
            console.log('dishes:', fav.dishes );
            
            var index = fav.dishes.indexOf(req.params.dishId);
            console.log('index: remove' +index );
            
            if (index!=-1){
            
                fav.dishes.splice(index, 1);
                console.log('saving: remove' );

                fav.save(function(err, fav){
                    if(err) throw err;
                        console.log('favorite:', fav);
                        res.json(fav);
                    });
            }else{
                res.end('The dish does not exist!!');
                return;
            }
        });
});


module.exports = favoriteRouter;