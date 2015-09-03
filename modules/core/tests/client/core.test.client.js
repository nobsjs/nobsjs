'use strict';

describe('Basic Client Side Tests', function () {
  it('should pass a basic truth test', function () {
    expect(true).toEqual(true);
  });
});

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

// tests the User controller
describe('Users Controller & Auth Service', function () {
  var $rootScope, $location, $window, $httpBackend, authService, $controller, createController, $cookies;

  beforeEach(module('tropicalbs'));

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
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $window.localStorage.removeItem('userToken');
    });

    it('should have a login function', function () {
      expect(authService.login).toBeDefined();
    });

    // These tests are not working. there is a promise issue with $httpBackend
    // Auth functionality is tested under the users controller tests
    xit('should store token in localStorage after successful login', function () {
      // create a fake JWT for auth
      var token = 'sjj232hwjhr3urw90rof';
      $httpBackend.expectPOST('api/core/users/login').respond({token: token});
      authService.login({email: 'email@gmail.com', password: 'derp1234'});
      $httpBackend.flush();
    });

    // These tests are not working. there is a promise issue with $httpBackend
    // Auth functionality is tested under the users controller tests
    xit('should not set token in localStorage on unsuccessful request', function () {

      $httpBackend.expectPOST('api/core/users/login').respond({status: 400});
      authService.login({email: 'email@gmail.com', password: 'derp1234'});
      $httpBackend.flush();
      expect($window.localStorage.getItem('userToken')).toBeUndefined();
    });

  });
});

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
