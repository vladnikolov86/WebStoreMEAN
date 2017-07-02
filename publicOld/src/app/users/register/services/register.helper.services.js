(function () {
  'use strict';

  angular
    .module('spaStore.users')
    .factory('registerHelper',
      function () {
        var registerHelper = this;

        function validateEmail(email)
        {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
        }


        registerHelper.validateUserModel = function (userModel) {
          //Check disclaimer
          if (!userModel.disclaimer) {
            return 'Тикчето с общите условия е задължително.';
          }

          //Validate Password
          if (userModel.password == null || userModel.password.length <= 4) {
            return 'Паролата трябва да е с минумум 5 символа';
          }
          if (userModel.password != userModel.confirmPassword) {
            return 'Паролите не съвпадат';
          }

          //validate username
          if (userModel.username == null || userModel.username.length <= 4) {
            return 'Потребителското име трябва да е с минумум 5 символа';
          }

          //validate name
          if (userModel.name == null || userModel.name.length <= 4) {
            return 'Полето с име е задължително';
          }

          //validate Email
          if(userModel.email==null || !validateEmail(userModel.email)){
            return 'Email полето е невалидно или празно';
          }

          return true;
        };


        return registerHelper;
      });
}());
