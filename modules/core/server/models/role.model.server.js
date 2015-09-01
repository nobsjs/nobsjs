'use strict';

var path = require('path');
var Sequelize = require('sequelize');

var sequelize = require(path.resolve('./lib/sequelize.js'));

var Role = sequelize.define('role', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    unique: true
  }
});

module.exports = Role;
