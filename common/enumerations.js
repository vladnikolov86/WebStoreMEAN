var userTypes = {
    admin: 'admin',
    corporate: 'corporate',
    client: 'client'
}


module.exports = function () {
    return {
        user: function () {
            return userTypes;
        }
    }


}