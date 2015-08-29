'use strict';

angular.module('tropicalbs')

  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        // assigned as a child of the nav state
        parent: 'nav',
        url: '/home',
        views: {
          // loads nested view
          'nav-child-content': {
            templateUrl: '../../../../modules/core/client/views/home.view.client.html',
            controller: 'HomeController'
          }
        },
          // function activated when entering the controller. console.log for testing
         // onEnter: function() { console.log('enter home.html'); }
      });
  })

	.controller('HomeController', function($scope) {
		$scope.content = 'this is some controller generated content';
	});
