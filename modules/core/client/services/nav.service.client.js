'use strict';

angular.module('tropicalbs')
  .factory('navService', navService);

navService.$inject = ['$http', '$location', '$window'];

function navService ($http, $location, $window) {

  var _tabs = $window.tabs;
  console.log('Tabs loaded in index', _tabs);

  var nav = {
    getTabs: getTabs,
    updateTabs: updateTabs
  };

  return nav;

  //////////

  function getTabs () {
    return _tabs;
  }

  function updateTabs () {
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
