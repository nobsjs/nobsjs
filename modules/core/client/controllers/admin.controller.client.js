'use strict';

angular.module('tropicalbs')

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('admin', {
        parent: 'nav',
        url: '/admin',
        views: {
          'nav-child-content': {
            templateUrl: '../../../../modules/core/client/views/core.client.admin.html',
            controller: 'AdminController'
          }
        }
      })
  })

  .controller('AdminController', function($scope) {
    $scope.content = 'this is some controller generated content';
  });
