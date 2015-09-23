'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));
var request = require('supertest');

describe('/api/core/tabs', function () {

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

  it('should set NULL roles for a new tab if roles is empty array', function (done) {
    var emptyRolesTab = {};
    emptyRolesTab.title = 'Empty Roles';
    emptyRolesTab.uisref = 'emptyRoles';
    emptyRolesTab.visibleRoles = [];

    request(app)
      .post('/api/core/tabs')
      .send(emptyRolesTab)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.title).toEqual(emptyRolesTab.title);
          expect(res.body.uisref).toEqual(emptyRolesTab.uisref);
          expect(res.body.visibleRoles).toEqual([null]);
          done();
        }
      });
  });

  it('should set the roles for a new tab to the given roles', function (done) {
    var homeTab = {};
    homeTab.title = 'Cowabunga';
    homeTab.uisref = 'cowabunga';
    homeTab.visibleRoles = ['owner', 'admin', 'user'];

    request(app)
      .post('/api/core/tabs')
      .send(homeTab)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          expect(res.body.title).toEqual(homeTab.title);
          expect(res.body.uisref).toEqual(homeTab.uisref);
          expect(res.body.visibleRoles).toEqual(homeTab.visibleRoles);
          done();
        }
      });
  });

  it('should update the roles', function (done) {
    var homeTab = {};
    homeTab.title = 'Cowabunga2';
    homeTab.uisref = 'cowabunga2';
    homeTab.visibleRoles = ['owner', 'admin', 'user'];

    request(app)
      .post('/api/core/tabs')
      .send(homeTab)
      .end(function (err, res){
        if (err) {
          done.fail(err);
        } else {
          var id = res.body.id;
          expect(res.body.title).toEqual(homeTab.title);
          expect(res.body.uisref).toEqual(homeTab.uisref);
          expect(res.body.visibleRoles).toEqual(homeTab.visibleRoles);
          homeTab.visibleRoles = ['owner', 'admin'];
          request(app)
            .put('/api/core/tabs/' + id)
            .send(homeTab)
            .end(function (err, res) {
              if (err) {
                done.fail(err);
              } else {
                expect(res.body.title).toEqual(homeTab.title);
                expect(res.body.uisref).toEqual(homeTab.uisref);
                expect(res.body.visibleRoles).toEqual(homeTab.visibleRoles);
                request(app)
                  .get('/api/core/tabs/' + id)
                  .expect(200)
                  .end(function (err, res) {
                    if (err) {
                      done.fail(err);
                    } else {
                      expect(res.body.title).toEqual(homeTab.title);
                      expect(res.body.uisref).toEqual(homeTab.uisref);
                      expect(res.body.visibleRoles).toContain(homeTab.visibleRoles[0]);
                      expect(res.body.visibleRoles).toContain(homeTab.visibleRoles[1]);
                      done();
                    }
                  });
              }
            });
        }
      });
  });
});
