'use strict';

angular.module('tropicalbs')

  .config(function ($stateProvider) {
    $stateProvider
      .state('nav', {
        parent: 'app',
        abstract: true,
        views: {
          'navigation-menu': {
            templateUrl: '../../../../modules/core/client/views/navigation.view.client.html',
            controller: 'NavigationController'
          },
          'main-content': {
            template: '<div ui-view name="nav-child-content"></div>'
          }
        }
      });
  })

	.controller('NavigationController', function ($scope, $state, $window, Auth, Nav, User, $location) {

    $scope.user = User.currentUser;
    var tabs = _.filter(Nav.tabs, function (tab) {
      //intersection returns empty array when no intersection is found
      //thus we can use this to determine whether or not a tab should be visible
      return _.intersection(tab.visibleRoles, $scope.user.roles).length > 0;
    });
    $scope.tabs = tabs;
    // filters tabs by intersection of user roles and tab visible roles

    $scope.logout = function () {
      Auth.logout();
      $window.location.reload();
    };

    // allow view to access the current state
    $scope.state = $state;
    // console.log($state);
    // console.log($state.get());

  // probably not needed
    // $scope.changeHash = function(data) {
    //   window.location.hash = data;
    // };

	});
