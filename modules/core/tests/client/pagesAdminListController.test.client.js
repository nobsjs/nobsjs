/* globals spyOn */
'use strict';

describe('Pages Admin Controller', function () {

  var $controller, $state, createController, vm, pagesService;

  beforeEach(module('nobsjs'));

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $state = $injector.get('$state');
    pagesService = $injector.get('pagesService');

    spyOn($state, 'go');

    createController = function () {
      return $controller('PagesAdminListController', {
        $state: $state,
        pagesService: pagesService
      });
    };

    vm = createController();

  }));

  it('should be defined', function () {
    expect(vm).not.toBeUndefined();
  });

  it('should have a gotoCreatePage function', function () {
    expect(typeof vm.gotoCreatePage).toEqual('function');
  });

  it('should have a gotoPage function', function () {
    expect(typeof vm.gotoPage).toEqual('function');
  });

  it('should have a gotoEditPage function', function () {
    expect(typeof vm.gotoEditPage).toEqual('function');
  });

  it('should change to the pagesCreate state', function () {
    vm.gotoCreatePage();
    expect($state.go).toHaveBeenCalledWith('pagesCreate');
  });

  it('should change to the pagesEdit state', function () {
    vm.gotoEditPage(1);
    expect($state.go).toHaveBeenCalledWith('pagesEdit', {pageId: 1});
  });

  it('should change to the page view state', function () {
    vm.gotoPage('/test');
    expect($state.go).toHaveBeenCalledWith('test');
  });

});
