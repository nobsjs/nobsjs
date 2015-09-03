'use strict';

var path = require('path');

var tabs = require(path.resolve('./modules/core/server/controllers/tabs.controller.server.js'));

module.exports = tabRoutes;

//////////

function tabRoutes (app) {
  app.route('/api/core/tabs')
    .get(tabs.getTabs)
    .post(tabs.createTab);

  app.route('/api/core/tabs/:tabId')
    .get(tabs.sendTab)
    .put(tabs.updateTab)
    .delete(tabs.deleteTab);

  app.param('tabId', tabs.getTabById);
}
