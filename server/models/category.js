module.exports = function (mongoose) {
    var Schema = mongoose.Schema;

    var Category = mongoose.model('Category', new Schema({
        name: {
            type: String,
            required: true
        },
        subCategories: {
            type: 'Mixed',
            required: false,
            unique: false
        }
    }));


    return Category;
};