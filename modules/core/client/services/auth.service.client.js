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
        res.data.user = {};
        res.data.user.email = 'user@gmail.com';
        res.data.user.admin = false;
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
        res.data.user.email = 'user@gmail.com';
        res.data.user.admin = false;
        return res.data;
      });
    };

    auth.logout = function () {
      //TODO: write logout function
    };

    return auth;

  });
