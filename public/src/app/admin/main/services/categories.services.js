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

                $http
                    .post(CONSTANTS.BASE + 'category/edit', categ, {'Content-Type': 'application/json'})
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

            // categoriesServices.uploadProduct = function (product) {
            //     // var deferred = $q.defer(); $http     .post(CONSTANTS.BASE + 'products/add',
            //     // product, {"Content-Type": 'multipart/form-data'})     .success(function
            //     // (response) {         deferred.resolve(response); console.log(response); })
            //     // .error(function (err) { deferred.reject(err)         console.log(err)    });
            //     // return deferred.promise
            //     var deferred = $q.defer();
            //     $http({
            //         method: 'POST',
            //         url: CONSTANTS.BASE + 'products/add',
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         },
            //         data: {
            //             product
            //         },
            //         transformRequest: function (data, headersGetter) {
            //             var formData = new
            //             FormData();
            //             angular.forEach(product, function (value, key) {
            //                 formData.append(key, value);
            //             });
            //             var headers = headersGetter();
            //             delete headers['Content-Type'];
            //             return formData;
            //         }
            //     })
            //         .success(function (response) {
            //             deferred.resolve(response)
            //         })
            //         .error(function (err) {
            //             deferred.reject(err)
            //         });
            //     return deferred.promise;
            // }

            return categoriesServices;
        });
}());
