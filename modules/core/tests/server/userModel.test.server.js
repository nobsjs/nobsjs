'use strict';

var path = require('path');
var sequelize = require(path.resolve('./lib/sequelize.js'));

var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));

sequelize.sync();

describe('User functionality', function () {


  it('should create a user', function (done) {
    User.create({
      username: 'Test',
      password: 'testpassword'
    })
    .then(function(user) {
      expect(typeof user.password).toEqual('string');
      console.log('password', user.password);
      done();
    })
    .catch(function (err) {
      done.fail(err);
    });   
  });

  it('Compare password should return true for matching PW', function (done) {
    User.create({
      username: 'Test2',
      password: 'testpassword'
    })
    .then(function(user){
      user.comparePassword('testpassword').then(function(isMatch){
        expect(isMatch).toEqual(true);
        done();
      });
    })
    .catch(function (err) {
      done.fail(err);
    });

  });
  
  it('Compare password should return false for matching PW', function (done) {
      User.create({
        username: 'Test2',
        password: 'testpassword'
      })
      .then(function(user){
        user.comparePassword('tesasdftpassword').then(function(isMatch){
          expect(isMatch).toEqual(false);
          done();
        });
      })
      .catch(function (err) {
        done.fail(err);
      });

    });

});
