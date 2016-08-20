(function () {
  'use strict';

  angular
    .module('spaStore', [
      'ui.router',
      'ui.bootstrap',
      'spaStore.admin',
      'ui.checkbox'
    ])
    .constant({
      CONSTANTS: {}
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
          abstract: true,
          controller: 'MainController',
          controllerAs: 'main',
          resolve: {
            auth: function () {
              console.log('hi')
            }
          }
        });

      $stateProvider
        .state('main.dashboard', {
          templateUrl: 'app/dashboard/views/dashboard.html',
          url: '/dashboard',
          data: {
            pageTitle: 'Welcome'
          },
          controller: 'DashboardController',
          controllerAs: 'dashboard'
        });
    })

})();
