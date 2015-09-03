'use strict';

angular.module('tropicalbs')
  .factory('PagesService', PagesService);

PagesService.$inject = ['$state', '$http'];

function PagesService ($state, $http) {
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
    return $http({
      method: 'POST',
      url: 'api/core/pages',
      data: page
    }).then(function (resp) {
      return resp.data;
    })
    .catch(function (err) {
      return err;
    });
  }

  function deletePage (pageId) {
    return $http({
      method: 'DELETE',
      url: '/api/core/pages/' + pageId
    }).then(function (resp) {
      return resp.data;
    })
    .catch(function (err) {
      return err;
    });
  }

  function getAllPages () {
    return $http ({
      method: 'GET',
      url: '/api/core/pages'
    })
    .then(function (resp) {
      return resp.data;
    })
    .catch(function (err) {
      return err;
    });
  }

  function getPage (pageId) {
    pageId = pageId || $state.current.name.split('.')[1];

    return $http ({
      method: 'GET',
      url: 'api/core/pages/' + pageId
    })
    .then(function (resp) {
      return resp.data;
    })
    .catch(function (err) {
      return err;
    });
  }

  function updatePage (page, pageId) {
    return $http({
      method: 'PUT',
      url: '/api/core/pages/' + pageId,
      data: page
    }).then(function (resp) {
      return resp.data;
    })
    .catch(function (err) {
      return err;
    });
  }
}
