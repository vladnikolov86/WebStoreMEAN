(function () {
  'use strict';

  angular
    .module('spaStore', [
      'ui.router',
      'ui.bootstrap',
      'ui.checkbox',
      'ngAnimate',
      'toastr',
      'spaStore.admin',
      'spaStore.users'
    ])
    .constant({
      CONSTANTS: {
        USERS_ENDPOINT: 'api/users/',
        DEVELOPMENT: {
          DEVELOPMENT_BASE: 'http://localhost:3030/'
        }
      }
    })
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      // Redirect any unmatched url
      $urlRouterProvider.otherwise("/dashboard");

      $stateProvider
        .state('main', {
          templateUrl: 'app/main/views/main.html',
          controller: 'MainController',
          abstract: true,
          controllerAs: 'main',
          resolve: {
            auth: function () {
              console.log('here')
            }
          }
        })

        .state('main.dashboard', {
          templateUrl: 'app/dashboard/views/dashboard.html',
          url: '/dashboard',
          data: {
            pageTitle: 'Welcome'
          },
          controller: 'DashboardController',
          controllerAs: 'dashboard'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'app/users/login/views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        })
    })

})();
