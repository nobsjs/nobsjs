'use strict';

describe('PagesController', function () {

  var pagesController;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($controller) {
    pagesController = $controller('PagesController');
  }));

  it('should exist', function () {
    expect(pagesController).not.toBeUndefined();
  });
});
