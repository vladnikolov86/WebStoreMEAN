module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    
    var User = mongoose.model('User', new Schema({
        name: String,
        password: String,
        admin: Boolean
    }));

    return User;
};