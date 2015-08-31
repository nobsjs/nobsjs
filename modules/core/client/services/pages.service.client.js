'use strict';

angular.module('tropicalbs')
  .service('Pages', function ($state, $http) {

    this.getPage = function() {

      var pageId = $state.current.name;
      pageId = pageId.split('.')[1];
      console.log(pageId);

      return $http ({
        method: 'GET',
        url: 'api/core/pages/' + pageId
      })
      .then(function(res) {
        return res.data;
      });
    };

    this.currentState = $state.current.name;

    this.createPage = function(page) {
      return $http({
        method: 'POST',
        url: 'api/core/pages',
        data: page
      }).then(function (resp) {
        return resp.data;
      });
    };

  });
