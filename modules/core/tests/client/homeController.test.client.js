'use strict';

// tests the Home controller
describe('HomeController', function () {

  beforeEach(module('tropicalbs'));

  var HomeController;

  beforeEach(inject(function ($controller) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    HomeController = $controller('HomeController');
  }));

  it('should have content', function () {
    expect(HomeController.content).not.toBeUndefined();
    // this will break once hardcoded content goes away. leaving it for now as it proves that the test is
    // able to access the content object on the controller
    expect(HomeController.content).toBe('this is some controller generated content');
  });
});
