'use strict';

var path = require('path');

var tabs = require(path.resolve('./modules/core/server/controllers/tabs.controller.server.js'));

module.exports = function (app) {
  app.route('/api/core/tabs')
    .get(tabs.getTabs)
    .post(tabs.createTab);

  app.route('/api/core/tabs/:tabId')
    .get(tabs.getTab)
    .put(tabs.updateTab)
    .delete(tabs.deleteTab);

  app.param('tabId', tabs.getTabById);
};
