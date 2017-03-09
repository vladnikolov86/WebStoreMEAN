(function () {
  'use strict';

  angular
    .module('spaStore.users')
    .factory('productService',
      function (CONSTANTS, $http, $q) {

        var productService = this;
        var baseEndPoint = CONSTANTS.BASE,
          productEndPoint = CONSTANTS.PRODUCT_ENDPOINT;


        productService.getAllProducts = function () {
        
          var deferred = $q.defer();

          $http.get(baseEndPoint +productEndPoint,  {
            headers: {}
          }).success(function (response) {
            deferred.resolve(response);
          }).error(function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        };


        return productService;
      });
}());
