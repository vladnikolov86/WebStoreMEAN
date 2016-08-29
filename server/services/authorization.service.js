var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var tokenFromBody = req.headers.authorization.split(' ')[1];
    var role = require(__dirname + '/token.service')(jwt, tokenFromBody).getRole()
        .then(function(response){
            console.log(response)
            if(response.role=='admin'){
                next();
            }
        },function(error){
            res.json(error);
        })
};
