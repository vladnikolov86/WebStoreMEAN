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
        BASE:  'http://localhost:3030/api/',
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
          controllerAs: 'main'
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

        .state('main.dashboard.product', {
          templateUrl: 'app/product/views/product.html',
          url: '/product/{id}',
          controller: 'ProductController',
          controllerAs: 'product'
        })

        .state('main.login', {
          templateUrl: 'app/users/login/views/login.html',
          url: '/login',
          controller: 'LoginController',
          controllerAs: 'login',
          resolve: {
            auth: function (userInfoService, $location,$timeout,$rootScope) {
              var user = userInfoService.getUserInfo();
              if(user){
                if(user.username && user.username != 'Гост'){
                  $location.path('/dashboard');
                  $timeout(function(){
                    $rootScope.apply();
                  },10)
                }
              }
            }
          }
        })
    })

})();
