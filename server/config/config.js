/**
 * Created by vvn050 on 22.08.16.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');




module.exports = function (app) {

    //Set path for all public resources
    app.use(express.static(__dirname + '/../../public/dist'));

    app.use(bodyParser.urlencoded({extended :false}));
    app.use(bodyParser.json());

    app.get('/api/about', function (req, res) {
        // var requestHost = req.get('host');
        res.send({proba: 'test'});
    });

    app.route('/about')
        .get(function (req, res) {
            res.send('Hello');
        })
        .post(function (req, res) {
            res.send('Post Hello')
        });

    //User routes
    require('../controllers/user.controller')(app);

    app.get('/api/brands', require('../controllers/admin.controller'));


    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
    });

};