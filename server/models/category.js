var AutoIncrement = require('mongoose-sequence');
var mongoose = require('mongoose');

CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCategories: {
        type: 'Mixed',
        required: false,
        unique: false
    }
}, {_id: false});
CategorySchema.plugin(AutoIncrement);

module.exports = function () {

    var model = mongoose.model('Category', CategorySchema);

    return model;
};
