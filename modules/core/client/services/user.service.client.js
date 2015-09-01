'use strict';

angular.module('tropicalbs')
  .factory('User', function ($http, $location, $window) {

    var defaultUser = {
        email: '',
        roles: ['public']
      };

    var user = {
      currentUser: {},
      setDefault: function(){
        user.currentUser = defaultUser;
      }
    };
    user.setDefault();
    return user;
  });
