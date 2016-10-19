var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema
var leadershipSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	image:{
		type: String,
		required: true
	},
	designation:{
		type: String,
		required: true
	},
	abbr:{
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

//Model
var Leaderships = mongoose.model('leadership', leadershipSchema);
module.exports = Leaderships;