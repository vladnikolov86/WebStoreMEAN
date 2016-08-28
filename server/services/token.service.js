var guid = require('node-uuid');
var Promise = require('promise');

var secretKey = 'constant';

var payload = {
    "iss": "spaStore",
    "expiresIn": 1400062400223
};

module.exports = function (jwt, token, role) {
    return {
        getToken: function () {
            console.log('hereeeeeeee')
            payload.isAdmin = role;
            return jwt.sign(payload, secretKey);
        },
        decodeToken: function () {
            return jwt.verify(token, secretKey)
        }
    }

};
