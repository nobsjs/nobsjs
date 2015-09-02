'use strict';

angular.module('tropicalbs')

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider

    .state('pagesList', {
      parent: 'nav',
      url: '/pages',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/page-admin-list.view.client.html',
          controller: 'PagesAdminListController'
        }
      }
    });
}])

.controller('PagesAdminListController', ['$scope', 'Pages', '$state', function ($scope, Pages, $state) {

  // transitions state to page view with that page Id
  $scope.gotoPage = function (pageId) {
    $state.go('pages.' + pageId);
  };

  // transitions state to page EDIT view with that page Id
  $scope.gotoEditPage = function (pageId) {
    $state.go('pagesEdit',{
      pageId: pageId
    });
  };

  // Queries the database to get all Pages
  // NOTE: it retrieves the entire content
  // TODO: ideally we should decide to show a snippet of the content or not show the content at all
  Pages.getAllPages().then(function(res){
    $scope.allPages = res;
  });
}]);
