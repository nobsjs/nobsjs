'use strict';

var path = require('path');

var pages = require(path.resolve('./modules/core/server/controllers/pages.controller.server.js'));

module.exports = pageRoutes;

//////////

function pageRoutes (app) {
  app.route('/api/core/pages')
    .get(pages.getPages)
    .post(pages.createPage);

  app.route('/api/core/pages/:pageId')
    .get(pages.sendPage)
    .put(pages.updatePage)
    .delete(pages.deletePage);

  app.param('pageId', pages.getPageByIdOrSlug);
}
