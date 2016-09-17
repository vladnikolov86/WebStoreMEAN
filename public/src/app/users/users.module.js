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
          controllerAs: 'register',
          resolve:{
            auth: function($location,userInfoService){
              var user = userInfoService.getUserInfo();
              if(user){
                $location.path('/dashboard');
              }
            }
          }
        });

        // .state('login', {
        //   url: '/login',
        //   templateUrl: 'app/users/login/views/login.html',
        //   controller: 'LoginController',
        //   controllerAs: 'login'
        // })
    })



})();
