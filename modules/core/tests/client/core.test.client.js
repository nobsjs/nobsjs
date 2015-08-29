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
describe('Users (Auth) Controller', function () {
  var $rootScope, $location, $window, $httpBackend, $scope, Auth, $controller, createController;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $controller = $injector.get('$controller');

    createController = function () {
      return $controller('UsersController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Auth: Auth
      });
    };

    createController();
  }));

  describe('Auth', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('UsersController', { $scope: $scope });
      spyOn($scope, 'login');
    });

    it('should have a login method', function () {
      expect($scope.login).to.be.ok();
    });

    it('should have a signup method', function () {
      expect($scope.signup).to.be.ok();
    });

    it('should call login() when login form is submitted', function () {

    });

  });
});

/**********************************************************************************
'use strict';

describe('Auth Controller', function () {
  var $rootScope, $location, $window, $httpBackend, $scope, Auth, $controller, createController;

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.removeItem('battlepro');
  });

  it('should have an signin method', function () {
    expect($scope.signin).to.be.ok();
  });

  it('should store token in localStorage after signin', function() {
    // create a fake JWT for auth
    var token = 'sjj232hwjhr3urw90rof';
    $httpBackend.expectPOST('/api/users/signin').respond({token: token});
    $scope.signin();
    $httpBackend.flush();
    expect($window.localStorage.getItem('battlepro')).to.be(token);
  });

  it('should have a sgnup method', function () {
    expect($scope.signup).to.be.ok();
  });

  it('should store token in localStorage after signup', function() {
    // create a fake JWT for auth
    var token = 'sjj232hwjhr3urw90rof';

    // make a 'fake' reques to the server, not really going to our server
    $httpBackend.expectPOST('/api/users/signup').respond({token: token});
    $scope.signup();
    $httpBackend.flush();
    expect($window.localStorage.getItem('battlepro')).to.be(token);
  });

  it('should have a logout method', function () {
    expect($scope.logout).to.be.ok();
  });

  it('should remove the token from localstorage', function () {
    var token = 'sjj232hwjhr3urw90rof';

    // make a 'fake' reques to the server, not really going to our server
    $httpBackend.expectPOST('/api/users/signout').respond({token: token});
    $scope.logout();
    $httpBackend.flush();
    expect($window.localStorage.getItem('battlepro')).to.equal(null);
  });

  it('should have a user object', function () {
    expect($scope.user).to.be.a('object');
  });

});
