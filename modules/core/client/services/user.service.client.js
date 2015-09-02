'use strict';

angular.module('tropicalbs')
  .factory('User', function () {

    var defaultUser = {
        email: null,
        roles: ['public']
      };

    var isLoggedIn = false;

    var user = {
      currentUser: defaultUser,
      isLoggedIn: isLoggedIn,
      setDefault: function(){
        user.currentUser = defaultUser;
        user.isLoggedIn = false;
      },
      logIn: function (newUser) {
        user.currentUser = newUser;
        user.isLoggedIn = true;
      }
    };
    return user;
  });
