'use strict';

angular.module('tropicalbs')
  .factory('authService', authService);

authService.$inject =  ['$cookies', '$http', '$location', '$window', 'userService'];

function authService ($cookies, $http, $location, $window, userService) {

  var auth = {
    checkAuth: checkAuth,
    login: login,
    logout: logout,
    signup: signup
  };

  return auth;

  //////////

  function checkAuth () {
    var req = {
      method: 'POST',
      url: 'api/core/users/checkauth'
    };

    return $http(req)
      .then(userLogin)
      .catch(handleAuthError);

    function handleAuthError (err) {
      // if AUTH is unsuccessful, 'logout'
      auth.logout();
      return err;
    }
  }

  function login (user) {
    var req = {
      method: 'POST',
      url: 'api/core/users/login',
      data: user
    };

    return $http(req)
      .then(storeCookie)
      .then(userLogin);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function logout () {
    $cookies.remove('userToken');
    userService.setDefault();
    $window.location.reload();
  }

  function signup (user) {
    var req = {
      method: 'POST',
      url: 'api/core/users/signup',
      data: user
    };

    return $http(req)
      .then(storeCookie)
      .then(userLogin);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  // Store the Cookie
  function storeCookie (res) {
    console.log('Inside store cookie', res);
    if (res.secure) {
      $cookies.put('userToken', res.data.token, {secure: true});
    } else {
      $cookies.put('userToken', res.data.token);
    }
    return res;
  }

  function userLogin (res) {
    console.log('inside user login', res);
    userService.login(res.data.user);
    return res;
  }
}
