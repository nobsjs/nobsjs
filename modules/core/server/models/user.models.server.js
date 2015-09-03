'use strict';

var bcrypt = require('bcrypt');
var Promise = require('bluebird');

Promise.promisifyAll(bcrypt);

module.exports = UserModel;

//////////

function UserModel (sequelize, DataTypes) {
  var userSchema = {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  };

  var userMethods = {
    instanceMethods: {
      comparePassword: comparePassword
    },
    classMethods: {
      associate: associate
    }
  };

  var User = sequelize.define('User', userSchema, userMethods);


  User.hook('beforeCreate', beforeCreate);

  return User;

  //////////

  function associate (models) {
    User.belongsToMany(models.Role, {through: 'UserRole'});
  }

  function beforeCreate (user){
    //users are not admin upon creation. Must use web interface to make admins
    user.admin = false;
    user.email = user.email.toLowerCase();
    return bcrypt.hashAsync(user.password, 10)
      .then(setHash)
      .catch(returnError);

    //////////

    function setHash (hash) {
      user.password = hash;
    }

    function returnError (e) {
      return e;
    }
  }

  function comparePassword(candidatePassword) {
    /* jshint validthis:true */
    return bcrypt.compareAsync(candidatePassword, this.getDataValue('password'))
      .then(checkMatch);

    //////////

    function checkMatch (isMatch) {
      if(isMatch) {
        return true;
      } else {
        return false;
      }
    }
  }
}
