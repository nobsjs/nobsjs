'use strict';

angular.module('nobsjs')
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
          controller: 'BlogListController',
          controllerAs: 'vm'
        }
      }
    });

  $stateProvider
    .state('blog.post', {
      // assigned as a child of the pages state
      parent: 'blog',
      url: '/blog/{postId}',
      views: {
        // loads nested view at the Nav - grandparent level
        'nav-child-content@nav': {
          templateUrl: '../../../../modules/blog/client/views/singlePost.view.client.html',
          controller: 'BlogPostController',
          controllerAs: 'vm'
        }
      }
    });

  $stateProvider
    .state('blog.create', {
      // assigned as a child of the pages state
      parent: 'blog',
      url: '/blog/create/{postId}',
      views: {
        // loads nested view at the Nav - grandparent level
        'nav-child-content@nav': {
          templateUrl: '../../../../modules/blog/client/views/createPost.view.client.html',
          controller: 'BlogPostCreateController',
          controllerAs: 'vm'
        }
      }
    });
}
