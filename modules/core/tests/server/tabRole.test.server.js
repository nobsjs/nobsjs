'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));
var request = require('supertest');

describe('/api/core/tabs', function () {

  var tab;

  beforeAll(function (done){
    db.sequelize.sync({force: true})
      .then(function(){
        done();
      });
  });

  beforeEach(function (done) {
    // Create all the roles 'admin', 'owner', 'public', 'user'
    db.Role.create({ name: 'admin' })
    .then(function (role) {
      return db.Role.create({
        name: 'owner'
      });
    })
    .then(function (role) {
      return db.Role.create({
        name: 'public'
      });
    })
    .then(function (role) {
      return db.Role.create({
        name: 'user'
      });
    })
    .then(function () {
      tab = {};
      tab.title = 'Home';
      tab.uisref = 'home';
    })
    .then(function () {
      done();
    });
  });

  var app = require(path.resolve('./lib/express.js'));

  it('should set the roles for a new tab to "owner" and "admin" if no roles are given', function (done) {
    request(app)
      .post('/api/core/tabs')
      .send(tab)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.title).toEqual(tab.title);
          expect(res.body.uisref).toEqual(tab.uisref);
          expect(res.body.visibleRoles).toEqual(['owner', 'admin']);
          done();
        }
      });
  });

  xit('should respond with 500 status to a POST request with duplicate title to "/api/core/tabs"', function (done) {

    request(app)
      .post('/api/core/tabs')
      .send(tab)
      .expect(500)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  xit('should set the roles for a new tab to the given roles', function (done) {
    var tab2 = {};
    tab2.title = 'Cowabunga';
    tab2.uisref = 'cowabunga';
    tab2.roles = ['owner', 'admin', 'user'];

    request(app)
      .post('/api/core/tabs')
      .send(tab2)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.title).toEqual(tab2.title);
          expect(res.body.uisref).toEqual(tab2.uisref);
          expect(res.body.visibleRoles).toEqual(tab2.roles);
          done();
        }
      });
  });

});
