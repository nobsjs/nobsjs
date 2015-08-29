'use strict';

angular.module('tropicalbs')
  .factory('Auth', function ($http) {

    var auth = {};

    auth.login = function (user) {
      return $http({
        method: 'POST',
        url: 'api/core/users/login',
        data: user
      })
      .then(function (res) {
        return res.data.token;
      });
    };

    auth.signup = function (user) {
      return $http({
        method: 'POST',
        url: 'api/core/users/signup',
        data: user
      })
      .then(function (res) {
        return res.data.token;
      });
    };

    auth.logout = function () {
      //TODO: write logout function
    };

    return auth;

  });
