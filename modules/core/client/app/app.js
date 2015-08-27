'use strict';

// defines main app and inject dependencies
// TODO: load all modules and controllers dynamically
var tropicalbs = angular.module('tropicalbs', [
    'ui.router',
    'tropicalbs.home',
    'tropicalbs.app',
    'tropicalbs.admin',
    'tropicalbs.blog',
    'tropicalbs.schedule',
    'tropicalbs.about'
    // 'ngMock'
    ]);

tropicalbs.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

        // MAIN ROUTE ========
        .state('app', {
            templateUrl: '../../../../modules/core/client/views/core.client.app.html',
            abstract: true
        })

        .state('app.main', {
            url: '/',
            views: {
                'navigation-menu': {
                    templateUrl: '../../../../modules/core/client/views/core.client.menu.html'
                }
            },
            controller: 'appController'
        })

        // CHILD ROUTE for each sub section ========
        .state('app.sectionName', {
            url: '/:sectionName',
            // loads a nested view within the app view
            views: {
                'navigation-menu': {
                    templateUrl: '../../../../modules/core/client/views/core.client.menu.html'
                },
                // loads this template as the main-content
                'main-content' : {
                    templateUrl: function ($stateParams){
                    // Dynamically finds the relevant html for that particular section and returns it
                    // it takes the state params, looks for the section name and capitalizes the first letter
                    return '../../../../modules/core/client/views/core.client.' + $stateParams.sectionName + '.html';
                    },
                    // dynamically provided controller - this assumes all controllers exist
                    // TODO: add a check to in case the controller does not exist
                    controllerProvider: function ($stateParams) {
                          var ctrlName = $stateParams.sectionName.charAt(0).toUpperCase() + $stateParams.sectionName.slice(1) + "Controller";
                          console.log(ctrlName);
                          return ctrlName;
                      }
                }
            }
        })

        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
});
