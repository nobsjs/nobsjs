'use strict';

// tests the admin controller
describe('AdminController', function () {

  beforeEach(module('nobsjs'));

  var adminController;

  beforeEach(inject(function ($controller) {
    adminController = $controller('AdminController');
  }));

  it('should exist', function () {
    expect(adminController).not.toBeUndefined();
  });

});
