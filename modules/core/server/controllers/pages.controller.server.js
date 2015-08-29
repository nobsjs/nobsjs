'use strict';

var path = require('path');

var Page = require(path.resolve('./modules/core/server/models/page.model.server.js'));

exports.getPages = function(req, res) {
  Page.findAll({ limit: 10 })
    .then(function (pages) {
      res.send(pages);
    });
};
