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
            required: true
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
        address: Object,
        invoiceDetails: Object,
        role: {
            type: String,
            required: true
        }
    }));

    //User.plugin(uniqueValidator);

    return User;
};