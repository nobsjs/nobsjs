'use Strict';

angular.module('tropicalbs')
  .factory('Auth', function ($http, $location, $window) {

    var auth = {};

    auth.login = function (user) {
      return $http({
        method: 'POST',
        url: 'api/users/login',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });
    };

    auth.signup = function (user) {

    };

    return auth;

  });
