(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('DashboardController', function ($q, $rootScope, userInfoService, dashboardService,productService) {
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

      // vm.mainCategories = [
      //   {
      //     name: 'Козметика за лице',
      //     subCategories: [
      //       {
      //         name: 'Суха Кожа',
      //         subCategories: [
      //           {
      //             name: 'TestovaCategoriq1'
      //           }, {
      //             name: 'TestovaCategoriq2'
      //           }
      //         ]
      //       }, {
      //         name: 'Нормална Кожа',
      //         subCategories: []
      //       }
      //     ]
      //   }, {
      //     name: 'Козметика за тяло',
      //     subCategories: []
      //   }
      // ];

      // vm.products = [
      //   {
      //     name: 'Крем за лице Аква Витал',
      //     heading: 'Крем Аква Витал',
      //     description: 'Някакъв примерен дескрипшън, тестов. Много хубав крем.',
      //     category: 'Козметика за лице',
      //     subCategory: ['За суха кожа'],
      //     iventoryId: 5,
      //     picturePreview: 'http://anesibeaute.com/sites/default/files/styles/product_full/public/product/an' +
      //         'esi_haute_protection_creme_50ml_a_2.png?itok=FGV8xdvx',
      //     price: 40,
      //     reviews: ['Супер кремче', 'Тест ревю']
      //   }, {
      //     name: 'Крем за лице Аква Витал',
      //     heading: 'Крем Аква Витал',
      //     description: 'Някакъв примерен дескрипшън, тестов. Много хубав крем.',
      //     category: 'Козметика за лице',
      //     subCategory: ['За суха кожа'],
      //     iventoryId: 5,
      //     picturePreview: 'http://anesibeaute.com/sites/default/files/styles/product_full/public/product/an' +
      //         'esi_haute_protection_creme_50ml_a_2.png?itok=FGV8xdvx',
      //     price: 40,
      //     reviews: ['Супер кремче', 'Тест ревю']

      //   },
      //   {
      //     name: 'Крем за лице Аква Витал',
      //     heading: 'Крем Аква Витал',
      //     description: 'Някакъв примерен дескрипшън, тестов. Много хубав крем.',
      //     category: 'Козметика за лице',
      //     subCategory: ['За суха кожа'],
      //     iventoryId: 5,
      //     picturePreview: 'http://anesibeaute.com/sites/default/files/styles/product_full/public/product/an' +
      //         'esi_haute_protection_creme_50ml_a_2.png?itok=FGV8xdvx',
      //     price: 40,
      //     reviews: ['Супер кремче', 'Тест ревю']
      //   },
      //   {
      //     name: 'Крем за лице Аква Витал',
      //     heading: 'Крем Аква Витал',
      //     description: 'Някакъв примерен дескрипшън, тестов. Много хубав крем.',
      //     category: 'Козметика за лице',
      //     subCategory: ['За суха кожа'],
      //     iventoryId: 5,
      //     picturePreview: 'http://anesibeaute.com/sites/default/files/styles/product_full/public/product/an' +
      //         'esi_haute_protection_creme_50ml_a_2.png?itok=FGV8xdvx',
      //     price: 40,
      //     reviews: ['Супер кремче', 'Тест ревю']
      //   }
      // ]

        productService.getAllProducts()
        .then(function (res) {
          console.log(res)
          vm.products = res;
        }, function (err) {

        })

      console.log(vm.mainCategories)

    });
})();
