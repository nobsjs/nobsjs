'use strict';

var Promise = require('bluebird');

var db = require('./lib/db.js');
var util = require('./lib/util.js');

var initFiles = util.getFiles(['modules/*/server/config/*.init.server.js']);

db.sequelize.sync({ force: true })
  .then(function () {
    var inits = [];
    initFiles.forEach(function (file) {
      inits.push(require('./' + file)());
    });
    return Promise.all(inits);
  })
  .then(function () {
    // Create an Owner Role
    return db.Role.create({ name: 'owner' });
  })
  .then(function (role) {
    // Create an Owner User
    return db.User.create({ displayName: 'OwnerExample', firstName: 'owner', lastName: 'Example', email: 'owner@example.com', password: 'testPassword' })
    .then(function (user) {
      user.addRole(role);
    });
  })
  .then(function () {
    // Create a User Role
    return db.Role.create({ name: 'user' });
  })
  .then(function (role) {
    // Create a User User
    return db.User.create({ displayName: 'UserExample', firstName: 'User', lastName: 'Example', email: 'user@example.com', password: 'testPassword' })
    .then(function (user) {
      user.addRole(role);
    });
  })
  .then(function () {
    // Create a Public Role
    return db.Role.create({ name: 'public' });
  })
  .then(function () {
    // Create Home tab
    return db.Tab.create({ title: 'Home', uisref: 'home'});
  })
  .then(function (tab) {
      return db.Role.findAll({
        where: {
          $or: [
            { name: 'public' },
            { name: 'user' },
            { name: 'owner' },
            { name: 'admin' }
          ]
        }
      })
      .then(function (roles) {
        return tab.setRoles(roles);
      });
  })
  .then(function () {
    // Create Blog tab
    return db.Tab.create({ title: 'Blog', uisref: 'blog.list' });
  })
  .then(function (tab) {
    return db.Role.findAll({
      where: {
        $or: [
          { name: 'public' },
          { name: 'user' },
          { name: 'owner' },
          { name: 'admin' }
        ]
      }
    })
    .then(function (roles) {
      return tab.setRoles(roles);
    });
  })
  .then(function () {
    // Create About tab
    return db.Tab.create({ title: 'About', uisref: 'about' });
  })
  .then(function (tab) {
    return db.Role.findAll({
      where: {
        $or: [
          { name: 'public' },
          { name: 'user' },
          { name: 'owner' },
          { name: 'admin' }
        ]
      }
    })
    .then(function (roles) {
      tab.setRoles(roles);
    });
  })
  .then(function () {
    process.nextTick(function () {
      process.exit(0);
    });
  })
  .catch(function (error) {
    console.error(error);
    process.exit(1);
  });
