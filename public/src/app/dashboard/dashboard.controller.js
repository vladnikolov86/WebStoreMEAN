(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('DashboardController', function ($q, $rootScope, userInfoService,dashboardService) {
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


      userInfoService.loggedUser();

      vm.getCategories = function(){
        dashboardService.getCategories()
          .then(function(res){
            vm.mainCategories = [];
            vm.mainCategories.push(res[6])
          },function(err){
            console.log(err)
          })
      }

      vm.mainCategories = [
        {
          name: 'Козметика за лице',
          subCategories: [{
            name: 'Суха Кожа',
            subCategories: [
              {name: 'TestovaCategoriq1'},
              {name: 'TestovaCategoriq2'}
            ]
          }, {
            name: 'Нормална Кожа',
            subCategories: []
          }
          ]
        },
        {
          name: 'Козметика за тяло',
          subCategories: []
        }
      ];

    });
})();
