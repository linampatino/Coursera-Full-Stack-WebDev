var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    isIncome: {
        type: String,
        required: true
    },

    isExpense: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

//Model
var Categories = mongoose.model('Category', categorySchema);


module.exports = Categories;