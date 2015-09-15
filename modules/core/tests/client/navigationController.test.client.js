/* globals spyOn */
'use strict';

describe('NavigationController', function () {

  var $state, authService, navService, userService, vm, createController, $controller;

  beforeEach(function () {

    module('nobsjs');

    inject(function ($injector) {
      $controller = $injector.get('$controller');
      $state = $injector.get('$state');
      authService = $injector.get('authService');
      navService = $injector.get('navService');
      userService = $injector.get('userService');
    });

    createController = function () {
      return $controller('NavigationController', {
        $state: $state,
        authService: authService,
        navService: navService,
        userService: userService
      });
    };
    vm = createController();
  });

  it('NavigationController should exist', function () {
    expect(vm).toBeDefined();
  });

  describe('view model', function () {

    it('vm should have a state property', function () {
      expect(vm.state).toBeDefined();
    });

    it('vm should have a tabs property', function () {
      expect(vm.tabs).toBeDefined();
    });

    it('vm should have a user property', function () {
      expect(vm.user).toBeDefined();
    });

    it('vm should have a users property', function () {
      expect(vm.users).toBeDefined();
    });

    it('vm should have a login property', function () {
      expect(vm.login).toBeDefined();
    });

    it('vm should have a signup property', function () {
      expect(vm.signup).toBeDefined();
    });

    it('vm should have a openAdminSidenav property', function () {
      expect(vm.openAdminSidenav).toBeDefined();
    });

    it('vm should have a userIsAdmin property', function () {
      expect(vm.userIsAdmin).toBeDefined();
    });

  });

  describe('tabs', function () {

    it('tabs should be an array', function () {
      expect(Array.isArray(vm.tabs)).toBe(true);
    });

  });

  describe('login', function () {

    it('login should be a function', function () {
      expect(typeof vm.login).toEqual('function');
    });

    it('should move to the login page after launching login', function () {
      spyOn($state, 'go');
      vm.login();
      expect($state.go).toHaveBeenCalledWith('login');
    });

  });

  describe('logout', function () {

    it('logout should be a function', function () {
      expect(typeof vm.logout).toEqual('function');
    });

  });

  describe('signup', function () {

    it('signup should be a function', function () {
      expect(typeof vm.signup).toEqual('function');
    });

    it('should move to the signup page after launching signup', function () {
      spyOn($state, 'go');
      vm.signup();
      expect($state.go).toHaveBeenCalledWith('signup');
    });

  });

  describe('user', function () {

    it('user should be a function', function () {
      expect(typeof vm.user).toEqual('object');
    });

    it('user should have an email property', function () {
      expect(vm.user.email).toBeDefined();
    });

    it('user should have roles', function () {
      expect(vm.user.roles).toBeDefined();
    });

    it('roles should be an array', function () {
      expect(Array.isArray(vm.user.roles)).toBe(true);
    });

  });

  describe('side nav', function () {

    it('users function should change state to users', function () {
      spyOn($state, 'go');
      vm.users();
      expect($state.go).toHaveBeenCalledWith('users');
    });

  });
});
