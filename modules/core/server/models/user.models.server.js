'use strict';


var bcrypt = require('bcrypt');
var path = require('path');
var Promise = require('bluebird');
var Sequelize = require('sequelize');

var sequelize = require(path.resolve('./lib/sequelize.js'));

Promise.promisifyAll(bcrypt);


var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
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
        })
        .catch(function (e) {
          return e;
        });
    }
  }
});


User.hook('beforeCreate', function (user){
  return bcrypt.hashAsync(user.password, 10)
    .then(function (hash) {
      user.password = hash;
    })
    .catch(function (e) {
      return e;
    });
});


module.exports = User;
