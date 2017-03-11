(function () {
  'use strict';

  angular.module('spaStore').directive('productDashboard', function () {
    return {
      restrict: 'E',
      scope:{
        product:'='
      },
      templateUrl:'app/dashboard/directives/productDashboard.html',
      controller: function($scope){

      }
    }
  })
}());

