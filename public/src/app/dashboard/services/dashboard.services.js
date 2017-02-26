(function () {
  'use strict';

  angular
    .module('spaStore')
    .factory('dashboardService', function ($http, $q,CONSTANTS) {
      var dashboardService = this;


      dashboardService.getCategories = function () {
        var deferred = $q.defer();

        $http.get(CONSTANTS.BASE+'category', {
          'Content-Type': 'application/json'
        }).success(function (response) {
          deferred.resolve(response);
          console.log(response);
        }).error(function (err) {
          deferred.reject(err)
          console.log(err)
        });
        return deferred.promise
      };

      return dashboardService;
    });
})();
