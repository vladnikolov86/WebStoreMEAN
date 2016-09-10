(function () {
  'use strict';

  angular
    .module('spaStore.users', ['ui.router'])
    .config(function ($stateProvider) {

      $stateProvider
        .state('main.register', {
          url: '/register',
          templateUrl: 'app/users/register/views/register.html',
          controller: 'RegisterController',
          controllerAs: 'register'
        })

        .state('main.login', {
          url: '/login',
          templateUrl: 'app/users/login/views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        })
    })
  
  

})();
