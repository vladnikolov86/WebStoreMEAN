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
    })

})();
