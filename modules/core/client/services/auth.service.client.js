'use strict';

angular.module('tropicalbs')
  .factory('Auth', function ($http, $location, $window, $cookies, User) {

    var auth = {};

    auth.login = function (user) {
      return $http({
        method: 'POST',
        url: 'api/core/users/login',
        data: user
      })
      .then(function (res) {
        $cookies.put('userToken', res.data.token, {secure: true});
        User.currentUser = res.data.user;
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
        $cookies.put('userToken', res.data.token, {secure: true});
        User.currentUser = res.data.user;
        return res.data;
      });
    };

    auth.logout = function () {
      $cookies.remove('userToken');
      User.setDefault();
    };

    return auth;

  });
