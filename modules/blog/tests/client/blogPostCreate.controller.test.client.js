'use strict';

describe('BlogPostCreateController', function () {

  var BlogPostCreateController;

  beforeEach(module('nobsjs'));

  beforeEach(inject(function ($controller) {
    BlogPostCreateController = $controller('BlogPostCreateController');
  }));

  it('should exist', function () {
    expect(BlogPostCreateController).not.toBeUndefined();
  });

  it('should have a createPost function', function () {
    expect(typeof BlogPostCreateController.createPost).toEqual('function');
  });

  it('should have a deletePost function', function () {
    expect(typeof BlogPostCreateController.deletePost).toEqual('function');
  });

  it('should have a mode string', function () {
    expect(typeof BlogPostCreateController.mode).toEqual('string');
  });

  it('should have a post object', function () {
    expect(typeof BlogPostCreateController.post).toEqual('object');
  });

  it('should have a viewTitle string', function () {
    expect(typeof BlogPostCreateController.viewTitle).toEqual('string');
  });

  it('should have an updatePost function', function () {
    expect(typeof BlogPostCreateController.updatePost).toEqual('function');
  });

});
