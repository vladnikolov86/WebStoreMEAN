(function () {
    'use strict';

    angular
        .module('spaStore')
        .directive('productContent', function ($compile,$timeout) {
            return {
                restrict: 'E',
                scope: {
                    description: '='
                },
                templateUrl: '/app/product/directives/productContent.html',
                link: function (scope,el) {


scope.$watch('description',function(oldval, newval){
    console.log(newval)
                   var tpl = $compile(oldval)(scope);
el.append(tpl);
})

                },
                controller: function ($scope) {
             
                }
            }
        })
}());
