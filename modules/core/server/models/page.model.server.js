'use strict';

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define('Page', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  });

  return Page;
};
