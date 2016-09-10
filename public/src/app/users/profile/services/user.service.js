(function () {
  'use strict';

  angular
    .module('spaStore')
    .factory('userInfoService', function (commonMethods,$location) {
      var userInfoService = this,
        userInfo;

      userInfoService.userInfo = {
        clientIsAuthenticated: false,
        clientUsername: ''
      };

      function setSessionStoreageInUse() {
        var userInfoData = commonMethods.getObjectFromLocalStorage('userInfo');

        if (userInfoData != null) {
          userInfoService.storageInUse = 'localStorage';
        } else {
          userInfoService.storageInUse = 'sessionStorage';
        }
      }
      setSessionStoreageInUse();

      userInfoService.setUserInfo = function (userInfo) {
        if (userInfoService.storageInUse == 'localStorage') {
          commonMethods.setObjectInLocalStorage('userInfo', userInfo);
        } else {
          commonMethods.setObjectInSessionStorage('userInfo', userInfo);
        }
      };

      userInfoService.getUserInfo = function () {
        var userInfo = commonMethods.getObjectFromLocalStorage('userInfo');

        if (userInfo == null) {
          userInfo = commonMethods.getObjectFromSessionStorage('userInfo');
        }

        return userInfo;
      };

      authData.checkTokenExpiration = function () {
        var currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + 10);
        currentDate = Date.parse(currentDate);

        var tokenDate = Date.parse($window.localStorage.expires);

        if (isNaN(tokenDate)) {
          return false;
        }

        return currentDate > tokenDate;
      };

      userInfoService.logout = function () {
        $window.localStorage.clear();
        $window.sessionStorage.clear();
        userInfoService.userInfo = {
          clientIsAuthenticated: false,
          clientUsername: '',
          storageInUse: ''
        };
        $location.path('/login');
      };

      return this;
    });

}());
