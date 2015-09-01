'use strict';

var path = require('path');
var sequelize = require(path.resolve('./lib/sequelize.js'));

var Role = require(path.resolve('./modules/core/server/models/role.model.server.js'));
var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));

var UserRole = sequelize.define('UserRoles', {});

User.belongsToMany(Role, {through: UserRole});
Role.belongsToMany(User, {through: UserRole});

module.exports = UserRole;
