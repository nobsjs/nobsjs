'use strict';

var bodyParser = require('body-parser');
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

app.use(bodyParser.json());

app.use('/public', express.static(path.resolve('./public')));
app.use('/modules', express.static(path.resolve('./modules')));

//force redirect of http to https if config.secure is true. Defaults to false for ease of testing
if (config.secure) {
  var ensureSecure = function (req, res, next){
    if(req.secure){
      // OK, continue
      return next();
    }
    console.log('redirecting');
    res.redirect('https://'+req.hostname+':'+config.httpsPort+req.url); // handle port numbers if non 443
  };

  app.all('*', ensureSecure);

}


// Load Each of the Server Side Routes
_.each(config.files.server.routes, function (route) {
  require(path.resolve(route))(app);
});

module.exports = app;
