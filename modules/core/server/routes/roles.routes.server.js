'use strict';

var path = require('path');

var roles = require(path.resolve('./modules/core/server/controllers/roles.controllers.server.js'));

module.exports = rolesRoutes;

//////////

function rolesRoutes (app) {
  app.route('/api/core/roles')
    .get(roles.getRoles)
    .post(roles.createRole);

  app.route('/api/core/roles/:roleId')
    .get(roles.sendRole)
    .put(roles.updateRole);

  app.param('roleId', roles.getRoleById);
}
