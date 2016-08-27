var mongoose= require('mongoose');
var jwt = require('jsonwebtoken');


var User = require('../models/user')(mongoose);

module.exports=function (app) {
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

                User.find({}, function(err, users) {
                    res.json(users);
                });
            });
                    })
        .post(function (req, res) {
            console.log('jwt')
            //var token = jwt.sign({exp: 14400000 }, 'spaPrivateKey' ,{ algorithm: 'RS256'});
            //
            //res.json({
            //    success: true,
            //    message: 'Enjoy your token!',
            //    token: token
            //});

            var jwt = require('jsonwebtoken');
            var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds
            var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

            res.json(token);

        });
}