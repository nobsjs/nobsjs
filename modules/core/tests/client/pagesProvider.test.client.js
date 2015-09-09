'use strict';

describe('provider pageStateManager', function () {
  var $stateProvider, pageStateManager;

  beforeEach(function () {

    module('tropicalbs');

    inject(function ($injector) {
      pageStateManager = $injector.get('pageStateManager');
      $stateProvider = $injector.get('$stateProvider');
    });

  });
  // TODO: tests
});
