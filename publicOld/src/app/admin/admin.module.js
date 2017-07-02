(function () {
  'use strict';

  angular
    .module('spaStore.admin', ['ui.router'])
    .config(function ($stateProvider) {

      $stateProvider
        .state('admin', {
          url: '/admin/login',
          templateUrl: 'app/admin/login/views/login-admin.html',
          controller: 'LoginAdminController',
          controllerAs: 'loginAdmin'
        })

         .state('admin-main', {
          url: '/admin/main',
          templateUrl: 'app/admin/main/views/main-admin.html',
          controller: 'CategoryController',
          controllerAs: 'admin'
        })

          .state('admin-main.categories', {
          url: '/categories',
          templateUrl: 'app/admin/main/views/_categories.html',
          controller: 'CategoryController',
          controllerAs: 'admin'
        })
    })

})();
