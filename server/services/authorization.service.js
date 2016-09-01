var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var tokenFromBody = req.headers.authorization.split(' ')[1];
    var role = require(__dirname + '/token.service')(jwt, tokenFromBody).getRole()
        .then(function(response){
            if(response.user.role=='admin'){
                next();
            }else{
                res.status(401);
                res.json('You do not have admin access')
            }
        },function(error){
            res.status(401);
            res.json(error);
        })
};
