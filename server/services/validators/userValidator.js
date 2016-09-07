function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}



module.exports = function (model) {
    if (!model.disclaimer) {
        return 'Disclaimer is not accepted';
    }

    //Validate Password
    if (model.password == null || model.password.length <= 4) {
        return 'Password is too short or missing';
    }

    //validate username
    if (model.username == null || model.username.length <= 4) {
        return 'Username is too short or missing';
    }

    //validate Email
    if(model.email==null || !validateEmail(model.email)){
        return 'Email is blank or invalid';
    }

    return true ;
};