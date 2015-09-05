'use strict';

describe('Nav Routes', function () {
  var $state;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  describe('Nav State', function () {

    var navState;

    beforeEach(function () {
      navState = $state.get('nav');
    });

    it('should have a pagesList state', function () {
      expect(navState).toBeDefined();
    });

    it('should have a parent', function () {
      expect(navState.parent).toEqual('app');
    });

    it('should have a abstract', function () {
      expect(navState.abstract).toEqual(true);
    });

    it('should have a template url set', function () {
      expect(navState.views['navigation-menu'].templateUrl).toEqual('../../../../modules/core/client/views/navigation.view.client.html');
    });

    it('should have a controller set', function () {
      expect(navState.views['navigation-menu'].controller).toEqual('NavigationController');
    });

    it('should have a controllerAs set', function () {
      expect(navState.views['navigation-menu'].controllerAs).toEqual('vm');
    });

    it('should have a template', function () {
      expect(navState.views['main-content'].template).toEqual('<div ui-view name="nav-child-content"></div>');
    });

  });

});
