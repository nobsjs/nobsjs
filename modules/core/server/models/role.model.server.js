'use strict';

module.exports = RoleModel;

//////////

function RoleModel (sequelize, DataTypes) {
  var roleSchema = {
    name: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING,
      unique: true
    }
  };

  var roleMethods = {
    classMethods: {
      associate: associate
    }
  };

  var Role = sequelize.define('Role', roleSchema, roleMethods);

  return Role;
  
  //////////

  function associate (models) {
    Role.belongsToMany(models.User, {through: 'UserRole'});
    Role.belongsToMany(models.Tab, {through: 'TabRole'});
  }

}
