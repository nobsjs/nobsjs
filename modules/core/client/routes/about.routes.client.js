'use strict';
angular.module('nobsjs')
  .config(aboutRoutes);

aboutRoutes.$inject = ['$stateProvider'];

function aboutRoutes ($stateProvider) {
  $stateProvider
    .state('about', {
      parent: 'nav',
      url: '/about',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/about.view.client.html',
          controller: 'AboutController',
          controllerAs: 'vm'
        }
      }
    });
}
