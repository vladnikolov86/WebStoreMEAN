var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exec = require('child_process').exec;
var constants = require('../../common/constants');

module.exports = function (constants, env) {
    // Start mongodb daemon
    var commandToExexute = constants.development.herokuDeploy;
    exec(commandToExexute, function (error, stdout, stderr) {
        console.log(error);
    });

    //Connect to db
   // mongoose.connect(constants[env].connectionString);
   mongoose.connect('mongodb://vvn050:temppassword1@ds127321.mlab.com:27321/heroku_gj7csjsn')
    mongoose.Promise = global.Promise;
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
        throw new Error(err);
    })
};