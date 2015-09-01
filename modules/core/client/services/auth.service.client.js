'use strict';

angular.module('tropicalbs')
  .factory('Auth', function ($http, $location, $window) {

    var auth = {};

    auth.login = function (user) {
      return $http({
        method: 'POST',
        url: 'api/core/users/login',
        data: user
      })
      .then(function (res) {
        res.data.user = {};
        // TODO: Unmock this
        res.data.user.email = 'user@gmail.com';
        res.data.user.roles = ['admin'];
        return res.data;
      });
    };

    auth.signup = function (user) {
      return $http({
        method: 'POST',
        url: 'api/core/users/signup',
        data: user
      })
      .then(function (res) {
        res.data.user = {};
        // TODO: Unmock this
        res.data.user.email = 'user@gmail.com';
        res.data.user.roles = ['admin'];
        return res.data;
      });
    };

    auth.logout = function () {
      $window.localStorage.removeItem('userToken');
      $location.path('/');
    };

    return auth;

  });
