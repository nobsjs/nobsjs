'use strict';

var path = require('path');

exports.renderIndex = function(req, res) {
  res.render(path.resolve('./modules/core/server/views/index.core.view.server.html'));
};
