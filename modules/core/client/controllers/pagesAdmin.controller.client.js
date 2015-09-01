'use strict';

angular.module('tropicalbs')

.config(function ($stateProvider) {
  $stateProvider
    .state('pagesAdmin', {
      parent: 'nav',
      url: '/pages/create',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/page-admin.view.client.html',
          controller: 'PagesAdminController'
        }
    }});
})

.controller('PagesAdminController', function($scope, $state, $pageStateManager, Pages) {
  $scope.page = {};

  $scope.create = function() {
    Pages.createPage($scope.page)
      .then(function (resp) {
        $pageStateManager.addState(resp);
        $state.go('pages.' + resp.id);
      });
  };
});
