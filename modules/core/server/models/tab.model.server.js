'use strict';

module.exports = function (sequelize, DataTypes) {
  var Tab = sequelize.define('Tab', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uisref: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      classMethods: {
        associate: function (models) {
          Tab.belongsToMany(models.Role, {through: 'TabRole'});
        }
      }
    });

  return Tab;
};
