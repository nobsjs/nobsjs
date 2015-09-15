'use strict';


describe('Posts Routes', function () {

  var $state;

  beforeEach(function () {

    module('nobsjs');

    inject(function ($injector) {
      $state = $injector.get('$state');
    });

  });

  describe('Blog State', function () {

    it('should have a blog state', function () {
      expect($state.get('blog')).toBeDefined();
    });

    it('should have a parent', function () {
      expect($state.get('blog').parent).toEqual('nav');
    });

    it('should have an abstract', function () {
      expect($state.get('blog').abstract).toEqual(true);
    });

  });

  describe('Blog.list State', function () {

    it('should have a blog.list state', function () {
      expect($state.get('blog.list')).toBeDefined();
    });

    it('should have a url set', function () {
      expect($state.get('blog.list').url).toEqual('/blog');
    });

    it('should have a views object', function () {
      expect(typeof $state.get('blog.list').views).toEqual('object');
    });

    it('should have a templateUrl', function () {
      expect($state.get('blog.list').views['nav-child-content@nav'].templateUrl).toEqual('../../../../modules/blog/client/views/listPosts.view.client.html');
    });

    it('should have a controller', function () {
      expect($state.get('blog.list').views['nav-child-content@nav'].controller).toEqual('BlogListController');
    });

    it('should have a controllerAs', function () {
      expect($state.get('blog.list').views['nav-child-content@nav'].controllerAs).toEqual('vm');
    });

  });

});
