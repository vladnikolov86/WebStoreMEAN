var mongoose = require('mongoose');

var Product = require('../models/product')(mongoose);

var authorizeAdmin = require('../services/authorization.service');

var validateProduct = require('../services/validators/productValidator');

module.exports = function (app) {
    app
        .route('/api/products')
        .get(function (req, res) {
            Product
                .find({}, function (err, products) {
                    if (err) {
                        res.status(400);
                        res.send(err + ' An error occured while retrieving products!');
                    } else {
                        res.status(200);
                        res.send(products);
                    }
                })
        });

    app
        .route('/api/products/:productsByPage/:pageNumber')
        .get(function (req, res) {
            let productsByPage = Number.parseInt(req.params.productsByPage),
                pageNumber = Number.parseInt(req.params.pageNumber);

            Product
                .find({})
                .skip(productsByPage * (pageNumber - 1))
                .limit(productsByPage)
                .exec(function (response) {
                    res.send(response)
                })

        })

    //authorize!
    app
        .route('/api/products/add')
        .post(function (req, res) {
            var productIsValid = validateProduct(req.body);
            if (typeof categoryIsValid == 'string') {
                res.status(400);
                res.json(productIsValid);
                return;
            }

            var product = new Product({
                name: req.body.Name,
                heading: req.body.Heading,
                description: req.body.Description,
                category: req.body.Category,
                subCategory: req.body.SubCategory,
                inventoryId: req.body.InventoryId,
                picturePreview: req.body.PicturePreview,
                priceProfessionals: req.body.PriceProfessionals,
                priceHome: req.body.PriceHome
            })

            product.save(function (err) {
                if (err) {
                    res.status(400);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json('Product saved successfully!');
                }
            });
        })

}