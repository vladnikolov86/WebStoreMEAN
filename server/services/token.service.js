var Promise = require('promise');

var secretKey = 'secretKeyGonnaChangeIt'

var payload = {
    "iss": "spaStore",
    "expiresIn": 1400062400223
};

module.exports = function (jwt, token, role) {
    return {
        getToken: function () {
            payload.role = role;
            return jwt.sign(payload, secretKey);
        },
        decodeToken: function () {
            return jwt.verify(token, secretKey);
        },
        getRole: function () {
            var promise = new Promise(function (resolve, reject) {
                jwt.verify(token, secretKey,function(err,success){
                    if(err){
                        reject(err);
                    }else{
                        resolve(success);
                    }
                });
            });

            return promise;
        }
    }
};
