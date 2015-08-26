'use strict';

var _ = require('lodash');
var util = require('./util.js');

var config = _.merge(require('./env/default.js'), require('./env/local.js'));

config.files = {};

config.files.clientLibJs = util.getFiles(config.assets.lib);
console.log('CONFIG', config);

module.exports = config;
