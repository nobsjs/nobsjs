'use strict';

var path = require('path');

describe('Config lib', function () {

  var config = require(path.resolve('./lib/config.js'));

  it('should be an object', function () {
    expect(typeof config).toEqual('object');
  });

  it('should have a port defined', function () {
    expect(config.port).toEqual(jasmine.anything());
  });

  it('port should be a number', function () {
    expect(typeof config.port).toEqual('number');
  });

  it('should have a securePort defined', function () {
    expect(config.securePort).toEqual(jasmine.anything());
  });

  it('securePort should be a number', function () {
    expect(typeof config.securePort).toEqual('number');
  });

  it('should have an enviorment string', function () {
    expect(typeof config.env).toEqual('string');
  });

  it('should have a secret string', function () {
    expect(typeof config.secret).toEqual('string');
  });

  it('should have a secure boolean', function () {
    expect(typeof config.secure).toEqual('boolean');
  });

  describe('ssl', function () {

    it('should have a ssl object', function () {
      expect(typeof config.ssl).toEqual('object');
    });

    it('should have a key value', function () {
      expect(typeof config.ssl.key).toEqual('string');
    });

    it('should have a cert value', function () {
      expect(typeof config.ssl.cert).toEqual('string');
    });

  });

  it('should have a force boolean', function () {
    expect(typeof config.force).toEqual('boolean');
  });

  describe('database', function () {

    it('should have a database object', function () {
      expect(typeof config.database).toEqual('object');
    });

    it('should have a database.database string', function () {
      expect(typeof config.database.database).toEqual('string');
    });

    it('should have a database.host string', function () {
      expect(typeof config.database.host).toEqual('string');
    });

    it('should have a database.username string', function () {
      expect(typeof config.database.username).toEqual('string');
    });

    it('should have a database.password string', function () {
      expect(typeof config.database.password).toEqual('string');
    });

    it('should have a database.dialect string', function () {
      expect(typeof config.database.dialect).toEqual('string');
    });

    it('should have a valid database.dialect', function () {
      var validDialects = ['mysql', 'postgres'];
      expect(validDialects.indexOf(config.database.dialect)).not.toEqual(-1);
    });

  });

  describe('databaseTest', function () {

    it('should have a database object', function () {
      expect(typeof config.databaseTest).toEqual('object');
    });

    it('should have a databaseTest.database string', function () {
      expect(typeof config.databaseTest.database).toEqual('string');
    });

    it('should have a databaseTest.host string', function () {
      expect(typeof config.databaseTest.host).toEqual('string');
    });

    it('should have a databaseTest.username string', function () {
      expect(typeof config.databaseTest.username).toEqual('string');
    });

    it('should have a databaseTest.password string', function () {
      expect(typeof config.databaseTest.password).toEqual('string');
    });

    it('should have a databaseTest.dialect string', function () {
      expect(typeof config.databaseTest.dialect).toEqual('string');
    });

    it('should have a valid databaseTest.dialect', function () {
      var validDialects = ['mysql', 'postgres'];
      expect(validDialects.indexOf(config.databaseTest.dialect)).not.toEqual(-1);
    });

  });

  describe('db', function () {

    it('should have a db object', function () {
      expect(typeof config.db).toEqual('object');
    });

    it('should equal the databaseTest object', function () {
      expect(config.db).toEqual(config.databaseTest);
    });

  });

  describe('assets', function () {

    it('should have an assets object', function () {
      expect(typeof config.assets).toEqual('object');
    });

    it('should have a client object', function () {
      expect(typeof config.assets.client).toEqual('object');
    });

    it('should have a client.lib object', function () {
      expect(typeof config.assets.client.lib).toEqual('object');
    });

    it('should have a client.js array', function () {
      expect(Array.isArray(config.assets.client.js)).toEqual(true);
    });

    it('should have a client.css array', function () {
      expect(Array.isArray(config.assets.client.css)).toEqual(true);
    });

    it('should have a client.tests array', function () {
      expect(Array.isArray(config.assets.client.tests)).toEqual(true);
    });

    it('should have a server object', function () {
      expect(typeof config.assets.server).toEqual('object');
    });

    it('should have a server.models array', function () {
      expect(Array.isArray(config.assets.server.models)).toEqual(true);
    });

    it('should have a server.routes array', function () {
      expect(Array.isArray(config.assets.server.routes)).toEqual(true);
    });

    it('should have a server.tests array', function () {
      expect(Array.isArray(config.assets.server.tests)).toEqual(true);
    });

  });

  describe('log', function () {

    it('should have a log object', function () {
      expect(typeof config.log).toEqual('object');
    });

    xit('should have a log.db boolean', function () {
      expect(typeof config.log.db).toEqual('boolean');
    });

  });

  describe('locals', function () {

    it('should have a locals object', function () {
      expect(typeof config.locals).toEqual('object');
    });

    it('should have a title string', function () {
      expect(typeof config.locals.title).toEqual('string');
    });

  });

  describe('files', function () {

    it('should have a files object', function () {
      expect(typeof config.files).toEqual('object');
    });

    it('should have a client object', function () {
      expect(typeof config.files.client).toEqual('object');
    });

    it('should have a client.lib object', function () {
      expect(typeof config.files.client.lib).toEqual('object');
    });

    it('should have a client.lib.js array', function () {
      expect(Array.isArray(config.files.client.lib.js)).toEqual(true);
    });

    it('should have a client.lib.css array', function () {
      expect(Array.isArray(config.files.client.lib.css)).toEqual(true);
    });

    it('should have a client.js array', function () {
      expect(Array.isArray(config.files.client.js)).toEqual(true);
    });

    it('should have a client.css array', function () {
      expect(Array.isArray(config.files.client.css)).toEqual(true);
    });

    it('should have a client.tests array', function () {
      expect(Array.isArray(config.files.client.tests)).toEqual(true);
    });

    it('should have a server object', function () {
      expect(typeof config.files.server).toEqual('object');
    });

    it('should have a karma array', function () {
      expect(Array.isArray(config.files.karma)).toEqual(true);
    });

  });

  describe('locals', function () {

    it('should have locals object', function () {
      expect(typeof config.locals).toEqual('object');
    });

    it('should have a locals.title string', function () {
      expect(typeof config.locals.title).toEqual('string');
    });

  });

});
