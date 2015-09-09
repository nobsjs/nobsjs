'use strict';

angular.module('tropicalbs')
  .config(blogRoutes);

blogRoutes.$inject = ['$stateProvider'];

function blogRoutes ($stateProvider) {

  $stateProvider
    .state('blog', {
      parent: 'nav',
      abstract: true
    });

  $stateProvider
    .state('blog.list', {
      // assigned as a child of the pages state
      parent: 'blog',
      url: '/blog',
      views: {
        // loads nested view at the Nav - grandparent level
        'nav-child-content@nav': {
          templateUrl: '../../../../modules/blog/client/views/listPosts.view.client.html',
          controller: 'PostsController',
          controllerAs: 'vm'
        }
      }
    });
}
