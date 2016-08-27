var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exec = require('child_process').exec;
var constants = require('../../common/constants');

module.exports = function(constants,env){
    //Start mongodb daemon
    var commandToExexute = constants.development.mongoDbCommand;
    exec(commandToExexute, function(error, stdout, stderr) {
       console.log(error);
    });


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