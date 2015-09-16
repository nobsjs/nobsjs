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
  app.route('/api/core/users/resetpassword').post(core.resetPassword);
  app.route('/api/core/users/sendresettoken').post(core.sendResetToken);

  app.route('/api/core/users')
    .get(core.getUsers);

  app.route('/api/core/users/:userId')
    .put(core.updateUser)
    .delete(core.deleteUser);

  app.param('userId', core.getUserById);
}
