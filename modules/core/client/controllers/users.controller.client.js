'use strict';

angular.module('tropicalbs')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.login', {
        url: '/login',
        views: {
          'navigation-menu': {
            template: '<div>some awful stuff</div>'
          },
          'main-content': {
            templateUrl: '../../../../modules/core/client/views/core.client.login.html',
            controller: 'UsersController'
          }
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: '../../../../modules/core/client/views/core.client.signup.html',
        controller: 'UsersController'
      })
  })
  .controller('UsersController', ['$scope', 'Auth', function ($scope, Auth) {

    $scope.user = {};

    $scope.login = function () {
      Auth.login($scope.user);
    };

    $scope.signup = function () {
      Auth.signup($scope.user);
    };

  }]);
