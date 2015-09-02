'use strict';

angular.module('tropicalbs')
.config(mainConfig);

mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function mainConfig ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    // MAIN PARENT ROUTE ========
    .state('app', {
      templateUrl: '../../../../modules/core/client/views/app.view.client.html',
      abstract: true
    });

  $httpProvider.interceptors.push('AttachTokens');
}





