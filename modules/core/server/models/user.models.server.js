'use strict';

var bcrypt = require('bcrypt');
var Promise = require('bluebird');

Promise.promisifyAll(bcrypt);

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
  }, {
    instanceMethods: {
      comparePassword : function(candidatePassword) {
        return bcrypt.compareAsync(candidatePassword, this.getDataValue('password'))
          .then(function (isMatch) {
            if(isMatch) {
              return true;
            } else {
              return false;
            }
          });
          // .catch(function (e) {
          //   return e;
          // });
      }
    },
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Role, {through: 'UserRole'});
      }
    }
  });


  User.hook('beforeCreate', function (user){
    //users are not admin upon creation. Must use web interface to make admins
    user.admin = false;
    user.email = user.email.toLowerCase();
    return bcrypt.hashAsync(user.password, 10)
      .then(function (hash) {
        user.password = hash;
      })
      .catch(function (e) {
        return e;
      });
  });
  return User;
};
