(function () {
  'use strict';

  angular
    .module('spaStore.users')
    .factory('registerService',
      function (CONSTANTS, $http, $q) {

        var registerService = this;
        var baseEndPoint = CONSTANTS.BASE,
          usersEndPoint = CONSTANTS.USERS_ENDPOINT;


        registerService.registerUser = function (userModel) {
          var deferred = $q.defer();

          $http.post(baseEndPoint + usersEndPoint, userModel, {
            headers: {}
          }).success(function (response) {
            deferred.resolve(response);
          }).error(function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        };


        return registerService;
      });
}());
