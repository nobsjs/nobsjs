'use strict';

angular.module('tropicalbs')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.login', {
        url: '/login',
        views: {
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
      });
  })
  .controller('UsersController', ['$scope', 'Auth', '$window', '$location', function ($scope, Auth, $window, $location) {

    $scope.user = {};

    $scope.login = function () {
      Auth.login($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('userToken', token);
          $location.path('/home');
        })
        .catch(function (error) {
          $scope.loginForm.password.$error.reject = true;
          console.log(error);

        });
    };

    $scope.signup = function () {
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('userToken', token);
          $location.path('/home');
        })
        .catch(function (error) {
          $scope.signupForm.email.$error.reject = true;
          console.log(error);
        });
    };

    $scope.logout = function () {
      $window.localStorage.removeItem('userToken');
      $location.path('/login');
    };

  }]);
