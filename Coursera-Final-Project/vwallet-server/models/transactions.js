var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    categoryId: {
        type: String,
        required: true
    },

    accountId: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    amount: {
        type: Number,
        required: true
    },

    isForengieCurrency: {
        type: Boolean
    },

    forengieCurrency: {
        type: String
    },

    amountForengieCurrency: {
        type: Number
    }

}, {
    timestamps: true
});

//Model
var Transactions = mongoose.model('Transaction', transactionSchema);


module.exports = Transactions;