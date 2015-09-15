'use strict';

angular.module('nobsjs')
  .config(adminConfig);

adminConfig.$inject = ['$stateProvider'];

function adminConfig ($stateProvider) {
  $stateProvider
    .state('admin', {
      parent: 'nav',
      url: '/admin',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/admin.view.client.html',
          controller: 'AdminController',
          controllerAs: 'vm'
        }
      }
    })
    .state('users', {
      parent: 'admin',
      url: '/users',
      views: {
        'admin-content': {
          templateUrl: '../../../../modules/core/client/views/adminUsers.view.client.html',
          controller: 'AllUsersController',
          controllerAs: 'vm'
        }
      }
    });
}
