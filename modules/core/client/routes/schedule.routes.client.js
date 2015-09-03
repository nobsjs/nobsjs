'use strict';

angular.module('tropicalbs')
  .config(scheduleConfig);

scheduleConfig.$inject = ['$stateProvider'];

function scheduleConfig ($stateProvider) {
  $stateProvider
    .state('schedule', {
      parent: 'nav',
      url: '/schedule',
      views: {
        'nav-child-content': {
          templateUrl: '../../../../modules/core/client/views/schedule.view.client.html',
          controller: 'ScheduleController',
          controllerAs: 'vm'
        }
      }
  });
}
