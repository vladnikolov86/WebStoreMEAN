module.exports = function (mongoose) {
    var Schema = mongoose.Schema;

    var Product = mongoose.model('Product', new Schema({
        name: {
            type: String,
            required: true
        },
        heading: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subCategory: {
            type: String
        },
        inventoryId: {
            type: Number,
            required: true
        },
        picturePreview: {
            type: String
        },
        picturesOthers: {
            type: Array
        },
        priceProfessional: {
            type: Number
        },
        priceHome: {
            type: Number
        },
        reviews: {
            type: Array
        }
    }));

    return Product;
}