module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    
    var User = mongoose.model('User', new Schema({
        name: String,
        username: String,
        password: String,
        isAdmin: Boolean,
        address:Object,
        invoiceDetails:Object,
        isCorporate: Boolean
    }));

    return User;
};