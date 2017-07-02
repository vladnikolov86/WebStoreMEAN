(function () {
  'use strict';

  angular
    .module('spaStore')
    .factory('commonMethods', function ($window) {
      var commonMethods = this;

      commonMethods.getObjectFromLocalStorage = function (objectKey) {
        var model = $window.localStorage.getItem(objectKey);
        if (model != null) {
          return JSON.parse(model);
        } else {
          return null;
        }
      };

      commonMethods.setObjectInLocalStorage = function (objectKey, object) {
        object.LastSaveTime = new Date();
        $window.localStorage.setItem(objectKey, JSON.stringify(object));
      };


      commonMethods.getObjectFromSessionStorage = function (objectKey) {
        var model = $window.sessionStorage.getItem(objectKey);
        if (model != null) {
          return JSON.parse(model);
        } else {
          return null;
        }
      };

      commonMethods.setObjectInSessionStorage = function (objectKey, object) {
        $window.sessionStorage.setItem(objectKey, JSON.stringify(object));
      };

      return this;
    });

} ());
