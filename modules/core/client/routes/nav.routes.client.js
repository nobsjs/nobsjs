'use strict';

angular.module('tropicalbs')
  .config(navRoutes);

navRoutes.$inject = ['$stateProvider'];

function navRoutes($stateProvider){
  $stateProvider
    .state('nav', {
      parent: 'app',
      abstract: true,
      views: {
        'navigation-menu': {
          templateUrl: '../../../../modules/core/client/views/navigation.view.client.html',
          controller: 'NavigationController',
          controllerAs: 'vm'
        },
        'admin-sidenav': {
          templateUrl: '../../../../modules/core/client/views/adminSidenav.view.client.html',
          controller: 'NavigationController',
          controllerAs: 'vm'
        },
        'main-content': {
          template: '<div ui-view name="nav-child-content"></div>'
        }
      }
    });
}
