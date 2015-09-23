'use strict';

var bcrypt = require('bcrypt');
var Promise = require('bluebird');

Promise.promisifyAll(bcrypt);

module.exports = UserModel;

//////////

function UserModel (sequelize, DataTypes) {
  var userSchema = {
    displayName: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING
  };

  var userMethods = {
    instanceMethods: {
      comparePassword: comparePassword,
      getFullName: getFullName
    },
    classMethods: {
      associate: associate
    }
  };

  var User = sequelize.define('User', userSchema, userMethods);


  User.hook('beforeBulkUpdate', beforeBulkUpdate);
  User.hook('beforeCreate', beforeCreateUpdate);
  User.hook('beforeUpdate', beforeCreateUpdate);

  return User;

  //////////

  function associate (models) {
    User.belongsToMany(models.Role, {through: 'UserRole'});
  }

  function beforeBulkUpdate (options) {
    options.individualHooks = true;
  }

  function beforeCreateUpdate (user) {
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

  function comparePassword (candidatePassword) {
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

  function getFullName () {
    /* jshint validthis:true */
    return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
  }
}
