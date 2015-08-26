'use strict';

var path = require('path');

describe('Config lib', function () {

  var config = require(path.resolve('./lib/config.js'));
  it('should be an object', function () {
    expect(typeof config).toEqual('object');
  });
  
  it('should have a port key', function () {
    expect(config.port).toEqual(jasmine.anything());
    expect(typeof config.port).toEqual('number');
  });



});
