'use strict';

angular.module('tropicalbs')
  .factory('userService', userService);

function userService() {

  var defaultUser = {
    email: null,
    roles: ['public']
  };
  var isLoggedIn = false;
  var user = {
      currentUser: defaultUser,
      isLoggedIn: isLoggedIn,
      login: login,
      setDefault: setDefault
  };

  return user;

  //////////

  function login (newUser) {
    user.currentUser = newUser;
    user.isLoggedIn = true;
  }

  function setDefault () {
    user.currentUser = defaultUser;
    user.isLoggedIn = false;
  }
}
