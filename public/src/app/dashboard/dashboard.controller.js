(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('DashboardController', function ($q, $http) {
      var vm = this;
      
      //region Caroussel

      vm.carousselInterval = 3000;
      vm.carousselActive = 1;
      vm.noWrapSlides = false;
      vm.carousselImages = [{
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRzh1xfqHdNcHj6ObU68-19yx9HTMT6cXe03RsTB-Agv6eES7oT',
        id: 0,
        text: 'Promo text'
      }, {
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQP0Zz5JoaE4lYM2n8_ZrBDQ4GEWDL8UwImdBpLcvUUUoOvC8zodQ',
        id: 1,
        text: 'Promo text'
      }
      ];


      //endregion

    });
})();
