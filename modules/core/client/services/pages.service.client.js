'use strict';

angular.module('nobsjs')
  .factory('pagesService', pagesService);

pagesService.$inject = ['$http', '$state', 'pageStateManager'];

function pagesService ($http, $state, pageStateManager) {
  var pages = {
    createPage: createPage,
    currentState: $state.current.name,
    deletePage: deletePage,
    getAllPages: getAllPages,
    getPage: getPage,
    updatePage: updatePage
  };

  return pages;

  //////////

  // dynamically adds state to $stateProvider, then redirects
  function addState (page) {
    pageStateManager.addState(page);
    $state.go('pages.' + page.id);
  }

  function createPage (page) {
    var req = {
      method: 'POST',
      url: 'api/core/pages',
      data: page
    };

    return $http(req)
      .then(returnData)
      .then(addState);
      // no catch block allows the controller to receive the error and provide feedback to the user

  }

  function deletePage (pageId) {
    var req = {
      method: 'DELETE',
      url: '/api/core/pages/' + pageId
    };

    return $http(req)
      .then(redirectHome);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function getAllPages () {
    var req = {
      method: 'GET',
      url: '/api/core/pages'
    };

    return $http(req)
      .then(returnData);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function getPage (pageId) {
    pageId = pageId || $state.current.name.split('.')[1];
    var req = {
      method: 'GET',
      url: 'api/core/pages/' + pageId
    };

    return $http (req)
      .then(returnData);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function redirectHome () {
    $state.go('home');
  }

  function redirectToPage (page) {
    $state.go('pages.' + page.id);
  }

  function returnData (res) {
    return res.data;
  }

  function updatePage (page, pageId) {
    var req = {
      method: 'PUT',
      url: '/api/core/pages/' + pageId,
      data: page
    };

    return $http(req)
      .then(returnData)
      .then(redirectToPage);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }
}
