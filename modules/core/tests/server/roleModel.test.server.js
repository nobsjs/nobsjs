'use strict';

var path = require('path');
var sequelize = require(path.resolve('./lib/sequelize.js'));

var Role = require(path.resolve('./modules/core/server/models/role.model.server.js'));

describe('Role Model', function () {
  
  beforeEach(function (done) {
    sequelize.sync({force: true})
    .then(done);
  });

  it('should start with no roles in the database', function (done) {
    Role.findAll()
    .then(function (resp) {
      expect(resp.length).toEqual(0);
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to create a role', function (done) {
    Role.create({
      name: 'role1'
    })
    .then(done)
    .catch(done.fail);
  }); 

  it('should be able to fetch a newly created role', function (done) {
    Role.create({
      name: 'role1'
    })
    .then(function () {
      return Role.findAll();
    })
    .then(function (resp) {
      expect(resp[0].name).toEqual('role1');
    })
    .then(done)
    .catch(done.fail);
  });

  it('should not be able to save 2 roles with the same name', function (done) {
    var role = {
      name: 'role1'
    };
    Role.create(role)
    .then(function () {
      Role.create(role)
      // It shouldn't successfully create the same role twice
      // so if it does, fail the test
      .then(done.fail)
      // If it fails, then it's successful
      .catch(done);
    })
    // But if it fails on the initial create, fail the test
    .catch(done.fail);
  });

  it('should be able to save multiple roles', function (done) {
    Role.create({name: 'role1'})
    .then(Role.create({name: 'role2'}))
    .then(done)
    .catch(done.fail);
  });

  it('should be able to edit a single role', function (done) {
    Role.create({name: 'role1'})
    .then(function (resp) {
      var updatedRole = {
        name: 'role2'
      };
      return Role.update(updatedRole, {
        where: {
          id: resp.id
        }
      });
    })
    .then(function () {
      return Role.findAll();
    })
    .then(function (resp) {
      expect(resp.length).toEqual(1);
      expect(resp[0].name).toEqual('role2');
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to delete a role', function (done) {
    Role.create({name: 'role1'})
    .then(function (resp) {
      return Role.destroy({
        where: {
          id: resp.id
        }
      });
    })
    .then(function () {
      return Role.findAll();
    })
    .then(function (resp) {
      expect(resp.length).toEqual(0);
    })
    .then(done)
    .catch(done.fail);
  });

});
