'use strict';

angular.module('tropicalbs')

  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        parent: 'nav',
        url: '/admin',
        views: {
          'nav-child-content': {
            templateUrl: '../../../../modules/core/client/views/admin.view.client.html',
            controller: 'AdminController'
          }
        }
      });
  })

  .controller('AdminController', function($scope) {
    $scope.content = 'this is some controller generated content';
  });
