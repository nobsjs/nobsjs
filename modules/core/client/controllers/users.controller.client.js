'use strict';

angular.module('tropicalbs')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '../../../../modules/core/client/views/core.client.login.html',
        controller: 'UsersController'
      })
  })
  .controller('UsersController', function ($scope, Auth) {

    $scope.user = {};

    $scope.login = function () {
      // Auth.login($scope.user);
    };

    $scope.signup = function () {

    };

  });
