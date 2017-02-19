(function () {
  'use strict';

  angular.module('spaStore').directive('productDashboard', function () {
    return {
      restrict: 'E',
      scope:{
        imageUrl: '=',
        heading:'=',
        price:'='
      },
      templateUrl:'app/dashboard/directives/productDashboard.html',
      controller: function($scope){
console.log($scope)
      }
    }
  })
}());

