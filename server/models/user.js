var uniqueValidator = require('mongoose-unique-validator');

module.exports = function (mongoose) {
    var Schema = mongoose.Schema;

    var User = mongoose.model('User', new Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String
        },
        address: {
            type:String
        },
        invoiceDetails: {
            type:String
        },
        secondInvoiceDetails: {
            type:String
        },
        role: {
            type: String,
            required: true
        },
        isSubscribed: {
            type: String,
            required: false
        },
        additionalInfo: {
            type: String,
            required: false
        }
    }));

    //User.plugin(uniqueValidator);

    return User;
};