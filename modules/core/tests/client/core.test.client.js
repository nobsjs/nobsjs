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
