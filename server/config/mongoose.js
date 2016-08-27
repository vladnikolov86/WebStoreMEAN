var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = function(constants,env){
    //Connect to db
    mongoose.connect(constants[env].connectionString);
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not connect: ' + err);
            return;
        }
        console.log('Database is running');
    });
    db.on('error', function (err) {
        console.log('Database fail: ' + err);
    })
};