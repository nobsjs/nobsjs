'use strict';

angular.module('tropicalbs')

  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        parent: 'nav',
        url: '/blog',
        views: {
          'nav-child-content': {
            templateUrl: '../../../../modules/blog/client/views/blog.view.client.html',
            controller: 'BlogController'
          }
        }
      });
  })

  .controller('BlogController', function($scope) {
    $scope.content = 'this is some controller generated content';
  });
