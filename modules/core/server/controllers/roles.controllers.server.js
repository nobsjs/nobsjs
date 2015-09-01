'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));

var Role = db.Role;

exports.getRoles = function(req, res) {
  Role.findAll()
  .then(function (roles) {
    res.send(roles);
  })
  .catch(function (err) {
    res.status(500).send('A database error occured.');
  });
};

exports.getRole = function(req, res) {
  res.send(req.role);
};

exports.createRole = function(req, res) {
  var role = {};
  role.name = req.body.name;
  Role.create(role)
  .then(function (role) {
    res.send(role);
  })
  .catch(function () {
    res.status(500).send('The Role could not be Created');
  });
};

exports.updateRole = function(req, res) {
  var role = {};
  role.name = req.body.name;
  Role.update(role, {
    where: {
      id: req.role.id
    }
  })
  .then(function () {
    return Role.findOne({
      where: {
        id: req.role.id
      }
    });
  })
  .then(function (role) {
    res.send(role);
  })
  .catch(function () {
    res.status(500).send('The Role could not be updated');
  });
};

exports.getRoleById = function(req, res, next, id) {
  Role.findOne({ where: { id: id } })
  .then(function (role) {
    req.role = role;
    next();
  })
  .catch(function () {
    res.status(500).send('A Database Error Occured');
  });
};
