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
      'spaStore.users',
      'froala',
      'ngFileUpload'
    ])
    .constant({
      CONSTANTS: {
        BASE:  'http://localhost:3030/api/',
        USERS_ENDPOINT: 'users/',
        DEVELOPMENT: {
          DEVELOPMENT_BASE: 'http://localhost:3030/api/'
        },
        PRODUCT_ENDPOINT: 'products/'
      }
    })
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider) {
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
          url: '/product/:id',
          controller: 'ProductController',
          controllerAs: 'product'
        })

        .state('main.login', {
          templateUrl: 'app/users/login/views/login.html',
          url: '/login',
          controller: 'LoginController',
          controllerAs: 'login',
          resolve: {
            auth: function (userInfoService,$timeout,$state) {
              var user = userInfoService.getUserInfo();
              if(user){
                if(user.username && user.username != 'Гост'){
              
                  $timeout(function(){
                    $state.go('main.dashboard');
                  },10)
                }
              }
            }
          }
        })
        $httpProvider.interceptors.push('httpInteceptors');
    })

})();
