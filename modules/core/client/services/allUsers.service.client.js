'use strict';

angular.module('tropicalbs')
  .factory('allUsersService', allUsersService);

allUsersService.$inject = ['$http'];

function allUsersService($http) {

  var users = {
      deleteUser: deleteUser,
      getRoles: getRoles,
      getStrippedRoles: getStrippedRoles,
      getUsers: getUsers,
      updateUser: updateUser
  };

  return users;

  //////////

  function deleteUser (user) {
    var req = {
      method: 'DELETE',
      url: 'api/core/users/' + user.id
    };

    return $http(req);
  }

  function getRoles () {
    var req = {
      method: 'GET',
      url: 'api/core/roles'
    };

    return $http(req)
      .then(returnData);

    /////////

    function returnData (res) {
      return res.data;
    }
  }

  function getStrippedRoles () {
    return getRoles()
      .then(strip)
      .catch(logError);

    //////////

    function logError (err) {
      console.log('Error getting roles');
    }

    function strip (roles) {
      return _.map(roles, function (role) { return role.name; });
    }
  }

  function getUsers () {
    var req = {
      method: 'GET',
      url: 'api/core/users'
    };

    return $http(req)
      .then(sendData)
      .catch(error);

    //////////

    function error () {
      console.log('Unable to fetch users');
    }

    function sendData (res) {
      return res.data;
    }
  }

  function updateUser (user) {
    var req = {
      method: 'PUT',
      url: 'api/core/users/' + user.id,
      data: user
    };

    return $http(req);
  }
}
