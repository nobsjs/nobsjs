'use strict';

angular.module('nobsjs')
  .controller('BlogListController', BlogListController);

BlogListController.$inject = ['$state', 'blogService', 'userService'];

function BlogListController ($state, blogService, userService) {
  var vm = this;
  vm.gotoPost = gotoPost;
  vm.gotoCreateEdit = gotoCreateEdit;
  vm.canEdit = canEdit;

  var editRoles = ['owner', 'admin'];

  activate();

  //////////

  function activate () {
    blogService.getAllPosts()
      .then(setPosts);
  }

  function canEdit () {
    return userService.hasRole(editRoles);
  }

  function gotoCreateEdit (postId){
    $state.go('blog.create', {postId: postId});
  }

  function gotoPost (postId){
    $state.go('blog.post', {postId: postId});
  }

  function setPosts (posts) {
    vm.posts = posts;
  }
}
