'use strict';
var config = require('./config.js');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect
});
  
module.exports = sequelize;
