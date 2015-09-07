'use strict';

angular.module('tropicalbs')
  .factory('navService', navService);

navService.$inject = ['$http', '$location', '$window', 'userService'];

function navService ($http, $location, $window, userService) {

  var _tabs = $window.tabs;

  var nav = {
    getAllTabs: getAllTabs,
    getUserTabs: getUserTabs,
    refreshTabs: refreshTabs
  };

  return nav;

  //////////

  function getAllTabs () {
    return _tabs;
  }

  function getUserTabs () {
    return _.filter(_tabs, function (tab) {
      // intersection returns empty array when no intersection is found
      // thus we can use this to determine whether or not a tab should be visible
      return _.intersection(tab.visibleRoles, userService.currentUser.roles).length > 0;
    });
  }

  function refreshTabs () {
    var req = {
      method: 'GET',
      url: 'api/core/tabs'
    };
    return $http(req)
      .then(handleResponse)
      .catch(handleError);
  }

  function handleError (err) {
    return err;
  }

  function handleResponse (res) {
    _tabs = res.data;
  }
}
