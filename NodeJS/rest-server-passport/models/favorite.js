var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},    
    dishes:[{ type: Schema.Types.ObjectId, ref: 'Dish' }]
},{timestamps: true});

//Create model
var Favorites = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorites;




/*

//create a schema
var commentSchema = new Schema({
	rating:{
		type: Number,
		min: 1,
		max: 5, 
		required: true
	},
	comment:{
		type: String,
		required: true
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, {timestamps: true});
*/