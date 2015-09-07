'use strict';

describe('PagesController', function () {

  var $controller, $state, pagesService, createController, vm;

  beforeEach(function () {

    module('tropicalbs');

    inject(function ($injector) {
      $controller = $injector.get('$controller');
      $state = $injector.get('$state');
      pagesService = $injector.get('pagesService');
    });

    createController = function () {
      return $controller('PagesController', {
        $state: $state,
        pagesService: pagesService
      });
    };
    vm = createController();
  });


  it('should exist', function () {
    expect(vm).toBeDefined();
  });

  xit('should have a title', function () {
    expect(vm.title).toBeDefined();
  });

  xit('title should be a string', function () {
    expect(typeof vm.title).toEqual('string');
  });

  xit('should have content', function () {
    expect(vm.content).toBeDefined();
  });

  xit('content should be a string', function () {
    expect(typeof vm.content).toEqual('string');
  });

});
