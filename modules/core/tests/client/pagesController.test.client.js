'use strict';

describe('PagesController', function () {

  var PagesController;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($controller) {
    PagesController = $controller('PagesController');
  }));

  it('should exist', function () {
    expect(PagesController).not.toBeUndefined();
  });
});
