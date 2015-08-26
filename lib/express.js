'use strict';

var express = require('express');
var path = require('path');

var app = express();

require(path.resolve('./modules/core/server/routes/core.routes.server.js'))(app);

module.exports = app;
