'use strict';

angular.module('tropicalbs')
  .config(mainConfig);

mainConfig.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

function mainConfig ($httpProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    // MAIN PARENT ROUTE
    .state('app', {
      templateUrl: '../../../../modules/core/client/views/app.view.client.html',
      abstract: true
    });

  $httpProvider.interceptors.push('attachTokens');
}
