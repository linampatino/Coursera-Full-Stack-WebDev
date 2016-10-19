var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currencySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true,
        unique: true
    }


});

//Model
var Currencies = mongoose.model('Currency', currencySchema);


module.exports = Currencies;