'use strict';

module.exports = PostModel;

//////////

function PostModel (sequelize, DataTypes) {
  var postSchema = {
    title: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING
    },
    content: DataTypes.TEXT
  };

  var postMethods = {
    classMethods: {
      associate: associate
    }
  };

  var Post = sequelize.define('Post', postSchema, postMethods);

  return Post;

  //////////

  function associate (models) {
    models.User.hasMany(Post, {as: 'Posts'});
  }

}
