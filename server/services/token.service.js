var guid = require('node-uuid');

var secretKey = guid.v4();

var payload = {
    "iss": "spaStore",
    "expiresIn": 1400062400223
};

module.exports = function (jwt) {
    return jwt.sign(payload, secretKey);
};
