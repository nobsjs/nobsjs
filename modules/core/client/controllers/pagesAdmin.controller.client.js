'use strict';

angular.module('tropicalbs')

.config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('pagesCreate', {
      parent: 'nav',
      url: '/pages/create',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/page-admin.view.client.html',
          controller: 'PagesAdminController'
        }
    }
  })

    .state('pagesEdit', {
          parent: 'nav',
          url: '/pages/edit/:pageId',
          views: {
            'nav-child-content': {
              templateUrl: '../../../../modules/core/client/views/page-admin.view.client.html',
              controller: 'PagesAdminController'
            }
        }
      });
}])

.controller('PagesAdminController', ['$scope', '$state', '$pageStateManager', 'Pages', '$stateParams', '$window', function ($scope, $state, $pageStateManager, Pages, $stateParams, $window) {
  $scope.page = {};

  if($state.current.name === 'pagesCreate') {
    // we are in create mode
    $scope.mode = 'create';
    $scope.button = 'Create Page';
    $scope.pageTitle = 'Create a Page';
  } else if ($state.current.name === 'pagesEdit') {
    // we are in edit mode
    $scope.mode = 'edit';
    $scope.button = 'Update Page';
    $scope.pageTitle = 'Update a Page';
  }
  // console.log('stateParams pageId from the url', $stateParams.pageId);

  // Make sure pageId exists
  if($stateParams.pageId) {

    $scope.page.id = $stateParams.pageId;
    //get page info and update $scope.page if successful
    Pages.getPageById($scope.page.id).then(function(res) {
      $scope.page.title = res.title;
      $scope.page.slug = res.slug;
      $scope.page.content = res.content;
    });
  } else {
    // TODO: show the user an error message or create a redirect handler.
  }

  $scope.submit = function() {
    if($scope.mode === 'create') {
      $scope.create();
    } else if ($scope.mode === 'edit') {
      $scope.update();
    }
  };


  // TODO: add validation in the view (check if it has a slash and other acceptability requirements)
  $scope.create = function() {
    Pages.createPage($scope.page)
      .then(function (resp) {
        $pageStateManager.addState(resp);
        $state.go('pages.' + resp.id);
      });
  };

  $scope.update = function() {
    Pages.updatePage($scope.page, $scope.page.id)
      .then(function (resp) {
        // TODO: update state so that you don't need to refresh the page
        // $pageStateManager.addState(resp);
        // $state.go('pages.' + resp.id);

        // reloads the app
        $window.location.reload();
      });
  };

}]);
