var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Adding currency
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Schema
var promotionSchema = new Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	image:{
		type: String,
	},
	label:{
		type: String,
		default: 'default'
	}, 
	price:{
		type: Currency,
		required: true
	}, 
	description:{
		type: String,
		required: true
	}
}, {timestamps: true});

//Model
var Promotions = mongoose.model('Promotion', promotionSchema);
module.exports = Promotions;