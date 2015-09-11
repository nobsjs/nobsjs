'use strict';

// tests the Home controller
describe('HomeController', function () {

  beforeEach(module('nobsjs'));

  var homeController;

  beforeEach(inject(function ($controller) {
    homeController = $controller('HomeController');
  }));

  it('should have content', function () {
    expect(homeController.content).not.toBeUndefined();
    // this will break once hardcoded content goes away. leaving it for now as it proves that the test is
    // able to access the content object on the controller
    expect(homeController.content).toBe('this is some controller generated content');
  });
});
