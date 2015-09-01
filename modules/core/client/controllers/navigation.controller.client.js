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

	.controller('NavigationController', function ($scope, $state, $window) {

    $scope.user = {};
    $scope.user.email = $window.localStorage.getItem('userEmail');
    $scope.user.admin = $window.localStorage.getItem('userAdmin');

    // probably not needed
    // var updateTabMapping = function () {
    //   var curr;
    //   for (var i = 0; i< $scope.tabs.length; i++) {
    //     curr = $scope.tabs[i];
    //     $scope.tabMapping[curr.uisref] = i;
    //   }
    // };
    // $scope.tabMapping = {};
    // updateTabMapping();

    $scope.tabs = [
      { title:'Home', href:'#/home', uisref:'home'},
      { title:'Schedule', href:'#/schedule', uisref:'schedule'},
      { title:'Blog', href:'#/blog', uisref:'blog'},
      { title:'About', href:'#/about', uisref:'about'},
      { title:'Admin', href:'#/admin', uisref:'admin'}
    ];

    // allow view to access the current state
    $scope.state = $state;
    // console.log($state);
    // console.log($state.get());

  // probably not needed
    // $scope.changeHash = function(data) {
    //   window.location.hash = data;
    // };

	});
