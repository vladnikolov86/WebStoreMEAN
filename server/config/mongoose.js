var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exec = require('child_process').exec;
var constants = require('../../common/constants');
var express = require('express');
var app = express();

module.exports = function (constants, env) {
  mongoose.connect(constants[env].connectionString, { useMongoClient: true });
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not connect: ' + err);
             throw new Error(err);
        }
        console.log('Database is running');
    });
    db.on('error', function (err) {
        console.log('Database fail: ' + err);
        throw new Error(err);
    })
};