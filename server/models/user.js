module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    
    var User = mongoose.model('User', new Schema({
        name: String,
        username: String,
        password: String,
        address:Object,
        invoiceDetails:Object,
        role: String
    }));

    return User;
};