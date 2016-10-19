var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema

var commentSchema = new Schema({
	rating:{
		type: number,
		min: 1,
		max: 5, 
		required: true;
	},
	comment:{
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
}, {timestamps: true});

var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description:{
		type: String,
		required: true
	},
	comments:[commentSchema]
}, {timestamps: true});

//Create model
var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;