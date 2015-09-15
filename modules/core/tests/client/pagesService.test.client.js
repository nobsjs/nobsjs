'use strict';

describe('pagesService', function () {
  var $http, $state, pagesService, $httpBackend, pageObject;

  beforeEach(function () {

    module('nobsjs');

    inject(function ($injector) {
      $http = $injector.get('$http');
      $state = $injector.get('$state');
      pagesService = $injector.get('pagesService');
      $httpBackend = $injector.get('$httpBackend');
    });

    pageObject = {
      id: 1,
      title: 'mocktitle',
      slug: '/slug',
      content: 'some content'
    };
  });

  describe('Page Create', function () {
    it('should have a create page function', function () {
      expect(typeof pagesService.createPage).toEqual('function');
    });

    it('should be able to create a page', function () {
      $httpBackend.expectPOST('/api/core/pages').respond(pageObject);
      pagesService.createPage(pageObject).then(function (res) {
        expect(res).toEqual(pageObject);
      });
    });
  });

  describe('Page Delete', function () {
    it('should have a delete page function', function () {
      expect(typeof pagesService.deletePage).toEqual('function');
    });
    it('should be able to delete a page', function () {
      $httpBackend.expectDELETE('/api/core/pages' + pageObject.id).respond(pageObject);
      pagesService.deletePage(pageObject).then(function (res) {
        expect(res).toEqual(pageObject);
      });
    });
  });


  describe('Get All Pages', function () {
    it('should have a getAllPages function', function () {
      expect(typeof pagesService.getAllPages).toEqual('function');
    });
    it('should be able to get all Pages', function () {
      $httpBackend.expectGET('/api/core/pages').respond([pageObject,pageObject]);
      pagesService.getAllPages(pageObject).then(function (res) {
        expect(res).toEqual([pageObject,pageObject]);
      });
    });
  });


  describe('Get One Page', function () {
    it('should have a getPage property', function () {
      expect(typeof pagesService.getPage).toEqual('function');
    });
    it('should be able to get a page', function () {
      $httpBackend.expectPOST('/api/core/pages/' + pageObject.id).respond(pageObject);
      pagesService.getPage(pageObject).then(function (res) {
        expect(res).toEqual(pageObject);
      });
    });
  });


  describe('Update Page', function () {
    it('should have a updatePage function', function () {
      expect(typeof pagesService.updatePage).toEqual('function');
    });
    it('should be able to update a page', function () {
      $httpBackend.expectPUT('/api/core/pages/' + pageObject.id).respond(pageObject);
      pagesService.updatePage(pageObject).then(function (res) {
        expect(res).toEqual(pageObject);
      });
    });
  });

  describe('Current State', function () {
    it('should have a property to return the current state', function () {
      expect(pagesService.currentState).toEqual($state.current.name);
    });
  });
});
