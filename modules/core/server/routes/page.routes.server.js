'use strict';

var path = require('path');

var pages = require(path.resolve('./modules/core/server/controllers/pages.controller.server.js'));

module.exports = function (app) {
  app.route('/api/core/pages')
    .get(pages.getPages);
}
