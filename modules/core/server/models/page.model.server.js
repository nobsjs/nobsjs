'use strict';

var path = require('path');
var Sequelize = require('sequelize');

var sequelize = require(path.resolve('./lib/sequelize.js'));

var Page = sequelize.define('page', {
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  title: Sequelize.STRING,
  content: Sequelize.STRING
});

module.exports = Page;
