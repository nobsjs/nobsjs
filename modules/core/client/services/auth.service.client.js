'use Strict';

angular.module('tropicalbs')
  .factory('Auth', function ($http, $location, $window) {

    var auth = {};

    auth.login = function (user) {
      console.log('sending post to log in. email: ', user.email, 'password: ', user.password);
      return $http({
        method: 'POST',
        url: 'api/core/users/login',
        data: user
      })
      .then(function (resp) {
        console.log(resp.data);
      });
    };

    auth.signup = function (user) {
      console.log('sending post to sign up');
      return $http({
        method: 'POST',
        url: 'api/core/users/signup',
        data: user
      })
      .then(function (resp) {
        console.log(resp.data);
      });
    };

    return auth;

  });
