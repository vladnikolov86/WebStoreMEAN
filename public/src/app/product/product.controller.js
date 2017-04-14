(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('ProductController', function ($stateParams, productService) {
      var vm = this;

      vm.getProductById = function () {
        var id = $stateParams.id;
        productService
          .getProductsById(id)
          .then(function (res) {

            vm.product = res[0];
            console.log(vm.product)
          }, function (err) {})
      }

      // vm.product = {   name: 'Крем Аква Витал',   heading: 'Професионална емулсия
      // за почистване на грим',   description: '<div>Лека и деликатна емулсия,
      // обогатена с екстракт от бадемов протеин, нежно премахв' +   'а дори и
      // най-устойчивия грим (включително водоустойчивият грим). Включва ултра н' +
      // 'ежни почистващи агенти, като Fucogel, екстракт от Невен и
      // Bisabolol.<strong>Test</strong></div>',   category: 'За козметици',
      // subCategory: ['Лице-Хидратация'],   inventoryId: 121,   picturePreview: '',
      // picturesOthers: [],   price: 40,   quantity: '400ml' };

      if ($stateParams.id) {
        vm.getProductById();
      }
      if($stateParams.category){
      //   vm.getProductByCategory();
      }

    });
})();
