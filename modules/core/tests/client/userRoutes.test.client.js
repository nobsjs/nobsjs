'use strict';

describe('User Routes', function () {
  var $state;

  beforeEach(module('tropicalbs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  describe('Login State', function () {

    var loginState;

    beforeEach(function () {
      loginState = $state.get('login');
    });

    it('should have a login state', function () {
      expect(loginState).toBeDefined();
    });

    it('should have the url set to /login', function () {
      expect(loginState.url).toEqual('/login');
    });

    it('should have a template url set', function () {
      expect(loginState.templateUrl).toEqual('../../../../modules/core/client/views/login.view.client.html');
    });

    it('should have a controller set', function () {
      expect(loginState.controller).toEqual('UsersController');
    });

    it('should have a controllerAs set', function () {
      expect(loginState.controllerAs).toEqual('vm');
    });

  });

  describe('Signup State', function () {

    var signupState;

    beforeEach(function () {
      signupState = $state.get('signup');
    });

    it('should have a signup state', function () {
      expect(signupState).toBeDefined();
    });

    it('should have the url set to /signup', function () {
      expect(signupState.url).toEqual('/signup');
    });

    it('should have a template url set', function () {
      expect(signupState.templateUrl).toEqual('../../../../modules/core/client/views/signup.view.client.html');
    });

    it('should have a controller set', function () {
      expect(signupState.controller).toEqual('UsersController');
    });

    it('should have a controllerAs set', function () {
      expect(signupState.controllerAs).toEqual('vm');
    });

  });

});
