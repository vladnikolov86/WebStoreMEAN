var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user')(mongoose);


module.exports = function (app) {
    app.route('/api/users')
        .get(function (req, res) {
            //Get all users TODO temporary
            var nick = new User({
                username: 'Goshu',
                password: 'parola',
                isAdmin: true
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

            var token = require('../services/token.service')(jwt).getToken;

            res.json({
                success: true,
                token: token
            });

        });

    app.route('/api/token')
        .post(function (req, res) {
            User.findOne({username: req.body.Username}, function (err, user) {
                if (err) {
                    return res.json(err);
                }
                if (!user) {
                    return res.json('No such user.');
                }

                if (user.password != req.body.Password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {
                    var token = require('../services/token.service')(jwt,{},user.isAdmin).getToken();

                    res.json({
                        success: true,
                        token: token
                    });
                }

            })


        });


    app.route('/api/auth')
        .post(function (req, res) {
            var tokenFromBody = req.headers.authorization.split(' ')[1]
console.log(tokenFromBody)
            var token = require('../services/token.service')(jwt,tokenFromBody).decodeToken();
            console.log(token);
            res.json(token);

        });
};