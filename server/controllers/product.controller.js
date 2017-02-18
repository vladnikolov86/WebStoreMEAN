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

    //Get by product ID - receives number
    app
        .route('/api/products/:inventoryId')
        .get(function (req, res) {

            let inventoryId = Number.parseInt(req.params.inventoryId);

            Product.find({
                'inventoryId': inventoryId
            }, function (err, products) {
                if (err) {
                    res.status(400);
                    res.send(err + ' An error occured while retrieving products!');
                } else {
                    if (products.length == 0) {
                        res.send('No products found, matching the criteria');
                        return;
                    }
                    res.status(200);
                    res.send(products);
                }
            })
        });

    //Paging for products
    app
        .route('/api/products/:productsByPage/:pageNumber')
        .get(function (req, res) {
            let productsByPage = Number.parseInt(req.params.productsByPage),
                pageNumber = Number.parseInt(req.params.pageNumber);

            Product
                .find({})
                .skip(productsByPage * (pageNumber - 1))
                .limit(productsByPage)
                .exec(function (err, response) {
                    if (err) {
                        res.send(err);
                        res.status(400);
                        return;
                    }

                    res.send(response)
                })

        });

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
        });

    //authorize
    app
        .route('/api/products/delete/:id')
        .put(function (req, res) {
            let dbId = req.params.id;

            Product
                .findOneAndRemove({'_id': dbId})
                .exec(function (err, doc) {
                    if (err) {
                        res.status(400);
                        res.send(err.message); 
                        return;
                    }
                    res.send(doc);
                })
        });
}