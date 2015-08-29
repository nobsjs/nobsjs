'use strict';

// defines main app and inject dependencies
// TODO: load all modules and controllers dynamically
var tropicalbs = angular.module('tropicalbs', [
    'ui.router',
    'ngMaterial'
  ]);

tropicalbs.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    // MAIN PARENT ROUTE ========
    .state('app', {
      templateUrl: '../../../../modules/core/client/views/app.view.client.html',
      abstract: true,
      controller: 'AppController'
    });
});
