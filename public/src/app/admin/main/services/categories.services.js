(function () {
    'use strict';

    angular
        .module('spaStore')
        .factory('categoriesServices', function ($q, $http, CONSTANTS) {

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

            categoriesServices.addCategory = function (category) {
                var deferred = $q.defer();

                $http
                    .post(CONSTANTS.BASE + 'category/', category, {'Content-Type': 'application/json'})
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

            categoriesServices.replace = function (categ) {
                var deferred = $q.defer();
                var newCategory = {
                    category: categ,
                    _id: categ._id
                }

                $http
                    .post(CONSTANTS.BASE + 'category/edit', newCategory, {'Content-Type': 'application/json'})
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
