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

  });
