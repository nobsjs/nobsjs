'use strict';

angular.module('tropicalbs')
  .provider('$pageStateManager', $pageStateManager);

$pageStateManager.$inject =  ['$stateProvider'];

function $pageStateManager ($stateProvider) {
  this.$get = function ($state) {
    return {
      addState: function (page) {
        $stateProvider.state('pages.' + page.id, {
          url: page.slug,
          parent: 'pages',
          views: {
            // loads nested view at the Nav - grandparent level
            'nav-child-content@nav': {
              templateUrl: '../../../../modules/core/client/views/page.view.client.html',
              controller: 'PagesController'
            }
          }
        });
      }
    };
  };
}

