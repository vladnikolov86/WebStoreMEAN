var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user')(mongoose);

var authorizeAdmin = require('../services/authorization.service');

var validateUser = require('../services/validators/userValidator');

module.exports = function (app) {
    app.route('/api/users')
        .get(authorizeAdmin, function (req, res) {
            User.find({}, 'name username address invoiceDetails role additionalInfo isSubscribed', function (err, users) {
                res.json(users);
            });
            console.log('proba')
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
                role: 'admin'
            });
            
            user.save(function (err) {
                if (err) {
                   res.json(err.errmsg);

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
                    var userToAdd = {
                        role:user.role,
                        username: req.body.Username
                    };
                    var token = require('../services/token.service')(jwt, {}, userToAdd).getToken();

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
            var role = require('../services/token.service')(jwt, tokenFromBody).getRole()
                .then(function (response) {
                    res.json(response);
                }, function (error) {
                    res.json(error);
                })


        });
};