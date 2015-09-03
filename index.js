'use strict';

var clog = require('c.log');
var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');

var app = require('./lib/express');
var config = require('./lib/config');
var db = require('./lib/db');

db.sequelize.sync({force: config.force})
  .then(startServer)
  .catch(logError);

//////////

function logError(err) {
  clog.red(err);
}

function startServer() {
  http.createServer(app).listen(config.port);
  clog.green('Listening for http on port ' + config.port);

  if(config.secure) {
    var options = {
      key: fs.readFileSync(path.resolve(config.ssl.key)),
      cert: fs.readFileSync(path.resolve(config.ssl.cert))
    };
    https.createServer(options, app).listen(config.securePort);
    clog.green('Listening for https on port ' + config.securePort);
  }
}
