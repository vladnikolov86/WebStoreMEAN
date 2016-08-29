var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user')(mongoose);

var authorizeAdmin = require('../services/authorization.service');

var validateUser = require('../services/validators/userValidator');

module.exports = function (app) {
    app.route('/api/users')
        .get(authorizeAdmin, function (req, res) {


            User.find({}, 'name username address invoiceDetails role', function (err, users) {
                res.json(users);
            });

        })
        .post(function (req, res) {
            var userIsValid = validateUser(req.body);
            if (!userIsValid) {
                res.json('Username object is not valid');
            }

            var user = new User({
                username: req.body.Username,
                password: req.body.Password,
                name: req.body.Name,
                address: req.body.Address,
                invoiceDetails: req.body.InvoiceDetails,
                email:req.body.Email,
                role: 'client'
            });


            user.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json('User registered successfully!');
                }
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
                .then(function (response) {
                    console.log(response)
                    res.json(response);
                }, function (error) {
                    console.log(error)
                    res.json(error);
                })


        });
};