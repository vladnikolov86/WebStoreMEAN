(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('DashboardController', function ($q, userInfoService) {
      var vm = this;

      //region Caroussel

      vm.carousselInterval = 3000;
      vm.carousselActive = 1;
      vm.noWrapSlides = false;
      vm.carousselImages = [{
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

    });
})();
