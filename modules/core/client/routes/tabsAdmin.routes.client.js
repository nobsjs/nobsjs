'use strict';

angular.module('nobsjs')
  .config(tabsAdminRoutes);

tabsAdminRoutes.$inject = ['$stateProvider'];

function tabsAdminRoutes($stateProvider) {
  $stateProvider
    .state('adminTabs', {
      parent: 'nav',
      url: '/tabs',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/adminTabs.view.client.html',
          controller: 'AdminTabsController',
          controllerAs: 'vm'
        }
      }
    });
}
