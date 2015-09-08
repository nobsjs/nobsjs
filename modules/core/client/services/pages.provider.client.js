'use strict';

angular.module('tropicalbs')
  .provider('pageStateManager', pageStateManager);

pageStateManager.$inject =  ['$stateProvider'];

function pageStateManager ($stateProvider) {
  /* jshint validthis:true */
  this.$get = function () {
    return {
      addState: addState
    };

    function addState (page) {
      $stateProvider.state('pages.' + page.id, {
        url: page.slug,
        parent: 'pages',
        views: {
          // loads nested view at the Nav - grandparent level
          'nav-child-content@nav': {
            templateUrl: '../../../../modules/core/client/views/page.view.client.html',
            controller: 'PagesController',
            controllerAs: 'vm'
          }
        }
      });
    }
  };
}
