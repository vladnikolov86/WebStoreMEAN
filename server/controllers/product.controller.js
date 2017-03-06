var mongoose = require('mongoose');

var Product = require('../models/product')(mongoose);

var ProductDTO = require('../models/productDTO');

var authorizeAdmin = require('../services/authorization.service');

var validateProduct = require('../services/validators/productValidator');

var tokenService = require('../services/token.service');

var jwt = require('jsonwebtoken');

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
                        var productsToReturn = products;
                        if (req.headers.authorization) {
                            let tokenFromBody = req.headers.authorization.split(' ')[1];

                            try {
                                var token = tokenService(jwt, tokenFromBody).decodeToken();
                            } catch (ex) {
                                if (ex) {
                                    res.send('invalid token');
                                }else{
                                    var productsDTO = [];
                                    for (let product of products){
var prodDTO = new ProductDTO()
                                    }
                                }
                            }



                            res.send(productsToReturn);
                            //manage prices
                        } else {
                            res.send('No token');
                            //manage prices
                        }


                        // res.send(productsToReturn);
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
                .sort({ updated: 'desc' })
                .skip(productsByPage * (pageNumber - 1))
                .limit(productsByPage)
                .exec(function (err, response) {
                    if (err) {
                        res.send(err);
                        res.status(400);
                        return;
                    }
                    if (req.headers.authorization) {
                        var tokenFromBody = req
                            .headers
                            .authorization
                            .split(' ')[1];

                        var role = roleService(jwt, tokenFromBody)
                            .getRole()
                            .then(function (role) {
                                if (role.user.role == 'admin') {
                                    response.priceHome = '';
                                    response.price = response.priceProfessional;
                                }
                            }, function () { })
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

    app
        .route('/api/products/edit/:id')
        .post(function (req, res) {
            var productIsValid = validateProduct(req.body);
            if (typeof categoryIsValid == 'string') {
                res.status(400);
                res.json(productIsValid);
                return;
            }
            let dbId = req.params.id;

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
                .findOneAndRemove({ '_id': dbId })
                .exec(function (err, doc) {
                    if (err) {
                        res.status(400);
                        res.send(err.message);
                        return;
                    }
                    res.send(doc);
                })
        });

    app
        .route('/api/products/seed')
        .post(function (req, res) {

            var products = [
                {
                    name: 'Нагреввател',
                    heading: 'Професионален крем за бръчки',
                    description: 'НАГРЕВАТЕЛ - Професионален крем за бръчки описание.Професионален крем за бръчки описание.Професионален крем за бръчки описание. ',
                    category: 'Козметика за лице',
                    brand: 'Depileve',
                    subCategory: ['Епилация','Нагреватели'],
                    inventoryId: 4,
                    picturePreview: 'pic.png',
                    picturesOthers: ['picOthers'],
                    priceProfessional: 200,
                    priceHome: 300   
                },  {
                    name: 'Крем за бръчки',
                    heading: 'Професионален крем за бръчки',
                    description: 'Професионален крем за бръчки описание.Професионален крем за бръчки описание.Професионален крем за бръчки описание. ',
                    category: 'Козметика за лице',
                    brand: 'ANESI',
                    subCategory: ['Нормална кожа'],
                    inventoryId: 5,
                    picturePreview: 'pic1.png',
                    picturesOthers: ['picOthers1'],
                    priceProfessional: 30,
                    priceHome: 40   
                }
            ];

             for (let product of products) {
                let proudctToSave = new Product({
                    name: product.name,
                    heading: product.heading,
                    description: product.description,
                    category: product.category,
                    brand: product.brand,
                    subCategory: product.subCategory,
                    inventoryId: product.inventoryId,
                    picturePreview : product.picturePreview,
                    pictureOthers: product.picturesOthers,
                    priceProfessional: product.priceProfessional,
                    priceHome: product.priceHome

                
                })

                

                proudctToSave.save(function (err) {
                    if (err) {
                       
                    } else {
                       
                    }
                });

                res.status(200);
                res.send('Added');
            }



        });
}