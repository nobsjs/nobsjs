'use strict';

angular.module('tropicalbs')
  .factory('Auth', ['$http', '$location', '$window', '$cookies', 'User', function ($http, $location, $window, $cookies, User) {

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
        return res;
      });
    };

    auth.signup = function (user) {
      return $http({
        method: 'POST',
        url: 'api/core/users/signup',
        data: user
      })
      .then(function (res) {
        console.log('token', res.data.token);
        if (res.secure) {
          $cookies.put('userToken', res.data.token, {secure: true});
        } else {
          $cookies.put('userToken', res.data.token);
        }
        User.currentUser = res.data.user;
        return res;
      });
    };

    auth.logout = function () {
      $cookies.remove('userToken');
      User.setDefault();
    };

    return auth;

  }]);
