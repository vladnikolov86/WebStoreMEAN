(function () {
    'use strict';

    angular
        .module('spaStore')
        .controller('MainAdminController', function (dashboardService, categoriesServices, toastr,$window) {
            var vm = this;

            //region categories

            vm.getCategories = function () {
                dashboardService
                    .getCategories()
                    .then(function (res) {
                        vm.mainCategories = res;
                    }, function (err) {
                        console.log(err)
                    })
            }

            vm.getCategories();

            vm.getSubCategories = function (category) {
                vm.subSubCategories = [];
                if (category.subCategories) {
                    vm.subCategories = category.subCategories;
                } else {
                    vm.subCategories = [];
                }

            }

            vm.getSubSubCategories = function (category) {
                if (category.subCategories) {
                    vm.subSubCategories = category.subCategories;
                } else {
                    vm.subSubCategories = [];
                }

            }

            vm.deselectCategories = function (category, collection, compareBy) {
                for (var categ in collection) {
                    if (category[compareBy] == collection[categ][compareBy]) {
                        continue;
                    }
                    collection[categ].isSelected = false;
                }

                //End process of deletion
                vm.confirmDelete = false;
            }

            vm.deleteMainCategory = function () {
                vm.confirmDelete = !vm.confirmDelete;
                for (var categ in vm.mainCategories) {
                    if (vm.mainCategories[categ].isSelected) {
                        vm.indexOfCategoryToDelete = categ;
                    }
                }
            }

            vm.confirmDeleteMainCategory = function () {
                categoriesServices
                    .deleteCategory(vm.mainCategories[vm.indexOfCategoryToDelete]._id)
                    .then(function (res) {
                        console.log('deleted');
                        toastr.success('Category deleted!');

                        $window.location.reload();
                    }, function (err) {
                        toastr.error('An error occured!Try again later!');
                        console.log(err)
                    })

            }

            //endregion

        });
})();
