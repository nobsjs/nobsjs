'use strict';

var path = require('path');

var core = require(path.resolve('./modules/core/server/controllers/core.controller.server'));

module.exports = function(app) {
  app.route('/').get(core.renderIndex);
  app.route('/api/core/users/login').post(core.logIn);
};
