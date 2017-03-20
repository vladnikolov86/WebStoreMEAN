module.exports = function (model) {
    if (!model || model.name.length<=3) {
        return 'Category name missing or too short.';
    }
    
    return true ;
};