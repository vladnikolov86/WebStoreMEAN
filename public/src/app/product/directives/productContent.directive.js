(function () {
    'use strict';

    angular
        .module('spaStore')
        .directive('productContent', function ($compile) {
            return {
                restrict: 'E',
                scope: {
                    description: '='
                },
                templateUrl: '/app/product/directives/productContent.html',
                link: function (scope,el) {
                   var tpl = $compile(scope.description)(scope);
el.append(tpl); console.log(scope.compiledDescription)
                },
                controller: function ($scope) {
              
                }
            }
        })
}());
