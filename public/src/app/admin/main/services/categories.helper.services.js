(function () {
    'use strict';

    angular
        .module('spaStore')
        .factory('categoriesHelperServices', function (toastr) {

            var categoriesHelperServices = this;

            categoriesHelperServices.editMainCategory = function (currentActiveCategory, action, level, mainCollection, nameOfNewCategory, activeIndexSubCategory) {
                //level 0 - main category, level 1 - subcategory, level 2 - subSubCategory

                if (action == 'add') {
                    if (level == 1) {
                        if (mainCollection[currentActiveCategory].subCategories === null) {
                            mainCollection[currentActiveCategory].subCategories = [];
                        }

                        mainCollection[currentActiveCategory]
                            .subCategories
                            .push({ name: nameOfNewCategory });
                    }

                    if (level == 2) {
                        if (!mainCollection[currentActiveCategory].subCategories[activeIndexSubCategory].subCategories) {
                            mainCollection[currentActiveCategory].subCategories[activeIndexSubCategory].subCategories = [];
                        }
                         mainCollection[currentActiveCategory]
                            .subCategories[activeIndexSubCategory]
                            .subCategories
                            .push({ name: nameOfNewCategory });
                    }
                }

                if (action == 'delete') {
                    if (level == 1) {
                        for (var prop in mainCollection[currentActiveCategory].subCategories) {
                            if (mainCollection[currentActiveCategory].subCategories[prop].isSelected) {
                                mainCollection[currentActiveCategory].subCategories.splice(prop, 1);
                                break;
                            }
                        }
                    }
                    if (level == 2) {
                        for (var prop in mainCollection[currentActiveCategory].subCategories[activeIndexSubCategory].subCategories) {
                            if (mainCollection[currentActiveCategory].subCategories[activeIndexSubCategory].subCategories[prop].isSelected) {
                                mainCollection[currentActiveCategory].subCategories[activeIndexSubCategory].subCategories.splice(prop, 1);
                                break;
                            }
                        }
                    }
                }
                return mainCollection;
            }

            return categoriesHelperServices;
        });
}());
