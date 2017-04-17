'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var util = require('./util.js');

var localConfig = {};

if(fs.existsSync(path.resolve('./lib/env/local.js'))) {
  localConfig = require(path.resolve('./lib/env/local.js'));
}

var config = _.merge(require(path.resolve('./lib/env/default.js')), localConfig);

if(config.env === 'test') {
  config.db = config.databaseTest;
  config.force = true;
} else {
  config.db = config.database;
}

config.files = {
  client: {
    lib: {
      js: util.getFiles(config.assets.client.lib.js),
      css: util.getFiles(config.assets.client.lib.css)
    },
    css: util.getFiles(config.assets.client.css),
    js: util.getFiles(config.assets.client.js),
    tests: util.getFiles(config.assets.client.tests)
  },
  server: {
    models: util.getFiles(config.assets.server.models),
    routes: util.getFiles(config.assets.server.routes),
    tests: util.getFiles(config.assets.server.tests)
  }
};

config.files.karma = [];
config.files.karma = config.files.karma.concat(config.files.client.lib.js);
config.files.karma = config.files.karma.concat(config.files.client.js);
config.files.karma = config.files.karma.concat(config.files.client.tests);

module.exports = config;
