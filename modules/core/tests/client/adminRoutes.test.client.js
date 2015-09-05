'use strict';

describe('Admin Routes', function () {
  var $state;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  describe('admin State', function () {

    var adminState;

    beforeEach(function () {
      adminState = $state.get('admin');
    });

    it('should have a pagesList state', function () {
      expect(adminState).toBeDefined();
    });

    it('should have a parent', function () {
      expect(adminState.parent).toEqual('nav');
    });

    it('should have the url set to /admin', function () {
      expect(adminState.url).toEqual('/admin');
    });

    it('should have a template url set', function () {
      expect(adminState.views['nav-child-content'].templateUrl).toEqual('../../../../modules/core/client/views/admin.view.client.html');
    });

    it('should have a controller set', function () {
      expect(adminState.views['nav-child-content'].controller).toEqual('AdminController');
    });

    it('should have a controllerAs set', function () {
      expect(adminState.views['nav-child-content'].controllerAs).toEqual('vm');
    });

  });

});
