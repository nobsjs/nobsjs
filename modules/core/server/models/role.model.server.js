'use strict';

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true
    }
  }, {
    classMethods: {
      associate: function (models) {
        Role.belongsToMany(models.User, {through: 'UserRole'});
        Role.belongsToMany(models.Tab, {through: 'TabRole'});
      }
    }
  });

  return Role;
};
