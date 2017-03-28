var mongoose = require('mongoose');

var Product = require('../models/product')(mongoose);

var ProductDTO = require('../models/productDTO');

var authorizeAdmin = require('../services/authorization.service');

var validateProduct = require('../services/validators/productValidator');

var tokenService = require('../services/token.service');

var tokenFromRequest = require('../services/getTokenFromRequest');

var jwt = require('jsonwebtoken');

function addProducts(products, token) {
    var allProductsDTO = [];
    var productsDTO = [];
    for (let product of products) {
        var prodDTO = new ProductDTO(product, token);
        allProductsDTO.push(prodDTO);
    }

    return allProductsDTO;
}

module.exports = function (app) {
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
                    tokenFromRequest(req)
                        .then(function (response) {
                            var productsDTO = addProducts(products, response)

                            res.send(productsDTO);
                            res.status(200);
                        }, function (err) {
                            var productsDTO = addProducts(products, err)

                            res.send(productsDTO);
                            res.status(200);
                        })

                }
            })
        });

    app
        .route('/api/products')
        .get(function (req, res) {
            Product
                .find({}, function (err, products) {
                    if (err) {
                        res.status(400);
                        res.send(err + ' An error occured while retrieving products!');
                    } else {
                        var productsToReturn = products;
                        tokenFromRequest(req).then(function (response) {
                            var productsDTO = addProducts(products, response)

                            res.send(productsDTO);
                            res.status(200);
                        }, function (err) {
                            var productsDTO = addProducts(products, err)

                            res.send(productsDTO);
                            res.status(200);
                        })
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
        .post(authorizeAdmin, function (req, res) {
            // var productIsValid = validateProduct(req.body); if (typeof productIsValid ==
            // 'string') {     res.status(400);     res.json(productIsValid);     return; }

            if (!req.files)
                return res.status(400).send('No files were uploaded.');

            var product = new Product({
                name: req.body['product[name]'],
                brand: req.body['product[brand]'],
                heading: req.body['product[heading]'],
                quantity: req.body['product[quantity]'],
                description: req.body['product[description]'],
                category: req.body['product[category]'],
                inventoryId: req.body['product[inventoryId]'],
                inPromotion: req.body['product[inPromotion]'],
                priceProfessional: req.body['product[priceProfessional]'],
                priceHome: req.body['product[priceHome]']
            })

            product.picturesOthers = [];
            product.subCategory = [];

            if (req.body['product[subCategory][0]']) {
                product.subCategory.push(req.body['product[subCategory][0]']);
            }

            if (req.body['product[subCategory][1]']) {
                product.subCategory.push(req.body['product[subCategory][1]']);
            }

            if (req.body['product[fileType]'] == 'productImagesMain') {
                let mainImage = req.files['product[mainImage]'];
                product.picturePreview = mainImage.name;
                mainImage.mv('public/src/app/assets/productImagesMain/' + mainImage.name, function (err) {
                    if (err)
                        //   return res.status(500).send(err);
                        return ''

                });
            }

            if (req.body['product[additionalImage]']) {
                let additionalImage = req.files['product[secondImage]'];
                product.picturesOthers[0] = additionalImage.name;
                additionalImage.mv('public/src/app/assets/productImagesOthers/' + additionalImage.name, function (err) {
                    if (err)
                        // return res.status(500).send(err);
                        return ''

                });
            }

            if (req.body['product[additionalImageSecond]']) {
                let additionalImageSecond = req.files['product[thirdImage]'];
                product.picturesOthers[1] = additionalImageSecond.name
                additionalImageSecond.mv('public/src/app/assets/productImagesOthers/' + additionalImageSecond.name, function (err) {
                    if (err)
                        return ''
                    // return res.status(500).send(err);;
                });
            }

            if (req.body['product[additionalImageThird]']) {
                let additionalImageThird = req.files['product[forthImage]'];
                product.picturesOthers[2] = additionalImageThird.name;
                additionalImageThird.mv('public/src/app/assets/productImagesOthers/' + additionalImageThird.name, function (err) {
                    if (err)
                        return '';
                    //      return res.status(500).send(err);

                }
                );
            }

            product
                .save(function (err) {
                    if (err) {
                        res.status(400);
                        res.json(err);
                        return;
                    } else {
                        res.status(200);
                        res.json('Product saved successfully!');
                    }
                });
        });

    app.post('/api/upload/images', function (req, res) {
        console.log(req.headers.imagetype)
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        if (req.body.fileType == 'productImagesMain') {
            let mainImage = req.files.mainImage;
            mainImage.mv('public/src/app/assets/' + req.body.fileType + '/' + req.files.mainImage.name + '.jpg', function (err) {
                if (err)
                    return res.status(500).send(err);

                res.send('File uploaded!');
            });
        }
    })

    // The name of the input field (i.e. "sampleFile") is used to retrieve the
    // uploaded file Use the mv() method to place the file somewhere on your server

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
                    heading: 'Професионален нагревател',
                    description: '<span>НАГРЕВАТЕЛ - Професионален нагревател за кола.Професионален крем за бръчки' +
                    ' описание.Професионален крем за бръчки описание.</span>',
                    category: 'Козметика за лице',
                    brand: 'Depileve',
                    subCategory: [
                        'Епилация', 'Нагреватели'
                    ],
                    inventoryId: 4,
                    picturePreview: 'pic.png',
                    picturesOthers: ['picOthers'],
                    priceProfessional: 200,
                    priceHome: 300,
                    quantity: '1бр.'
                }, {
                    name: 'Крем за бръчки',
                    heading: 'Професионален крем за бръчки',
                    description: '<span>Професионален крем за бръчки описание.Професионален крем за бръчки описани' +
                    'е.Професионален крем за бръчки описание. </span>',
                    category: 'Козметика за лице',
                    brand: 'ANESI',
                    subCategory: ['Нормална кожа'],
                    inventoryId: 5,
                    picturePreview: 'pic1.png',
                    picturesOthers: ['picOthers1'],
                    priceProfessional: 30,
                    priceHome: 40,
                    quantity: '50ml.'
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
                    picturePreview: product.picturePreview,
                    pictureOthers: product.picturesOthers,
                    priceProfessional: product.priceProfessional,
                    priceHome: product.priceHome,
                    quantity: product.quantity

                })

                proudctToSave.save(function (err) {
                    if (err) { } else { }
                });

            }

            res.status(200);
            res.send('Added');

        });
}