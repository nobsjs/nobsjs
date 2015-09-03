'use strict';

angular.module('tropicalbs')
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
  });
}
