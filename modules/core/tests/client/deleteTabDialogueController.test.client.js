'use strict';

describe('DeleteTabDialogueController', function () {

  var createController, createTab, tab, tabsService, vm, $controller;

  beforeEach(function () {

    module('nobsjs');

    inject(function ($injector) {
      $controller = $injector.get('$controller');
      tabsService = $injector.get('tabsService');
    });

    createController = function () {
      var tab = createTab();
      return $controller('DeleteTabDialogueController', {
        tabsService: tabsService,
        tab: tab
      });
    };

    createTab = function () {
      var tab = {
        title: 'someTitle',
        id: 1,
        uisref: 'uisref',
        visibleRoles: ['owner', 'admin']
      };

      return tab;
    };

    vm = createController();
    tab = createTab();
  });

  it('DeleteTabDialogueController should exist', function () {
    expect(vm).toBeDefined();
  });

  describe('view model', function () {

    it('vm should have a cancel property', function () {
      expect(vm.cancel).toBeDefined();
    });

    it('vm should have a hide property', function () {
      expect(vm.hide).toBeDefined();
    });

    it('vm should have a saveAction property', function () {
      expect(vm.saveAction).toBeDefined();
    });

    it('vm should have a tab property', function () {
      expect(vm.tab).toBeDefined();
    });

    it('vm should have a title property', function () {
      expect(vm.title).toBeDefined();
    });

  });

  describe('cancel', function () {

    it('cancel should be a function', function () {
      expect(typeof vm.cancel).toEqual('function');
    });

  });

  describe('hide', function () {

    it('hide should be a function', function () {
      expect(typeof vm.hide).toEqual('function');
    });

  });

  describe('tab', function () {

    it('tab should be an object', function () {
      expect(typeof vm.tab).toEqual('object');
    });

    it('tab should equal the passed in tab', function () {
      expect(vm.tab).toEqual(tab);
    });

  });

  describe('saveAction', function () {

    it('saveAction should be a function', function () {
      expect(typeof vm.saveAction).toEqual('function');
    });

  });

});
