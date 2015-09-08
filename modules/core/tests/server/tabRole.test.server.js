'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));
var request = require('supertest');

describe('/api/core/tabs', function () {

  var homeTab = {};
  homeTab.title = 'Home';
  homeTab.uisref = 'home';
  homeTab.roles = ['owner', 'admin', 'user', 'public'];

  var noRolesTab = {};
  noRolesTab.title = 'No Roles';
  noRolesTab.uisref = 'noRoles';

  beforeAll(function (done){
    db.sequelize.sync({force: true})
      .then(function () {
        return db.Role.create({ name: 'admin' });
      })
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
      .then(function(){
        done();
      });
  });

  var app = require(path.resolve('./lib/express.js'));

  it('should set the roles for a new tab to "owner" and "admin" if no roles are given', function (done) {
    request(app)
      .post('/api/core/tabs')
      .send(noRolesTab)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.title).toEqual(noRolesTab.title);
          expect(res.body.uisref).toEqual(noRolesTab.uisref);
          expect(res.body.visibleRoles).toEqual(['owner', 'admin']);
          done();
        }
      });
  });

  it('should respond with 500 status to a POST request with duplicate title to "/api/core/tabs"', function (done) {

    request(app)
      .post('/api/core/tabs')
      .send(noRolesTab)
      .expect(500)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should set the roles for a new tab to the given roles', function (done) {
    var homeTab = {};
    homeTab.title = 'Cowabunga';
    homeTab.uisref = 'cowabunga';
    homeTab.roles = ['owner', 'admin', 'user'];

    request(app)
      .post('/api/core/tabs')
      .send(homeTab)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.title).toEqual(homeTab.title);
          expect(res.body.uisref).toEqual(homeTab.uisref);
          expect(res.body.visibleRoles).toEqual(homeTab.roles);
          done();
        }
      });
  });

});
