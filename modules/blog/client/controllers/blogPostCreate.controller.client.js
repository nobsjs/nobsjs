'use strict';

angular.module('nobsjs')
  .controller('BlogPostCreateController', BlogPostCreateController);

BlogPostCreateController.$inject = ['$state', '$stateParams', '$window', 'blogService'];

/**
 * Manages the view of an individual Page Admin. This is an admin view that enables create/edit/delete operations on a Page
 *
 * @param {AngularService} $state UI-router service
 * @param {AngularService} $stateParams UI-router service used to access state parameters
 * @param {AngularService} $window Angular service that references the browser window
 * @param {CustomService} blogService manages blog posts
 */
function BlogPostCreateController ($state, $stateParams, $window, blogService) {
  var vm = this;
  vm.createPost = createPost;
  vm.deletePost = deletePost;
  vm.mode = '';
  vm.post = {};
  vm.viewTitle = '';
  vm.updatePost = updatePost;

  activate();

  ///////////

  /**
   * Checks if state represent edit mode or creation mode, then retrieves the page and loads data into the view model
   */
  function activate () {
    loadPageIfEdit();
  }

  /**
   * Requests the blog Service to perform a post creation action
   */
  function createPost () {
    blogService.createPost(vm.post);
  }

  /**
   * Requests the blog Service to perform a delete post action
   */
  function deletePost () {
    blogService.deletePost(vm.post.id);
  }

  /**
   * Checks if state represent edit mode or creation mode by accessing the name of the current $state
   */
  function loadPageIfEdit () {
    if($stateParams.postId) {
      // we are in edit mode
      vm.viewTitle = 'Edit Post';
      vm.mode = 'edit';
      blogService.getPost($stateParams.postId)
        .then(setPost)
        .catch();
    } else {
      vm.viewTitle = 'Create Post';
      vm.mode = 'create';
    }
  }

  function setPost (post) {
    vm.post = post;
  }

  /**
   * Requests the page Service to update the content of a specific page
   */
  function updatePost () {
    blogService.updatePost(vm.post, vm.post.id);
  }
}
