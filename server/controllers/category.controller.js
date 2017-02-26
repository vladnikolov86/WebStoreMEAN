var mongoose = require('mongoose');

var Category = require('../models/category')(mongoose);

var authorizeAdmin = require('../services/authorization.service');

var validateCategory = require('../services/validators/categoryValidator');

module.exports = function (app) {
    app
        .route('/api/category')
        .get(function (req, res) {
            Category
                .find({}, 'name subCategories', function (err, categories) {
                    if (err) {
                        res.status(400);
                        res.json(err)
                    } else {
                        res.json(categories);
                    }
                });
        })
        .post(authorizeAdmin, function (req, res) {
            var categoryIsValid = validateCategory(req.body);
            if (typeof categoryIsValid == 'string') {
                res.status(400);
                res.json(categoryIsValid);
                return;
            }

            var category = new Category({
                name: req.body.Name,
                subCategories: req.body.subCategories || null
            });

            category.save(function (err) {
                if (err) {
                    res.status(400);
                    res.json(err);
                } else {
                    res.status(200);
                    res.json('Category saved successfully!');
                }
            });

        });

    app
        .route('/api/category/seed')
        .post(function (req, res) {

            var categories = [
                {
                    name: 'Козметика за лице',
                    subCategories: [
                        {
                            name: 'Нормална кожа'
                        }, {
                            name: 'Суха кожа'
                        }, {
                            name: 'Младежка кожа и акне'
                        }, {
                            name: 'Бръчки и мимически линии'
                        }

                    ]
                }, {
                    name: 'За козметици',
                    subCategories: [
                        {
                            name: 'Епилация',
                            subCategories: [
                                {
                                    name: 'Нагреватели'
                                }, {
                                    name: 'Видове Кола Маска'
                                }
                            ]
                        }, {
                            name: 'Суха кожа'
                        }, {
                            name: 'Младежка кожа и акне'
                        }, {
                            name: 'Бръчки и мимически линии'
                        }
                    ]
                }
            ];

            for (let category of categories) {
                let categoryToSave = new Category({
                    name: category.name,
                    subCategories: category.subCategories || null
                })

                categoryToSave.save(function (err) {
                    if (err) {
                       
                    } else {
                       
                    }
                });
            }

            // var category = new Category({     name: 'Козметика за лице',
            // subCategories: req.body.subCategories || null }); category.save(function
            // (err) {     if (err) {         res.status(400);         res.json(err);     }
            // else {         res.status(200);         res.json('Category saved
            // successfully!');     } });
        })

};
