'use strict';

angular.module('tropicalbs')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule', {
        parent: 'nav',
        url: '/schedule',
        views: {
          'nav-child-content': {
            templateUrl: '../../../../modules/core/client/views/schedule.view.client.html',
            controller: 'ScheduleController'
          }
        }
        // console.log for testing
        // onEnter: function() { console.log('enter schedule.html'); }
    });
  })

	.controller('ScheduleController', function ($scope) {
	});
