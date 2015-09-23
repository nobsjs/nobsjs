'use strict';

// tests the User controller
describe('Users Controller & Auth Service', function () {
  var $rootScope, $location, $window, $httpBackend, authService, $controller, createController, $cookies;

  beforeEach(module('nobsjs'));

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $window = $injector.get('$window');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    authService = $injector.get('authService');
    $cookies = $injector.get('$cookies');

    $controller = $injector.get('$controller');

    createController = function () {
      return $controller('UsersController', {
        $window: $window,
        authService: authService
      });
    };

    createController();
  }));

  describe('Users Controller', function () {
    var $scope, controller, vm;

    beforeEach(function () {
      $scope = {};
      controller = $controller('UsersController', { $scope: $scope });
      vm = controller;
      // spyOn($scope, 'login');
    });

    it('should have a $scope', function () {
      expect(vm).toBeDefined();
    });

    it('should have a login method', function () {
      expect(vm.login).toBeDefined();
    });

    it('should have a signup method', function () {
      expect(vm.signup).toBeDefined();
    });

    it('should be able to set email and password', function () {
      var email = 'user@gmail.com';
      var password = 'derp1234';
      vm.user.email = email;
      vm.user.password = password;
      expect(vm.user.email).toEqual('user@gmail.com');
      expect(vm.user.password).toEqual('derp1234');
    });

    // this test needs to be moved to the Auth Service and refactored to accept $state.go
    it('should store token in a secure userToken cookie after signup', function () {
      // create a fake JWT for auth
      var token = 'sjj232hwjhr3urw90rof';
      $httpBackend.expectPOST('api/core/users/signup').respond({token: token});
      vm.signup({email: 'email@gmail.com', password: 'derp1234'});
      $httpBackend.flush();
      expect($cookies.get('userToken')).toEqual(token);
    });

  });

  describe('Auth Service', function () {
    var controller;

    beforeEach(function () {
      controller = $controller('UsersController', { authService: authService });
      // spyOn($scope, 'login');
    });

    afterEach(function () {
      $window.localStorage.removeItem('userToken');
    });

    it('should have a login function', function () {
      expect(authService.login).toBeDefined();
    });

  });
});
