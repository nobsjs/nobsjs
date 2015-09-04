'use strict';

angular.module('tropicalbs')
  .factory('pagesService', pagesService);

pagesService.$inject = ['$http', '$state'];

function pagesService ($http, $state) {
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

  function createPage (page) {
    var req = {
      method: 'POST',
      url: 'api/core/pages',
      data: page
    };

    return $http(req)
      .then(returnData)
      .catch(handleError);
  }

  function deletePage (pageId) {
    var req = {
      method: 'DELETE',
      url: '/api/core/pages/' + pageId
    };

    return $http(req)
      .then(returnData)
      .catch(handleError);
  }

  function getAllPages () {
    var req = {
      method: 'GET',
      url: '/api/core/pages'
    };

    return $http(req)
      .then(returnData)
      .catch(handleError);
  }

  function getPage (pageId) {
    pageId = pageId || $state.current.name.split('.')[1];
    var req = {
      method: 'GET',
      url: 'api/core/pages/' + pageId
    };

    return $http (req)
      .then(returnData)
      .catch(handleError);
  }

  function handleError (err) {
    return err;
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
      .catch(handleError);
  }
}
