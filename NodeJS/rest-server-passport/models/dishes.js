var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Adding currency
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

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


var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image:{
		type: String,
		required: true,
	},
	category:{
		type: String,
		required:true
	},
	label:{
		type: String,
		default: null
	},
	price:{
		type: Currency,
		required: true
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