'use strict';

var path = require('path');

var core = require(path.resolve('./modules/core/server/controllers/core.controller.server'));

module.exports = coreRoutes;

//////////

function coreRoutes(app) {
  app.route('/').get(core.renderIndex);
  app.route('/api/core/users/login').post(core.logIn);
  app.route('/api/core/users/signup').post(core.signUp);
  app.route('/api/core/users/checkauth').post(core.checkAuth);
}
