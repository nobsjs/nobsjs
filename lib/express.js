'use strict';

var express = require('express');
var path = require('path');
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', true);

swig.setDefaults({
  cache: false
});

require(path.resolve('./modules/core/server/routes/core.routes.server.js'))(app);


module.exports = app;
