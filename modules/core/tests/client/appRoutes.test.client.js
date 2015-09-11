'use strict';

describe('App Routes', function () {
  var $state;

  beforeEach(module('nobsjs'));

  beforeEach(inject(function ($injector) {
    $state = $injector.get('$state');
  }));

  describe('App State', function () {

    var appState;

    beforeEach(function () {
      appState = $state.get('app');
    });

    it('should have a pagesList state', function () {
      expect(appState).toBeDefined();
    });

    it('should have a parent', function () {
      expect(appState.abstract).toEqual(true);
    });

    it('should have a templateUrl', function () {
      expect(appState.templateUrl).toEqual('../../../../modules/core/client/views/app.view.client.html');
    });

  });

});
