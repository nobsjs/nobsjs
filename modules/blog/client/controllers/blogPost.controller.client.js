'use strict';

angular.module('nobsjs')
  .controller('BlogPostController', BlogPostController);

BlogPostController.$inject = ['$state', '$stateParams', 'blogService'];

function BlogPostController ($state, $stateParams, blogService) {
  var vm = this;
  vm.post = {};
  vm.goToList = goToList;

  activate();

  //////////

  function activate () {
    blogService.getPost($stateParams.postId)
      .then(setPost);
  }

  function goToList () {
    $state.go('blog.list');
  }

  function setPost (post) {
    vm.post = post;
  }
}
