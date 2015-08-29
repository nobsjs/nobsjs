'use strict';

// defines main app and inject dependencies
// TODO: load all modules and controllers dynamically
var tropicalbs = angular.module('tropicalbs', [
    'ui.router',
    'ngMaterial',
    'ngMessages'
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

tropicalbs.config(function ($mdThemingProvider) {
   // Configure a dark theme with primary foreground yellow
   $mdThemingProvider.theme('docs-dark', 'default')
       .primaryPalette('yellow');
 });
