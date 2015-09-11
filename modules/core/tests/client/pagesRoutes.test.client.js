'use strict';

describe('Pages Routes', function () {
  var $state, $window;

  beforeEach(module('nobsjs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
    $window = $injector.get('$window');
  }));

  beforeEach(function () {
    var page1 = {
      id: 1,
      slug: '/page1'
    };
    var page2 = {
      id: 2,
      slug: '/page2'
    };
    $window.pages = [page1, page2];
  });

  describe('Pages State', function () {

    it('should have a pages state', function () {
      expect($state.get('pages')).toBeDefined();
    });

    it('should have a parent', function () {
      expect($state.get('pages').parent).toEqual('nav');
    });

    it('should have an abstract', function () {
      expect($state.get('pages').abstract).toEqual(true);
    });

  });

  describe('pages.1', function () {

    it('should have a state for page.1', function () {
      expect($state.get('pages.1')).toBeDefined();
    });

    it('should have a url set', function () {
      expect($state.get('pages.1').url).toEqual('/page1');
    });

    it('should have a views object', function () {
      expect(typeof $state.get('pages.1').views).toEqual('object');
    });

    it('should have a templateUrl', function () {
      expect($state.get('pages.1').views['nav-child-content@nav'].templateUrl).toEqual('../../../../modules/core/client/views/page.view.client.html');
    });

    it('should have a controller', function () {
      expect($state.get('pages.1').views['nav-child-content@nav'].controller).toEqual('PagesController');
    });

    it('should have a controllerAs', function () {
      expect($state.get('pages.1').views['nav-child-content@nav'].controllerAs).toEqual('vm');
    });

  });


  describe('pages.2', function () {

    it('should have a state for page.2', function () {
      expect($state.get('pages.2')).toBeDefined();
    });

    it('should have a url set', function () {
      expect($state.get('pages.2').url).toEqual('/page2');
    });

    it('should have a views object', function () {
      expect(typeof $state.get('pages.2').views).toEqual('object');
    });

    it('should have a templateUrl', function () {
      expect($state.get('pages.2').views['nav-child-content@nav'].templateUrl).toEqual('../../../../modules/core/client/views/page.view.client.html');
    });

    it('should have a controller', function () {
      expect($state.get('pages.2').views['nav-child-content@nav'].controller).toEqual('PagesController');
    });

    it('should have a controllerAs', function () {
      expect($state.get('pages.2').views['nav-child-content@nav'].controllerAs).toEqual('vm');
    });

  });

});
