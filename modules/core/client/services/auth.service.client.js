'use strict';

angular.module('tropicalbs')
  .factory('AuthService', AuthService);

AuthService.$inject =  ['$http', '$location', '$window', '$cookies', 'UserService'];

function AuthService ($http, $location, $window, $cookies, UserService) {

  var auth = {
    checkAuth: checkAuth,
    login: login,
    logout: logout,
    signup: signup
  };

  return auth;

  //////////

  function checkAuth () {
    return $http({
      method: 'POST',
      url: 'api/core/users/checkauth'
    })
    .then(function (res) {
      UserService.logIn(res.data.user);
      return res;
    })
    .catch(function (e) {
      console.log(e);
      //if AUTH is unsuccessful, 'logout'
      auth.logout();
    });
  }

  function handleError (error) {
    return error;
  }

  function login (user) {
    return $http({
      method: 'POST',
      url: 'api/core/users/login',
      data: user
    })
    .then(storeCookie)
    .catch(handleError);
  }

  function logout () {
    $cookies.remove('userToken');
    UserService.setDefault();
    $window.location.reload();
  }

  function signup (user) {
    return $http({
      method: 'POST',
      url: 'api/core/users/signup',
      data: user
    })
    .then(storeCookie)
    .catch(handleError);
  }

  //store the Cookie and Log the user in
  function storeCookie (res) {
    if (res.secure) {
        $cookies.put('userToken', res.data.token, {secure: true});
      } else {
        $cookies.put('userToken', res.data.token);
      }
      UserService.logIn(res.data.user);
      return res;
  }
}
