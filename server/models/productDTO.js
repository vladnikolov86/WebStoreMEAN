var enumerations = require('../../common/enumerations.js');

module.exports = class ProductDTO {
    constructor(productObject, token) {
        this.id = productObject.id;
        this.name = productObject.name;
        this.heading = productObject.heading;
        this.description = productObject.description;
        this.category = productObject.category;
        this.subCategory = productObject.subCategory;
        this.inventoryId = productObject.inventoryId;
        this.picturePreview = productObject.picturePreview;
        this.pictureOthers = productObject.pictureOthers;
        this.reviews = productObject.reviews;
        this.updated = productObject.updated;
        this.brand = productObject.brand;
        this.quantity= productObject.quantity;
        this.inPromotion = productObject.inPromotion;
        this.addPrice(token, productObject)
    }


    addPrice(token, productObject) {
        var inPromotion = this.inPromotion;

        if (!token || !token.user) {
            this.price = productObject.priceHome;
            if (inPromotion) {
                this.promoPrice = productObject.pricePromotionalHome;
            }
            return;
        }
        else if (token.user.role == enumerations().user().admin || token.user.role == enumerations().user().corporate) {
            this.price = productObject.priceProfessional;
            if (inPromotion) {
                this.promoPrice = productObject.pricePromotionalProfessional;
            }
        } else {
            this.price = productObject.priceHome;
            if (inPromotion) {
                this.promoPrice = productObject.pricePromotionalHome;
            }
        }
    }
}