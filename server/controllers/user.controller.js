var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user')(mongoose);


module.exports = function (app) {
    app.route('/api/users')
        .get(function (req, res) {
            //Get all users TODO temporary

            var nick = new User({
                name: 'Nick Cerminara',
                password: 'password',
                admin: true
            });

            nick.save(function (err) {
                if (err) throw err;

                console.log('User saved successfully');

                User.find({}, function (err, users) {
                    res.json(users);
                });
            });
        })
        .post(function (req, res) {
            //TODO VALIDATE USER

            var token = require('../services/token.service')(jwt);

            res.json({
                success: true,
                token: token
            });

        });

    app.route('/api/auth')
        .get(function (req, res) {
            //Get all users TODO temporary

            var nick = new User({
                name: 'Nick Cerminara',
                password: 'password',
                admin: true
            });

            nick.save(function (err) {
                if (err) throw err;

                console.log('User saved successfully');

                User.find({}, function (err, users) {
                    res.json(users);
                });
            });
        })
        .post(function (req, res) {
            //TODO VALIDATE USER

            var token = require('../services/token.service')(jwt);

            res.json({
                success: true,
                token: token
            });

        });
};