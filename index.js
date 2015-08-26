'use strict';

var app = require('./lib/express');
var clog = require('c.log');
var config = require('./lib/config');

app.listen(config.port, function (){
  clog.green('Listening on port ' + config.port);
});
