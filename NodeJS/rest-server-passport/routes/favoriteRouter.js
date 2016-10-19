module.exports = function(){
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorite');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function (req, res, next) {
    Favorites.find({})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(function (req, res, next) {
    Favorites.find({}, function (err, favorite) {
        if(favorite.length==0) {
            Favorites.create(new Favorites({}), function(err, favorite) {
                if (err) {
                    return res.status(500).json({err: err});
                }
                if(req.decoded._doc._id) {
                     favorite.postedBy = req.decoded._doc._id;
                }
                if(req.body._id) {
                    favorite.dishes.push(req.body);
                    console.log("adding dish to favorites");
                }
                favorite.save(function (err, resp) {
                    if (err) throw err;
                    console.log('Added to favorites!');
                    });
                 res.json(favorite);
            });
        }

        else{
            Favorites.findOne({}, function (err, favorite) {
                if(req.decoded._doc._id) {
                favorite.postedBy = req.decoded._doc._id;
                } 
                if(req.body._id) {
                favorite.dishes.push(req.body);
                }
                favorite.save(function (err, resp) {
                    if (err) throw err;
                    console.log('created new favorite!');
                    
                });
                res.json(favorite);
            });
        }
    });
})

.delete(function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:_id')
 .all(Verify.verifyOrdinaryUser)


.delete(function (req, res, next) {
    Favorites.findOne({}, function (err, favorite) {  
        console.log(favorite.dishes);
        if(req.params._id) {
                favorite.dishes.remove(req.params._id);
        res.json(favorite);
        console.log('in delete - favorites delete');
        }
        favorite.save(function (err, resp) {
                    if (err) throw err;
                    console.log('deleted favorite');
                    
                });
            if (err) throw err;
            
    });
});


  return favoriteRouter;
}();