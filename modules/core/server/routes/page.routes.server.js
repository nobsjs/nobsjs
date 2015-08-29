'use strict';

var path = require('path');

var pages = require(path.resolve('./modules/core/server/controllers/pages.controller.server.js'));

module.exports = function (app) {
  app.route('/api/core/pages')
    .get(pages.getPages)
    .post(pages.createPage);

  app.route('/api/core/pages/:pageId')
    .get(pages.getPage)
    .put(pages.updatePage)
    .delete(pages.deletePage);

  app.param('pageId', pages.getPageById);
};
