(function () {
  'use strict';

  angular
    .module('spaStore')
    .controller('LoginController', function (loginService, toastr, $timeout, $location, commonMethods, $rootScope, userInfoService) {
      var vm = this;
console.log('here')
      vm.welcomeText = 'Добре дошли в kozmetikabg.eu! Моля, въведете портребителско име и парола!';

      vm.loginUser = function () {
        loginService.loginUser(vm.user)
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
              $location.path('/dashboard');
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


    });
})();
