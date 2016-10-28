module.exports = function (model) {
    if (!model || model.Name.length<=3) {
        return 'Category name missing or too short.';
    }
    
    return true ;
};