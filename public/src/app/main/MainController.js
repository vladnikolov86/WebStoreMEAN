(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('MainController', function ($q, userInfoService) {
      var vm = this;

      // vm.getUnpaidServices = function () {
      //   var deferred = $q.defer();
      //
      //   $http.get("http://localhost:3030/main1", {
      //     'Content-Type': 'application/json'
      //   }).success(function (response) {
      //     console.log(response);
      //   }).error(function (err) {
      //     console.log(err)
      //   });
      // };

      // vm.getUnpaidServices();

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

      vm.getUserInfo = function(){
        debugger;
        vm.userInfo =  userInfoService.getUserInfo();
        if(!vm.userInfo){
          vm.userInfo = {};
          vm.userInfo.username= 'Гост'
        }
      };
      vm.getUserInfo();

      vm.logout = function(){
        userInfoService.logout();
      }



    });
})();
