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
    })

})();
