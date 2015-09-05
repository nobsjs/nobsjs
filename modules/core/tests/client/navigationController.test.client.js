'use strict';

describe('NavigationController', function () {

  var navigationController, state;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($controller, $state) {
    navigationController = $controller('NavigationController');
    state = $state;
  }));

  it('should exist', function () {
    expect(navigationController).not.toBeUndefined();
  });
});
