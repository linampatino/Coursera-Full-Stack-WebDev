var mongoose = require('mongoose'),
	assert = require('assert');

var Dishes = require('./models/dishes-3');

//Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

//Error handling
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(){
	//we're connectd!
	console.log("Connected correctly to server");
	
	//create a new dish
	Dishes.create(
		{
			name: 'Uthapizza',
			description: 'Test',
			comments:[{
				rating:3,
				comment: 'This is insane',
				author: 'Mat Daemon'
			}]
		},
		function(err, dish){
			if(err) throw err;
			
			console.log('Dish created!');
			console.log(dish);
			var id = dish._id;
			
			setTimeout(function(){
				Dishes.findByIdAndUpdate(id,
					{
						$set: {description: 'Updated test'}
					},
					{
						new: true
					}
				).exec(function(err, dish){
					if(err) throw err;
					
					console.log('Updated dish!');
					console.log(dish);
					
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
				});
			}, 3000);
		}
		
	);

});