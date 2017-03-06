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
        checkForPromo(productObject);
        addPrice(token, productObject)
    }


    checkForPromo(product) {
        var inPromo = false;
        for (let prop in product) {
            if (prop == 'pricePromotionalHome' || prop == 'pricePromotionalProfessional') {
                if (product[prop] > 0) {
                    inPromo = true;
                    break;
                }
            }
        }
        this.inPromotion = inPromo;
        return inPromo;
    }

    addPrice(token, productObject) {
        var inPromotion = this.inPromotion;

        if (!token) {
            this.price = productObject.priceHome;
            if (inPromotion) {
                this.promoPrice = productObject.pricePromotionalHome;
            }
            return;
        }
        else if (token.role == 'admin' || token.role == 'corporate') {
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