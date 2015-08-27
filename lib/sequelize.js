'use strict';
var config = require('./config.js');

var Sequelize = require('sequelize');
var sequelize;

if(config.db.url) {
  sequelize = new Sequelize(config.db.url);
} else {
  sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
  });
}
  
module.exports = sequelize;
