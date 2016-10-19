var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();

	dishRouter.use(bodyParser.json());
	dishRouter.route('/')
		
.get(function(req,res,next){
   
    Dishes.find({}, function(err, dish){
        if(err) throw err;
        res.json(dish);
    });    
        
})

.post(function(req, res, next){
	
     Dishes.create(req.body, function(err, dish){
         if(err) throw err;
         
         console.log('Dish created!');
         var id = dish._id;
         res.writeHead(200, { 'Content-Type': 'text/plain' });
         
         res.end('Will add the dish: ' + req.body.name + ' with id: ' + id);  
     }); 
        
          
})

.delete(function(req, res, next){
	
    Dishes.remove({}, function(err, resp){
        if(err) throw err;
        res.json(resp);
    }); 
        
        res.end('Deleting all dishes');
        
        
});


/****** Dishes by Id ******/

dishRouter.route('/:dishId')

.get(function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err, dish){
        if(err) throw err;
        res.json(dish);
    });
    
    //res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
    
    Dishes.findByIdAndUpdate(req.params.dishId, 
        {
            $set: req.body
        }, 
        {
            new: true
        }, 
        function(err, dish){
            if(err) throw err;
            res.json(dish);
        }
    );
    
    //res.write('Updating the dish: ' + req.params.dishId + '\n');
    //res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
    
    Dishes.remove(req.params.dishId, function(err, resp){
        if(err) throw err;
        res.json(resp);
    });
    
    //res.end('Deleting dish: ' + req.params.dishId);
});


/****** Comments ******/

dishRouter.route('/:dishId/comments')

.get(function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if(err) throw err;
        res.json(dish.comments);
    });
})

.post(function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if(err) throw err;
        
        dish.comments.push(req.body);
        
        dish.save(function (err, dish){
            if(err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
        
    });
})

.delete(function (req, res, next) {
    
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});


/****** Comments by Id ******/

dishRouter.route('/:dishId/comments/:commentId')

.get(function(req, res, next){
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
        
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function( req, res, next){
    
    Dishes.findById(req.params.dishId, function(err, dish){
        dish.comments.id(req.params.commentId).remove();
        
        dish.save(function(err, resp){
            if(err) throw err;
            res.json(resp);
        });
    });
    
});
		
module.exports = dishRouter;