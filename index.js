'use strict';

var app = require('./lib/express');
var clog = require('./lib/clog');

app.listen(4000, function(){
  clog.green('Listening on port 4000');
});
