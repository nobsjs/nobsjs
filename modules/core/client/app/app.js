'use strict';

// defines main app and inject dependencies
var tropicalbs = angular.module('tropicalbs', [
    'ui.router',
    'tropicalbs.home',
    // 'ngMock'
    ]);

tropicalbs.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '../../../../modules/core/client/views/core.client.home.html',
            controller: 'HomeCtrl'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
});
