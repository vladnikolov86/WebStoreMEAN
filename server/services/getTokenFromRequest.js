var jwt = require('jsonwebtoken');
var tokenService = require('../services/token.service');

module.exports = function (tokenFromBody) {
    try {
        var tokenExtracted = tokenFromBody.headers.authorization.split(' ')[1];
        var token = tokenService(jwt, tokenExtracted).getRole();
        return token;
    } catch (ex) {
        return null;
    }

    
}