var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,

    admin: {
        type: Boolean,
        default: false
    },

    name: {
        type: String,
        default: ''
        //required: true
    },

    lastname: {
        type: String,
        default: ''
        //required: true
    },

    email: {
        type: String,
        default: '',
        //required: true,
        unique: true
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);