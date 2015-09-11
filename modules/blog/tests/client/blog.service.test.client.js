'use strict';

describe('blogService', function () {

  var $http, $httpBackend, $state, postObject, blogService;

  beforeEach(function () {

    module('nobsjs');

    inject(function ($injector) {
      $http = $injector.get('$http');
      $httpBackend = $injector.get('$httpBackend');
      $state = $injector.get('$state');

      blogService = $injector.get('blogService');
    });

    postObject = {
      content: 'Content for the Blog Post',
      title: 'Blog Post Title'
    };

  });

  describe('Create Post', function () {

    it('should have a create post function', function () {
      expect(typeof blogService.createPost).toEqual('function');
    });

    it('should be able to create a post', function () {
      $httpBackend.expectPOST('/api/blog/posts').respond(postObject);
      blogService.createPost(postObject)
        .then(function (res) {
          expect(res).toEqual(postObject);
        });
    });

  });

  describe('Delete Post', function () {

    it('should have a delete post function', function () {
      expect(typeof blogService.deletePost).toEqual('function');
    });

    it('should be able to delete a post', function () {
      postObject.id = 7;

      $httpBackend.expectDELETE('/api/core/posts' + postObject.id).respond(postObject);

      blogService.deletePost(postObject).then(function (res) {
        expect(res).toEqual(postObject);
      });
    });

  });

  describe('Update Post', function () {

    it('should have a updatePost function', function () {
      expect(typeof blogService.updatePost).toEqual('function');
    });

    it('should be able to update a post', function () {
      postObject.id = 9;
      $httpBackend.expectPUT('/api/core/posts/' + postObject.id).respond(postObject);
      blogService.updatePost(postObject, postObject.id).then(function (res) {
        expect(res).toEqual(postObject);
      });
    });

  });

  describe('Get All Posts', function () {

    it('should have a get All posts function', function () {
      expect(typeof blogService.getAllPosts).toEqual('function');
    });

    it('should be able to get all posts', function () {
      postObject.id = 19;
      var postObject2 = {
        content: 'Some content for the second post',
        id: 56,
        title: 'The title for post 2'
      };

      $httpBackend.expectGET('/api/core/posts').respond([postObject, postObject2]);
      blogService.getAllPosts().then(function (res) {
        expect(res).toEqual([postObject, postObject2]);
      });

    });

  });

  describe('Get Post', function () {

    it('should have a get post function', function () {
      expect(typeof blogService.getPost).toEqual('function');
    });

    it('should be able to get a post', function () {
      postObject.id = 98;
      $httpBackend.expectGET('/api/core/posts/' + postObject.id).respond(postObject);
      blogService.getPost(postObject).then(function (res) {
        expect(res).toEqual(postObject);
      });
    });

  });

});
