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
        if (res.secure) {
          $cookies.put('userToken', res.data.token, {secure: true});
        } else {
          $cookies.put('userToken', res.data.token);
        }
        User.logIn(res.data.user);
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
        if (res.secure) {
          $cookies.put('userToken', res.data.token, {secure: true});
        } else {
          $cookies.put('userToken', res.data.token);
        }
        User.logIn(res.data.user);
        return res;
      });
    };

    auth.logout = function () {
      $cookies.remove('userToken');
      User.setDefault();
      $window.location.reload();
    };

    auth.checkAuth = function () {
      return $http({
        method: 'POST',
        url: 'api/core/users/checkauth'
      })
      .then(function (res) {
        User.logIn(res.data.user);
        return res;
      })
      .catch(function (e) {
        console.log(e);
        //if AUTH is unsuccessful, 'logout'
        auth.logout();
      });
    };

    return auth;

  }]);
