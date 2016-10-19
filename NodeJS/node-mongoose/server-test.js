var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes-3');
var Promotions = require('./models/promotion');
var Leaderships = require('./models/leadership');


//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

//Error handling
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(){
	//we're connectd!
	console.log("Connected correctly to server");
	
	//Deleting
	db.collection('dishes').drop(function(){
		console.log('deleting dishes');
	});
	
	db.collection('promotions').drop(function(){
		console.log('deleting promotions');
	});
	
	db.collection('leaderships').drop(function(){
		console.log('deleting leaderships');
	});
	
	
	//create leadership
	
	
	
	//create promotion
	Promotions.create(
		{
			name:  'Weekend Grand Buffet1',
			image: 'images/buffet.png',
			label: 'New',
			price: 19.99,
			description: 'Featuring . . .'
		},
		function(err, promotion){
			if(err) throw err;
			
			console.log('Promotion created');
			console.log(promotion);
			
			var id = promotion._id;
			
			db.collection('promotions').drop(function(){
				db.close();
			});
		}
	);
	
	
	//create a new dish
	Dishes.create(
		{
			name: "Uthapizza1",
			image: "images/uthapizza.png",
			category: "mains",
			label: "Hot",
			price: 4.99,
			description: "A unique . . .",
			comments: [
				{
					rating: 5,
					comment: "Imagine all the eatables, living in conFusion!",
					author: "John Lemon"
				},
				{
					rating: 4,
					comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
					author: "Paul McVites"
				}
			]
		},
		function(err, dish){
			if(err) throw err;
			
			console.log('Dish created!');
			console.log(dish);
			var id = dish._id;
			
			dish.comments.push({
				rating:5,
				comment: 'Im getting a sinking feeling',
				author: 'Leonardo'
			});
					
			dish.save(function(err, dish){
				console.log('Updated Comments!');
				console.log(dish);
						
				db.collection('dishes').drop(function(){
					db.close();
				});
			});
			
		}
		
	);

});