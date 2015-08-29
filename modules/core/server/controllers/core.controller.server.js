'use strict';
var path = require('path');
var jwt = require('jwt-simple');
var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));

var config = require(path.resolve('./lib/config'));

exports.renderIndex = function(req, res) {
  res.render(path.resolve('./modules/core/server/views/index.core.view.server.html'));
};

exports.logIn = function(req, res) {
  var email = req.body.email.toLowerCase();
  var password = req.body.password;

  User.findOne({
    where: {
      email: email 
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
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  User.findOne({
    where: {
      email: email
    }
  })
  .then(function (user) {
    if (user) {
      res.status(400).send('User already exists');
    } else {
      User.create({
        email: email,
        password: password
      })
      .then(function (user) {
        var token = jwt.encode(user, config.secret);
        res.json({token: token});
      })
      .catch(function (e) {
        res.status(400).send(e.message);
      });
    }
  });
};

exports.checkAuth = function (req, res, next) {
  // checking to see if the user is authenticated
  // grab the token in the header is any
  // then decode the token, which we end up being the user object
  // check to see if that user exists in the database
  var token = req.headers['x-access-token'];
  if (!token) {
    next(new Error('No token'));
  } else {
    var user = jwt.decode(token, config.secret);
    User.findOne({email: user.email})
      .then(function (foundUser) {
        if (foundUser) {
          res.send(200);
        } else {
          res.status(401).send('User does not exist');
        }
      })
      .catch(function (e) {
        next(e);
      });
  }
};

exports.decode = function(req, res, next){
  var token = req.headers['x-access-token'];
  var user;

  if (!token) {
    return res.send(403); // send forbidden if a token is not provided
  }

  try {
    // decode token and attach user to the request
    // for use inside our controllers
    user = jwt.decode(token, config.secret);
    req.user = user;
    next();
  } catch(error) {
    return next(error);
  }

};
