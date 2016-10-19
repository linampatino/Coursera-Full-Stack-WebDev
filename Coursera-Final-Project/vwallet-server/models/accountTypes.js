var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountTypeSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }

});

//Model
var AccountTypes = mongoose.model('AccountType', accountTypeSchema);


module.exports = AccountTypes;