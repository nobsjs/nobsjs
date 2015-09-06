'use strict';

describe('nav Service', function () {
  var $http, $location, $window, $httpBackend, navService, tabsObject;

  beforeEach(function () {

    module('tropicalbs');

    inject(function ($injector) {
      $http = $injector.get('$http');
      $location = $injector.get('$location');
      $window = $injector.get('$window');
      $httpBackend = $injector.get('$httpBackend');
      navService = $injector.get('navService');
    });

    tabsObject = [{
        title: 'title',
        uisref: 'state',
        visibleRoles: ['admin', 'owner', 'user', 'public']
      }, {
        title: 'title2',
        uisref: 'state2',
        visibleRoles: ['admin', 'owner', 'user', 'public']
      }];
  });

  describe('Get Tabs', function () {
    it('should have a getTabs function', function () {
      expect(typeof navService.getTabs).toEqual('function');
    });
  });

  describe('Refresh Tabs', function () {
    it('should have a refreshTabs function', function () {
      expect(typeof navService.refreshTabs).toEqual('function');
    });

    it('should be able to refresh the tabs', function () {
      $httpBackend.expectPOST('/api/core/tabs').respond(tabsObject);
      navService.refreshTabs(tabsObject).then(function (res) {
        expect(res).toEqual(tabsObject);
      });
    });
  });
});
