(function () {
  'use strict';

  angular
    .module('spaStore')
    .factory('httpInteceptors', function (commonMethods, $rootScope,userInfoService) {


      return {
        request: function (config) {
         
          var userInfo = userInfoService.getUserInfo();
          if (userInfo) {
            var token = userInfo.token || null;
          }
          // var token = commonMethods.getObjectFromSessionStorage('access_token');

          // if (token) {
          //   config.headers['Authorization'] = 'Bearer ' + token;
          // } else {
          //   token = commonMethods.getObjectFromLocalStorage('access_token');
          //   config.headers['Authorization'] = 'Bearer ' + token;
          // }
          config.headers['Authorization'] = 'Bearer ' + token;
          return config;
        }

      }

    });

}());
