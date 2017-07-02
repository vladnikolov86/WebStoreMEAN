(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('DashboardController', function ($q, $rootScope, userInfoService, dashboardService, productService, $state, $timeout) {
      var vm = this;

      //region Caroussel

      vm.carousselInterval = 3000;
      vm.carousselActive = 1;
      vm.noWrapSlides = false;
      vm.carousselImages = [
        {
          image: 'http://www.taiwah.com.sg/images/products/thumbnail/18_20130118_10460878.jpg',
          id: 0,
          text: 'Promo text'
        }, {
          image: 'http://www.smartbuy.ru/images/anesi_brand.jpg',
          id: 1,
          text: 'Promo text'
        }
      ];

      //endregion

      userInfoService.loggedUser();

      vm.getCategories = function () {
        dashboardService
          .getCategories()
          .then(function (res) {
            
            vm.mainCategories = res;
          }, function (err) {
            console.log(err)
          })
      }
      var currentState = $state.current.name;

      if (currentState == 'main.dashboard') {
        productService
          .getAllProducts()
          .then(function (res) {
            vm.products = res;
            
          }, function (err) {})
      } else if (currentState == 'main.category') {
        productService
          .getProductForCategory($state.params)
          .then(function (res) {
            
            vm.products = res;
          }, function (err) {})
        vm.goToNextPage = function () {
          $state.go('main.category-page', {
            category: $state.params.category,
            subCategory: $state.params.subCategory,
            subSubCategory: $state.params.subSubCategory,
            page: 2
          })
        }
      } else if (currentState == 'main.category-page') {
        productService
          .getProductForCategoryAndPage($state.params)
          .then(function (res) {
            
            vm.products = res;
          }, function (err) {})
        vm.goToNextPage = function () {
          var page = $state.params.page + 1;
          $state.go('main.category-page', {
            category: $state.params.category,
            subCategory: $state.params.subCategory,
            subSubCategory: $state.params.subSubCategory,
            page: page
          })
        }
      }

    });
})();
