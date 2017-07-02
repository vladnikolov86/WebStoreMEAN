(function () {
  'use strict';

  angular
    .module('spaStore.users')
    .controller('RegisterController', function (registerHelper, registerService, $timeout, $location, toastr) {
      var vm = this;

      vm.hasSecondInvoice = false;
      vm.errorMessage = '';
      vm.formIsInvalid = false;

      vm.registerForm = {
        username: 'Потребителско име:',
        password: 'Парола:',
        confirmPassword: 'Потвърди Парола:',
        email: 'Email адрес:',
        name: 'Име и фамилия:',
        phone: 'Телефон за контакт:',
        shippingAddress: 'Адрес за доставка:',
        invoiceDetails: 'Данни за фактура:',
        notes: 'Забележки:',
        subscribed: 'Записан за новини'
      };

      vm.userData = {};

      vm.registerInProgress = false;
      vm.registerUser = function () {
        if (!vm.registerInProgress) {
          vm.registerInProgress = true;
          var userModelIsValid = registerHelper.validateUserModel(vm.userData);

          if (typeof userModelIsValid != 'boolean') {
            vm.formIsInvalid = true;
            toastr.error(userModelIsValid);
            $timeout(function () {
              vm.formIsInvalid = false;
            }, 4000);
            vm.registerInProgress = false;
            return;
          }

          registerService.registerUser(vm.userData)
            .then(function (res) {
              vm.registerInProgress = false;
              toastr.success('Потребителят е регистриран успешно');
              $timeout(function () {
                $location.path('/dashboard');
              }, 2000);
            }, function (err) {
              vm.registerInProgress = false;
              console.log(err)
            })


        }

      }


    });
})();
