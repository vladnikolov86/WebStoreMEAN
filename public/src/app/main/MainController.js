(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('MainController', function ($q, userInfoService,$rootScope,commonMethods) {
      var vm = this;

      vm.navbarLinkItems = [
        'Начало', 'За Козметици', 'Проомоции'
      ];

      //TODO Add api end point for that
      vm.allCategories = [
        {
          name: 'Козметика за лице',
          type: 'main'
        },
        {
          name: 'Суха кожа',
          type: 'sub'
        }

      ];
      vm.selectedCategory = '';

      vm.allBrands = [
        'ANESI', 'Depileve', 'Belfeet', 'Ramason'
      ];
      vm.selectedBrand = '';

      vm.logout = function(){
        $rootScope.userInfo = {};
        $rootScope.userInfo.username= 'Гост';
        userInfoService.logout();
      };

      userInfoService.loggedUser();


    });
})();
