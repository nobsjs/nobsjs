'use strict';

angular.module('nobsjs')
  .config(pagesAdminConfig);

pagesAdminConfig.$inject = ['$stateProvider'];

function pagesAdminConfig ($stateProvider) {
  $stateProvider
    .state('pagesCreate', {
      parent: 'nav',
      url: '/pages/create',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/page-admin.view.client.html',
          controller: 'PagesAdminController',
          controllerAs: 'vm'
        }
      }
    })

    .state('pagesEdit', {
      parent: 'nav',
      url: '/pages/edit/:pageId',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/page-admin.view.client.html',
          controller: 'PagesAdminController',
          controllerAs: 'vm'
        }
      }
    });
}
