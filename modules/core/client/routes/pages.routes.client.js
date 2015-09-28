'use strict';

angular.module('nobsjs')
  .config(pagesRoutes);

pagesRoutes.$inject = ['$stateProvider'];

function pagesRoutes ($stateProvider) {

  $stateProvider
    .state('pages', {
      parent: 'nav',
      abstract: true
    });

  generatePages();

  //////////

  function generatePages () {
    var currPage;
    var currPageState;
    //'pages' exists on global scope because it is sent over with intial index.html file
    for(var i = 0; i < pages.length; i++) {
      currPage = pages[i];
      currPageState = currPage.slug.slice(1) || 'index';

      $stateProvider
        .state(currPageState, {
          // assigned as a child of the pages state
          parent: 'pages',
          url: '^' + currPage.slug,
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
  }


}

