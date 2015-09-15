'use strict';

angular.module('nobsjs')
  .factory('blogService', blogService);

blogService.$inject = ['$http', '$state'];

function blogService ($http, $state) {
  var blog = {
    createPost: createPost,
    deletePost: deletePost,
    getAllPosts: getAllPosts,
    getPost: getPost,
    updatePost: updatePost
  };

  return blog;

  //////////

  function createPost (post) {
    var req = {
      method: 'POST',
      url: 'api/blog/posts',
      data: post
    };

    return $http(req)
      .then(returnData)
      .then(redirectHome);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function deletePost (postId) {
    var req = {
      method: 'DELETE',
      url: '/api/blog/posts/' + postId
    };

    return $http(req)
      .then(redirectHome);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function getAllPosts () {
    var req = {
      method: 'GET',
      url: '/api/blog/posts'
    };

    return $http(req)
      .then(returnData);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function getPost (postId) {
    var req = {
      method: 'GET',
      url: 'api/blog/posts/' + postId
    };

    return $http (req)
      .then(returnData);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }

  function redirectHome () {
    $state.go('blog.list');
  }

  function returnData (res) {
    return res.data;
  }

  function updatePost (post, postId) {
    var req = {
      method: 'PUT',
      url: '/api/blog/posts/' + postId,
      data: post
    };

    return $http(req)
      .then(returnData)
      .then(redirectHome);
      // no catch block allows the controller to receive the error and provide feedback to the user
  }
}
