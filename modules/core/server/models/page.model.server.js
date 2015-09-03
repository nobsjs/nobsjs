'use strict';

module.exports = PageModel;

//////////

function PageModel (sequelize, DataTypes) {
  var pageSchema = {
    content: DataTypes.TEXT,
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    title: DataTypes.STRING
  };

  var Page = sequelize.define('Page', pageSchema);

  return Page;
}
