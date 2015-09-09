'use strict';

var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var swig = require('swig');

var config = require('./config');

var app = express();

app.locals = config.locals;
app.locals.files = config.files.client;
if(process.env.NODE_ENV === 'production') {
  app.locals.files.js = ['public/dist/application.min.js'];
}

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', true);

swig.setDefaults({
  cache: false
});

app.use(bodyParser.json());

app.use('/public', express.static(path.resolve('./public')));
app.use('/modules', express.static(path.resolve('./modules')));

//force redirect of http to https if config.secure is true. Defaults to false for ease of testing
if (config.secure) {
  app.all('*', ensureSecure);
}


// Load Each of the Server Side Routes
_.each(config.files.server.routes, function (route) {
  require(path.resolve(route))(app);
});

module.exports = app;

//////////

function ensureSecure (req, res, next){
  if(req.secure){
    // OK, continue
    return next();
  }
  res.redirect('https://'+req.hostname+':'+config.securePort+req.url); // handle port numbers if non 443
}
