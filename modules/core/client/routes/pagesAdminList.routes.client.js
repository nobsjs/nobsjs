'use strict';

angular.module('nobsjs')
  .config(pagesAdminListRoutes);

pagesAdminListRoutes.$inject = ['$stateProvider'];

function pagesAdminListRoutes($stateProvider) {
  $stateProvider
    .state('pagesList', {
      parent: 'nav',
      url: '/pages',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/page-admin-list.view.client.html',
          controller: 'PagesAdminListController',
          controllerAs: 'vm'
        }
      }
    });
}
