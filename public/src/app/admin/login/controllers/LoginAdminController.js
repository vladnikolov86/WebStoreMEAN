(function () {
  'use strict';

  angular
    .module('spaStore.admin')
    .controller('LoginAdminController', function ($log,loginService,toastr,$rootScope,commonMethods,userInfoService,$timeout,$location) {
      var vm = this;
      vm.loginUser = function () {
        loginService
          .loginUser(vm.user)
          .then(function (res) {
            toastr.success('Успешно влизане');

            var DTO = {
              username: vm.user.username,
              token: res.token
            };


            if (vm.rememberMeClicked) {
              commonMethods.setObjectInLocalStorage('userInfo', DTO);
            } else {
              commonMethods.setObjectInSessionStorage('userInfo', DTO);
            }
            
            $rootScope.userInfo = userInfoService.getUserInfo();
            $timeout(function () {
              $location.path('/admin/main');
            }, 1000)
          }, function (err) {
            if (err == 'No such user.') {
              toastr.error('Няма такъв потребител');
            }

            if (err.message == 'Authentication failed. Wrong password.') {
              toastr.error('Грешна парола');
            }

          })
      }

      $log.log('working admin');

    });
})();
