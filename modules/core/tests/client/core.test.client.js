'use strict';

describe('Basic Client Side Tests', function () {
  it('should pass a basic truth test', function () {
    expect(true).toEqual(true);
  });
});

//tests the Home controller
describe('HomeController', function() {
  beforeEach(module('tropicalbs'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.content', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('HomeCtrl', { $scope: $scope });
   });

    it('should have content', function() {
      expect($scope.content).not.toBeUndefined();
      expect($scope.content).toEqual('here is some content');
    });
  });
});



