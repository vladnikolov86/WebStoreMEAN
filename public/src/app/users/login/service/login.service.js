(function () {
  'use strict';

  angular
    .module('spaStore.users')
    .factory('loginService',
      function (CONSTANTS, $http, $q) {

        var loginService = this;
        var baseEndPoint = CONSTANTS.DEVELOPMENT.DEVELOPMENT_BASE,
          usersEndPoint = CONSTANTS.USERS_ENDPOINT;


        loginService.loginUser = function (userModel) {
          var deferred = $q.defer();

          $http.post(baseEndPoint + 'api/'+ 'token', userModel, {
            headers: {}
          }).success(function (response) {
            deferred.resolve(response);
          }).error(function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        };


        return loginService;
      });
}());
