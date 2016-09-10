var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user')(mongoose);

var authorizeAdmin = require('../services/authorization.service');
var role = require('../services/token.service');

var validateUser = require('../services/validators/userValidator');

module.exports = function (app) {
    app.route('/api/users')
        .get(authorizeAdmin, function (req, res) {
            User.find({}, 'name username address invoiceDetails role additionalInfo isSubscribed', function (err, users) {
                res.json(users);
            });
        })
        .post(function (req, res) {
            var userIsValid = validateUser(req.body);
            if (typeof userIsValid=='string') {
                res.status(400);
                res.json(userIsValid);
                return;
            }

            var user = new User({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                address: req.body.shippingAddress,
                invoiceDetails: req.body.invoiceDetails,
                secondInvoiceDetails: req.body.secondInvoiceDetails,
                email: req.body.email,
                phone: req.body.phone,
                additionalInfo: req.body.additionalInfo,
                role: 'client'
            });

            User.find({$or: [{'username': req.body.username}, {'email': req.body.email}]},
                function (err, response) {
                    //user with email or username already exists
                    if (response.length != 0) {
                        res.status(400);
                        res.json('Username or email already exists');
                    } else {
                        user.save(function (err) {
                            if (err) {
                                res.status(400);
                                res.json(err);
                            } else {
                                res.status(200);
                                res.json('User registered successfully!');
                            }
                        });
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
                    var userToAdd = {
                        role: user.role,
                        username: req.body.Username
                    };
                    var token = role(jwt, {}, userToAdd).getToken();

                    res.json({
                        success: true,
                        token: token
                    });
                }
            })
        });


    // app.route('/api/decodeToken')
    //     .post(function (req, res) {
    //         var tokenFromBody = req.headers.authorization.split(' ')[1];
    //         var token = require('../services/token.service')(jwt, tokenFromBody).decodeToken();
    //         res.json(token);
    //
    //     });

    app.route('/api/auth')
        .get(function (req, res) {
            var tokenFromBody = req.headers.authorization.split(' ')[1];
            role(jwt, tokenFromBody).getRole()
                .then(function (response) {
                    res.json(response);
                }, function (error) {
                    res.json(error);
                })


        });
};