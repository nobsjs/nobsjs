'use strict';

var path = require('path');
var sequelize = require(path.resolve('./lib/sequelize.js'));

var Role = require(path.resolve('./modules/core/server/models/role.model.server.js'));
var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));
require(path.resolve('./modules/core/server/models/userRoles.model.server.js'));

describe('UserRole Model', function () {

  var role1, role2, user1, user2;

  beforeEach(function (done) {
    sequelize.sync({force: true})
    .then(done);
  });

  beforeEach(function (done) {
    Role.create({name: 'Admin'})
    .then(function (role) {
      role1 = role;
      return Role.create({name: 'role2'});
    })
    .then(function (role) {
      role2 = role;
      return User.create({
        email: 'test@example.com',
        password: 'testPassword'
      });
    })
    .then(function (user) {
      user1 = user;
      return User.create({
        email: 'test2@example.com',
        password: 'testPassword2'
      });
    })
    .then(function (user) {
      user2 = user;
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to add a role to a user', function (done) {
    user1.addRole(role1)
    .then(function () {
      return role1.hasUser(user1);
    })
    .then(function (resp) {
      expect(resp).toEqual(true);
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to add a user to a role', function (done) {
    role1.addUser(user1)
    .then(function () {
      return user1.hasRole(role1);
    })
    .then(function (resp) {
      expect(resp).toEqual(true);
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to add multiple roles to a user', function (done) {
    user1.addRole(role1)
    .then(function () {
      return user1.addRole(role2);
    })
    .then(function () {
      return user1.getRoles();
    })
    .then(function (resp) {
      expect(resp.length).toEqual(2);
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to add multiple users to a role', function (done) {
    role1.addUser(user1)
    .then(function () {
      return role1.addUser(user2);
    })
    .then(function () {
      return role1.getUsers();
    })
    .then(function (resp) {
      expect(resp.length).toEqual(2);
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to set the users roles', function (done) {
    user1.setRoles([role1, role2])
    .then(function () {
      return user1.getRoles();
    })
    .then(function (resp) {
      expect(resp.length).toEqual(2);
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to override currently set roles', function (done) {
    user1.setRoles([role1, role2])
    .then(function () {
      return user1.getRoles();
    })
    .then(function (resp) {
      expect(resp.length).toEqual(2);
    })
    .then(function () {
      return user1.setRoles([]);
    })
    .then(function () {
      return user1.getRoles();
    })
    .then(function (resp) {
      expect(resp.length).toEqual(0);
    })
    .then(done)
    .catch(done.fail);
  });

});
