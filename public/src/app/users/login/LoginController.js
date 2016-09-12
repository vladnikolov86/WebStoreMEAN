(function () {
  'use strict';

  angular
    .module('spaStore.users')
    .controller('LoginController', function (loginService,toastr,$timeout,$location,commonMethods) {
      var vm = this;

      vm.welcomeText = 'Добре дошли в kozmetikabg.eu! Моля, въведете портребителско име и парола!';

      vm.loginUser = function(){
        loginService.loginUser(vm.user)
          .then(function(res){
            toastr.success('Успешно влизане');
            var DTO = {
              username: vm.user.username,
              token:res.token
            };

            if(vm.rememberMeClicked){
              commonMethods.setObjectInLocalStorage('userInfo',DTO);
            }else{
              commonMethods.setObjectInSessionStorage('userInfo',DTO);
            }

            $timeout(function(){
              $location.path('/dashboard');
            },1000)
          },function(err){
            if(err=='No such user.'){
              toastr.error('Няма такъв потребител');
            }
          })
      }


    });
})();
