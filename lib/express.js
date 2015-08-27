'use strict';

var config = require('./config');
var express = require('express');
var _ = require('lodash');
var path = require('path');
var swig = require('swig');

var app = express();

app.locals = config.locals;
app.locals.files = config.files.client;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', true);

swig.setDefaults({
  cache: false
});

app.use('/public', express.static(path.resolve('./public')));
app.use('/modules', express.static(path.resolve('./modules')));

//load models and sync database

_.forEach(config.files.server.models, function (model) {
  console.log('model', model);
  require(path.resolve('./' + model));
});


// Load Each of the Server Side Routes
_.each(config.files.server.routes, function (route) {
  require(path.resolve(route))(app);
});

module.exports = app;
