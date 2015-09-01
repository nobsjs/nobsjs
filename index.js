'use strict';

var _ = require('lodash');
var app = require('./lib/express');
var clog = require('c.log');
var config = require('./lib/config');
var path = require('path');
var db = require('./lib/db');

//load models and sync database
_.forEach(config.files.server.models, function (model) {
  require(path.resolve('./' + model));
});

db.sequelize.sync({force: config.force}) //use force true (defined in local) when changing schema
  .then(function (){
    app.listen(config.port, function (){
      clog.green('Listening on port ' + config.port);
    });
  })
  .catch(function (err){
    clog.red(err);
  });
