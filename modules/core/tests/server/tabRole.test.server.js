'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));
var request = require('supertest');

// var Tab = db.Tab;
var Role = db.Role;

describe('/api/core/tabs', function () {

  var tab;

  beforeAll(function (done){
    db.sequelize.sync({force: true})
      .then(function(){
        done();
      });
  });

  beforeEach(function (done) {
    Role.create({
      name: 'admin'
    })
    .then(function (role) {
      return Role.create({
        name: 'owner'
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
          expect(res.body.Roles.length).toEqual(2);
          done();
        }
      });
  });

});
