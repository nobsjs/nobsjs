'use strict';

var config = require('./config.js');
var path = require('path');
var Sequelize = require('sequelize');

var db = {};
var sequelize;

if(config.db.url) {
  sequelize = new Sequelize(config.db.url);
} else {
  sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: config.log.db
  });
}

var models = config.files.server.models;

for(var i = 0; i < models.length; i++) {
  var model = sequelize.import(path.join(__dirname, '../',models[i]));
  db[model.name] = model;
}

for(var modelName in db) {
  if('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
