'use strict';

describe('PagesAdminController', function () {

  var pagesAdminController;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($controller) {
    pagesAdminController = $controller('PagesAdminController');
  }));   

  it('should exist', function () {
    expect(pagesAdminController).not.toBeUndefined();
  });

  it('should have a createPage function', function () {
    expect(typeof pagesAdminController.createPage).toEqual('function');
  });

  it('should have a deletePage function', function () {
    expect(typeof pagesAdminController.deletePage).toEqual('function');
  });

  it('should have a mode string', function () {
    expect(typeof pagesAdminController.mode).toEqual('string');
  });

  it('should have a page object', function () {
    expect(typeof pagesAdminController.page).toEqual('object');
  });

  it('should have a viewTitle string', function () {
    expect(typeof pagesAdminController.viewTitle).toEqual('string');
  });

  it('should have an updatePage function', function () {
    expect(typeof pagesAdminController.updatePage).toEqual('function');
  });

});
