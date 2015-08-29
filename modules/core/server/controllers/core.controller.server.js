'use strict';
var path = require('path');
var jwt = require('jwt-simple');
var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));

var config = require(path.resolve('./lib/config'));

exports.renderIndex = function(req, res) {
  res.render(path.resolve('./modules/core/server/views/index.core.view.server.html'));
};

exports.logIn = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    where: {
      username: username 
    }
  })
  .then(function (user) {
    if (!user) {
      res.status(400).send('User does not exist or password is incorrect');
    } else {
      return user.comparePassword(password)
        .then(function (isMatch){
          if (isMatch) {
            var token = jwt.encode(user, config.secret);
            res.json({token: token});
          } else {
            res.status(400).send('User does not exist or password is incorrect');
          }
        });
    }
  })
  .catch(function (e) {
    res.status(500).send(e);
  });
};

exports.signUp = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    where: {
      username: username
    }
  })
  .then(function (user) {
    if (user) {
      res.status(400).send('User already exists');
    } else {
      User.create({
        username: username,
        password: password
      })
      .then(function (user) {
        var token = jwt.encode(user, config.secret);
        res.json({token: token});
      })
      .catch(function (e) {
        res.status(500).send(e);
      });
    }
  });
};
