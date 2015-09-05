'use strict';

describe('Pages Admin List Routes', function () {
  var $state;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  describe('pagesList State', function () {

    var pagesListState;

    beforeEach(function () {
      pagesListState = $state.get('pagesList');
    });

    it('should have a pagesList state', function () {
      expect(pagesListState).toBeDefined();
    });

    it('should have the url set to /pages', function () {
      expect(pagesListState.url).toEqual('/pages');
    });

    it('should have a template url set', function () {
      expect(pagesListState.views['nav-child-content'].templateUrl).toEqual('../../../../modules/core/client/views/page-admin-list.view.client.html');
    });

    it('should have a controller set', function () {
      expect(pagesListState.views['nav-child-content'].controller).toEqual('PagesAdminListController');
    });

    it('should have a controllerAs set', function () {
      expect(pagesListState.views['nav-child-content'].controllerAs).toEqual('vm');
    });

  });

});
