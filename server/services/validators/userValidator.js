module.exports = function (model) {
    console.log(model)
    return model.username!=undefined && model.username.length > 2 ;
};