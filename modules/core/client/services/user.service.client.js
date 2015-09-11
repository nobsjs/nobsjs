'use strict';

angular.module('nobsjs')
  .factory('userService', userService);

function userService() {

  var defaultUser = {
    email: null,
    roles: ['public']
  };
  var isLoggedIn = false;
  var user = {
      currentUser: defaultUser,
      hasRole: hasRole,
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

  function hasRole (roles) {
    if (Array.isArray(roles)) {
      return _.intersection(user.currentUser.roles, roles).length > 0;
    } else {
      return _.contains(user.roles, roles);
    }
  }
}
