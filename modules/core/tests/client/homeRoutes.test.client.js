'use strict';

describe('Home Routes', function () {
  var $state;

  beforeEach(module('nobsjs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  describe('home State', function () {

    var homeState;

    beforeEach(function () {
      homeState = $state.get('home');
    });

    it('should have a pagesList state', function () {
      expect(homeState).toBeDefined();
    });

    it('should have a parent', function () {
      expect(homeState.parent).toEqual('nav');
    });

    it('should have the url set to /home', function () {
      expect(homeState.url).toEqual('/home');
    });

    it('should have a template url set', function () {
      expect(homeState.views['nav-child-content'].templateUrl).toEqual('../../../../modules/core/client/views/home.view.client.html');
    });

    it('should have a controller set', function () {
      expect(homeState.views['nav-child-content'].controller).toEqual('HomeController');
    });

    it('should have a controllerAs set', function () {
      expect(homeState.views['nav-child-content'].controllerAs).toEqual('vm');
    });

  });

});
