'use strict';

describe('Basic Client Side Tests', function () {
  it('should pass a basic truth test', function () {
    expect(true).toEqual(true);
  });
});

//tests the App controller
describe('AppController', function () {

  beforeEach(module('tropicalbs'));
  var $controller;
  beforeEach(inject(function (_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('AppController', { $scope: $scope });
   });
    it('should have scope', function () {
      expect($scope).not.toBeUndefined();
    });
  });
});

//tests the Home controller
describe('HomeController', function () {
  beforeEach(module('tropicalbs'));
  var $controller;
  beforeEach(inject(function (_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.content', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('HomeController', { $scope: $scope });
   });

    it('should have content', function () {
      expect($scope.content).not.toBeUndefined();
    });
  });
});

//tests the User controller
describe('Users Controller & Auth Service', function () {
  var $rootScope, $location, $window, $httpBackend, $scope, Auth, $controller, createController, $cookies;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $window = $injector.get('$window');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    Auth = $injector.get('Auth');
    $cookies = $injector.get('$cookies');

    $controller = $injector.get('$controller');

    createController = function () {
      return $controller('UsersController', {
        $scope: $scope,
        $window: $window,
        Auth: Auth
      });
    };

    createController();
  }));

  describe('Users Controller', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('UsersController', { $scope: $scope });
      // spyOn($scope, 'login');
    });

    it('should have a $scope', function () {
      expect($scope).toBeDefined();
    });

    it('should have a login method', function () {
      expect($scope.login).toBeDefined();
    });

    it('should have a signup method', function () {
      expect($scope.signup).toBeDefined();
    });

    it('should be able to set email and password', function () {
      var email = 'user@gmail.com';
      var password = 'derp1234';
      $scope.user.email = email;
      $scope.user.password = password;
      expect($scope.user.email).toEqual('user@gmail.com');
      expect($scope.user.password).toEqual('derp1234');
    });

    it('should store token in a secure userToken cookie after signup', function() {
      // create a fake JWT for auth
      var token = 'sjj232hwjhr3urw90rof';
      $httpBackend.expectPOST('api/core/users/signup').respond({token: token});
      $scope.signup({email: 'email@gmail.com', password: 'derp1234'});
      $httpBackend.flush();
      expect($cookies.get('userToken')).toEqual(token);
    });

  });

  describe('Auth Service', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('UsersController', { $scope: $scope, Auth: Auth });
      // spyOn($scope, 'login');
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $window.localStorage.removeItem('userToken');
    });

    it('should have a login function', function() {
      expect(Auth.login).toBeDefined();
    });

    //These tests are not working. there is a promise issue with $httpBackend
    //Auth functionality is tested under the users controller tests
    xit('should store token in localStorage after successful login', function() {
      // create a fake JWT for auth
      var token = 'sjj232hwjhr3urw90rof';
      $httpBackend.expectPOST('api/core/users/login').respond({token: token});
      Auth.login({email: 'email@gmail.com', password: 'derp1234'});
      $httpBackend.flush();
    });

    //These tests are not working. there is a promise issue with $httpBackend
    //Auth functionality is tested under the users controller tests
    xit('should not set token in localStorage on unsuccessful request', function() {

      $httpBackend.expectPOST('api/core/users/login').respond({status: 400});
      Auth.login({email: 'email@gmail.com', password: 'derp1234'});
      $httpBackend.flush();
      expect($window.localStorage.getItem('userToken')).toBeUndefined();
    });

  });
});

describe('PagesController', function () {
  beforeEach(module('tropicalbs'));
  var $controller;
  beforeEach(inject(function (_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('PagesController', { $scope: $scope });
   });

    it('should have a controller', function () {
      expect($controller).not.toBeUndefined();
    });

    it('should have scope', function () {
      expect($scope).not.toBeUndefined();
    });
  });
});
