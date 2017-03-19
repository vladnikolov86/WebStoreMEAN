(function () {
    'use strict';

    angular
        .module('spaStore')
        .factory('categoriesServices', function ($q,$http,CONSTANTS) {

            var categoriesServices = this;

            categoriesServices.deleteCategory = function (id) {
                var deferred = $q.defer();

                $http
                    .put(CONSTANTS.BASE + 'category/delete/' + id, {'Content-Type': 'application/json'})
                    .success(function (response) {
                        deferred.resolve(response);
                        console.log(response);
                    })
                    .error(function (err) {
                        deferred.reject(err)
                        console.log(err)
                    });
                return deferred.promise
            };

            return categoriesServices;
        });
}());
