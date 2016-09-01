var Promise = require('promise');

var secretKey = 'secretKeyGonnaChangeIt'

var payload = {
    iss: "spaStore"
};

var tokenExpiration = "7d";

module.exports = function (jwt, token, user) {
    return {
        getToken: function () {
            payload.user = user;
            return jwt.sign(payload, secretKey, {expiresIn: tokenExpiration});
        },
        decodeToken: function () {
            return jwt.verify(token, secretKey);
        },
        getRole: function () {
            return new Promise(function (resolve, reject) {
                jwt.verify(token, secretKey, function (err, success) {
                    if (err) {
                       //TODO Redirect user to get new token
                        console.log('Expired')
                        reject(err);
                    } else {
                        resolve(success);
                    }
                });
            });
        }
    }
};
