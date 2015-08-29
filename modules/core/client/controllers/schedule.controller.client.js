'use strict';

angular.module('tropicalbs')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('schedule', {
        parent: 'nav',
        url: '/schedule',
        views: {
          'nav-child-content': {
            templateUrl: '../../../../modules/core/client/views/core.client.schedule.html',
            controller: 'ScheduleController'
          }
        },
        onEnter: function() { console.log("enter schedule.html"); }
    })
  })

	.controller('ScheduleController', function ($scope) {
	});
