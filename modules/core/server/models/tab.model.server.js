'use strict';

module.exports = TabModel;

//////////

function TabModel (sequelize, DataTypes) {
  var tabSchema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uisref: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };
  var tabMethods = {
    classMethods: {
      associate: associate
    }
  };

  var Tab = sequelize.define('Tab', tabSchema, tabMethods);

  return Tab;

  //////////

  function associate (models) {
    Tab.belongsToMany(models.Role, {through: 'TabRole'});
  }
}
