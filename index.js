'use strict';

var _ = require('lodash');
var app = require('./lib/express');
var clog = require('c.log');
var config = require('./lib/config');
var fs = require('fs');
var path = require('path');
var db = require('./lib/db');
var http = require('http');
var https = require('https');

//load models and sync database
_.forEach(config.files.server.models, function (model) {
  require(path.resolve('./' + model));
});

//SECURE MODE DOES NOT WORK WITHOUT THIS
// var options = {
//   key: fs.readFileSync(path.resolve('./certs/private.key')),
//   cert: fs.readFileSync(path.resolve('./certs/certificate.pem'))
// };

db.sequelize.sync({force: config.force}) //use force true (defined in local) when changing schema
  .then(function (){
    http.createServer(app).listen(config.port);
    // https.createServer(options, app).listen(config.securePort);
    clog.green('Listening for http on port ' + config.port);
    // clog.green('Listening for https on port ' + config.securePort);
  })

  .catch(function (err){
    clog.red(err);
  });
