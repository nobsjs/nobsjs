'use strict';

angular.module('tropicalbs')

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('about', {
        parent: 'nav',
        url: '/about',
        views: {
          'nav-child-content': {
            templateUrl: '../../../../modules/core/client/views/core.client.about.html',
            controller: 'AboutController'
          }
        }
      })
  })

  .controller('AboutController', function($scope) {
    $scope.content = 'this is some controller generated content';
  });
