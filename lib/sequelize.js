'use strict';
var config = require('./config.js');

var Sequelize = require('sequelize');
var sequelize;

if(config.database.url) {
  sequelize = new Sequelize(config.database.url);
} else {
  sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect
  });
} 
 
  
module.exports = sequelize;
