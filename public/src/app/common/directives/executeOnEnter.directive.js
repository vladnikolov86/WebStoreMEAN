(function () {
  'use strict';

  angular.module('spaStore').directive('executeOnEnter', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        $('body').on('keypress', function (evt) {
          if (evt.keyCode === 13) {
            el.trigger('click', function () {
            });
          }
        })
      }
    }
  })
}());

