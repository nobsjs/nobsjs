'use strict';

angular.module('nobsjs')
  .factory('authService', authService);

authService.$inject =  ['$cookies', '$http', '$location', '$window', 'userService'];

function authService ($cookies, $http, $location, $window, userService) {

  var auth = {
    checkAuth: checkAuth,
    login: login,
    logout: logout,
    resetPassword: resetPassword,
    sendResetToken: sendResetToken,
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

  function sendResetToken (user) {
    var req = {
      method: 'POST',
      url: 'api/core/users/sendresettoken',
      data: user
    };

    return $http(req)
      .then(returnData);
  }

  function resetPassword (user) {
    var req = {
      method: 'POST',
      url: 'api/core/users/resetpassword',
      data: user
    };

    return $http(req);
  }

  function returnData (res) {
    return res.data;
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
    if (res.secure) {
      $cookies.put('userToken', res.data.token, {secure: true});
    } else {
      $cookies.put('userToken', res.data.token);
    }
    return res;
  }

  function userLogin (res) {
    userService.login(res.data.user);
    return res;
  }
}
