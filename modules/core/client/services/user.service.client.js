'use strict';

angular.module('tropicalbs')
  .factory('UserService', UserService);

function UserService() {

  var defaultUser = {
    email: null,
    roles: ['public']
  };
  var isLoggedIn = false;
  var user = {
      currentUser: defaultUser,
      isLoggedIn: isLoggedIn,
      setDefault: setDefault,
      logIn: logIn
  };

  return user;

  //////////

  function setDefault () {
    user.currentUser = defaultUser;
    user.isLoggedIn = false;
  }

  function logIn (newUser) {
    user.currentUser = newUser;
    user.isLoggedIn = true;
  }
}
