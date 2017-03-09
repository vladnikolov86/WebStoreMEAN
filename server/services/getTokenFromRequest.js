var jwt = require('jsonwebtoken');

module.exports = function (tokenFromBody) {
    try {
        var tokenFromBody = req.headers.authorization.split(' ')[1];
        var token = tokenService(jwt, tokenFromBody).decodeToken();
    } catch (ex) {
        return null;
    }

    return token;
}