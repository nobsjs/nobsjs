'use strict';

angular.module('nobsjs')
  .factory('tabsService', tabsService);

tabsService.$inject = ['$http'];

function tabsService ($http) {
  var tabs = {
    createTab: createTab,
    deleteTab: deleteTab,
    getAllTabs: getAllTabs,
    getTab: getTab,
    updateTab: updateTab
  };

  return tabs;

  //////////


  function createTab (tab) {
    var req = {
      method: 'POST',
      url: '/api/core/tabs',
      data: tab
    };

    return $http(req)
      .then(returnData);
  }

  function deleteTab (tabId) {
    var req = {
      method: 'DELETE',
      url: '/api/core/tabs/' + tabId
    };

    return $http(req);
  }

  function getAllTabs () {
    var req = {
      method: 'GET',
      url: '/api/core/tabs'
    };

    return $http(req)
      .then(returnData);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function getTab (tabId) {
    var req = {
      method: 'GET',
      url: '/api/core/tabs/' + tabId
    };

    return $http(req)
      .then(returnData);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function returnData (res) {
    return res.data;
  }

  function updateTab (tab, tabId) {
    console.log('logging the tab', tab, tabId);
    var req = {
      method: 'PUT',
      url: '/api/core/tabs/' + tabId,
      data: tab
    };

    return $http(req)
      .then(returnData);
  }
}
