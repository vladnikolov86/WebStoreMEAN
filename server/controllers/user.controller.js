var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user')(mongoose);

var authorizeAdmin=require('../services/authorization.service');
//function authorizeAdmin(req, res, next) {
//    var tokenFromBody = req.headers.authorization.split(' ')[1];
//    var role = require('../services/token.service')(jwt, tokenFromBody).getRole()
//        .then(function(response){
//            console.log(response)
//            if(response.role=='admin'){
//                next();
//            }
//        },function(error){
//            res.json(error);
//        })
//}



module.exports = function (app) {
    app.route('/api/users')
        .get(function (req, res) {
            //Get all users TODO temporary
            var nick = new User({
                username: 'Goshu',
                password: 'parola',
                role: 'admin'
            });

            nick.save(function (err) {
                if (err) throw err;

                console.log('User saved successfully');

                User.find({}, function (err, users) {
                    res.json(users);
                });
            });

        })
        .post(authorizeAdmin,function (req, res) {
            res.json('hello');

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
                    var token = require('../services/token.service')(jwt, {}, user.role).getToken();

                    res.json({
                        success: true,
                        token: token
                    });
                }

            })


        });


    app.route('/api/auth')
        .post(function (req, res) {
            var tokenFromBody = req.headers.authorization.split(' ')[1];
            var token = require('../services/token.service')(jwt, tokenFromBody).decodeToken();
            res.json(token);

        });

    app.route('/api/auth1')
        .get(function (req, res) {
            var tokenFromBody = req.headers.authorization.split(' ')[1];
            var role = require('../services/token.service')(jwt, tokenFromBody).getRole()
                .then(function(response){
                    console.log(response)
                    res.json(response);
                },function(error){
                    console.log(error)
                    res.json(error);
                })


        });
};