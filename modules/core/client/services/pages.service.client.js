'use strict';

angular.module('tropicalbs')

.provider('$pageStateManager', ['$stateProvider', function ($stateProvider) {
  this.$get = function ($state) {
    return {
      addState: function (page) {
        $stateProvider.state('pages.' + page.id, {
          url: page.slug,
          parent: 'pages',
          views: {
            // loads nested view at the Nav - grandparent level
            'nav-child-content@nav': {
              templateUrl: '../../../../modules/core/client/views/page.view.client.html',
              controller: 'PagesController'
            }
          }
        });
      }
    };
  };
}])

  .service('Pages', ['$state', '$http', function ($state, $http) {

    this.getPage = function () {

      var pageId = $state.current.name;
      pageId = pageId.split('.')[1];
      // console.log(pageId);

      return $http ({
        method: 'GET',
        url: 'api/core/pages/' + pageId
      })
      .then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        throw(err);
      });
    };

    // TODO: merge the two getPAge functions
    this.getPageById = function (pageId) {
      return $http ({
        method: 'GET',
        url: 'api/core/pages/' + pageId
      })
      .then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        throw(err);
      });
    };

    this.getAllPages = function () {
      return $http ({
        method: 'GET',
        url: '/api/core/pages'
      })
      .then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        throw(err);
      });
    };

    this.currentState = $state.current.name;

    this.createPage = function (page) {
      return $http({
        method: 'POST',
        url: 'api/core/pages',
        data: page
      }).then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        throw(err);
      });
    };

    this.updatePage = function (page, pageId) {
      return $http({
        method: 'PUT',
        url: '/api/core/pages/' + pageId,
        data: page
      }).then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        throw(err);
      });
    };

    this.deletePage = function (pageId) {
      return $http({
        method: 'DELETE',
        url: '/api/core/pages/' + pageId
      }).then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        throw(err);
      });
    };
  }]);
