'use strict';


var bcrypt = require('bcrypt');
var path = require('path');
var Sequelize = require('sequelize');

var sequelize = require(path.resolve('./lib/sequelize.js'));

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  instanceMethods: {
    comparePassword : function(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.getDataValue('password'), function(err, isMatch) {
        if(err) { 
          return cb(err);
        }
        cb(null, isMatch);
      });
    }
  }
});


User.hook('beforeCreate', function (user, options, done){
  bcrypt.hash(user.password, 10, function (err, hash) {
    user.password = hash;
    done();
  });
});


module.exports = User;
