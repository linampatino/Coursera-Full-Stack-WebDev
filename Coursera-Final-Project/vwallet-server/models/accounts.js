
var mongoose = require('mongoose');
var Schema = mongoose.Schema

console.log('Account Schema!');

// create a schema
var accountSchema = new Schema({
    //userId: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'User',
    //    required: false
    //},
    
    name: {
        type: String,
        required: true,
        unique: true
    },

    currentBalance: {
        type: String,
        required: true
    },

    isShared: {
        type: String,
        required: false
    },

    accountType: {
        type: String,
        required: false
    }

    //shareWith: [userSchema]


}, {
    timestamps: true
});

//Model
var Accounts = mongoose.model('Account', accountSchema);


module.exports = Accounts;