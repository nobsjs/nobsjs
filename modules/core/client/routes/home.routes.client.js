'use strict';

angular.module('tropicalbs')
  .config(homeConfig);

homeConfig.$inject = ['$stateProvider'];

function homeConfig ($stateProvider) {
  $stateProvider
    .state('home', {
      parent: 'nav',
      url: '/home',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/home.view.client.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        }
      }
  });
}
