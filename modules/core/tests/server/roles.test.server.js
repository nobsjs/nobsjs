'use strict';

var path = require('path');
var request = require('supertest');

var app = require(path.resolve('./lib/express.js'));
var db = require(path.resolve('./lib/db.js'));

var Role = db.Role;
var User = db.User;

describe('Roles Controllers', function () {

  var role1, role2, user1, user2;

  beforeEach(function (done) {
    db.sequelize.sync({force: true})
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

  it('should have two roles and two users for testing', function (done) {
    Role.findAll()
    .then(function (roles) {
      expect(roles.length).toEqual(2);
      return User.findAll();
    })
    .then(function (users) {
      expect(users.length).toEqual(2);
    })
    .then(done)
    .catch(done.fail);
  });

  it('should be able to retrieve a list of roles', function (done) {
    request(app)
      .get('/api/core/roles')
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return 2 roles', function (done) {
    request(app)
      .get('/api/core/roles')
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body.length).toEqual(2);
          done();
        }
      });
  });

  it('should return a requested role', function (done) {
    request(app)
      .get('/api/core/roles/' + role1.id)
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body.name).toEqual(role1.name);
          done();
        }
      });
  });

  xit('should return a requested role with a list of users', function (done) {
    request(app)
      .get('/api/core/roles/' + role1.id)
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(Array.isArray(res.body.users)).toEqual(true);
          expect(res.body.users.length).toEqual(0);
          done();
        }
      });
  });

  it('should be able to create a role', function (done) {
    var role3 = { name: 'role3' };
    request(app)
      .post('/api/core/roles')
      .send(role3)
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return the newly created role', function (done) {
    var role4 = { name: 'role4' };
    request(app)
      .post('/api/core/roles')
      .send(role4)
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body.name).toEqual('role4');
          done();
        }
      });
  });

  it('should be able to update a role', function (done) {
    request(app)
      .put('/api/core/roles/' + role1.id)
      .send({ name: 'updatedRole' })
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return the updated role', function (done) {
    request(app)
      .put('/api/core/roles/' + role1.id)
      .send({ name: 'updatedRole2' })
      .expect(200)
      .end(function (err, res) {
        if(err) {
          expect(res.body.name).toEqual('updatedRole2');
          done.fail(err);
        } else {
          done();
        }
      });
  });

  

});
