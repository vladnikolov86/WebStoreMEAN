var jwt = require('jsonwebtoken');
var roleService = require(__dirname + '/token.service');

module.exports = function (req, res, next) {
    if(!req.headers.authorization){
        res.status(401);
        res.json('You do not have admin access')
        return;
    }
    var tokenFromBody = req.headers.authorization.split(' ')[1];
    var role = roleService(jwt, tokenFromBody).getRole()
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
