'use strict';

describe('Pages Admin Routes', function () {
  var $state;

  beforeEach(module('nobsjs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  describe('Pages create',function () {

    var createState;

    beforeEach(function () {
      createState = $state.get('pagesCreate');
    });

    it('should have a pagesCreate state', function () {
      expect(createState).toBeDefined();
    });

    it('should have the url set to /pages/create', function () {
      expect(createState.url).toEqual('/pages/create');
    });

    it('should have a "nav-child-content view"', function () {
      expect(createState.views['nav-child-content']).toBeDefined();
    });

    it('should load the HTML', function () {
       expect(createState.views['nav-child-content'].templateUrl).toEqual('../../../../modules/core/client/views/page-admin.view.client.html');
     });

    it('should have a controller', function () {
      expect(createState.views['nav-child-content'].controller).toEqual('PagesAdminController');
    });

    it('should have a controllerAs', function () {
      expect(createState.views['nav-child-content'].controllerAs).toEqual('vm');
    });
  });

  describe('Pages Edit',function () {

    var editState;

    beforeEach(function () {
      editState = $state.get('pagesEdit');
    });

    it('should have a pagesEdit state', function () {
      expect(editState).toBeDefined();
    });

    it('should have the url set to /pages/edit/:pageId', function () {
      expect(editState.url).toEqual('/pages/edit/:pageId');
    });

    it('should respond to URL if you pass a pageId', function () {
       expect($state.href('pagesEdit', { pageId: 1 })).toEqual('#/pages/edit/1');
     });

    it('should have a "nav-child-content view"', function () {
      expect(editState.views['nav-child-content']).toBeDefined();
    });

    it('should load the HTML', function () {
       expect(editState.views['nav-child-content'].templateUrl).toEqual('../../../../modules/core/client/views/page-admin.view.client.html');
     });

    it('should have a controller', function () {
      expect(editState.views['nav-child-content'].controller).toEqual('PagesAdminController');
    });

    it('should have a controllerAs', function () {
      expect(editState.views['nav-child-content'].controllerAs).toEqual('vm');
    });
  });
});
