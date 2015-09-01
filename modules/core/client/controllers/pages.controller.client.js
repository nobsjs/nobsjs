'use strict';

angular.module('tropicalbs')

  .config(function ($stateProvider) {

    // example:
    // pages: [
    //   {id: 1
    //    slug: /test1
    //   }
    // ]

    $stateProvider
      .state('pages', {
        parent: 'nav',
        abstract: true
      });

    var currPage;
    var currPageState;

    for(var i = 0; i < pages.length; i++) {
      currPage = pages[i];
      currPageState = 'pages.' + currPage.id;

      $stateProvider
        .state(currPageState, {
          // assigned as a child of the pages state
          parent: 'pages',
          url: currPage.slug,
          views: {
            // loads nested view at the Nav - grandparent level
            'nav-child-content@nav': {
              templateUrl: '../../../../modules/core/client/views/page.view.client.html',
              controller: 'PagesController'
            }
          },
            // function activated when entering the controller. console.log for testing
           // onEnter: function($stateParams) { console.log('enter pages' + $stateParams); }
        });
    }
  })

	.controller('PagesController', function($scope, $state, Pages) {
    $scope.state = $state.current.name;

    /*
    Code useful for testing - to log the current page Id
    // var pageId = $scope.state;
    // pageId = pageId.split('.')[1];
    // console.log('the pageId accessed from $state is', pageId);
    */

    // Get the page and attach data to the scope
    Pages.getPage().then(function(res){
      $scope.title = res.title;
      $scope.content = res.content;
    });

	});
