'use strict';

var path = require('path');
var sequelize = require(path.resolve('./lib/sequelize.js'));

var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));


describe('User functionality', function () {

  beforeAll(function(done){
    
    sequelize.sync({force: true})
      .then(function () {
        return User.create({
          email: 'Test@test.com',
          password: 'testPassword'
        });
      })
      .then(function(){
        done();
      });
  });

  afterAll(function(done){
    User.destroy({
      where: {
        id: {
          $gt: 0
        }
      }
    })
    .then(function (  ) { //argument to callback would be # of rows deleted
      // console.log('Destroyed ', rows, ' entries');
      // return sequelize.drop();
      done();
    });
    // .then(function(){
    //   done();
    // });
  });
  

  it('should create a user', function (done) {
    User.create({
      email: 'TestCreate@test.com',
      password: 'testpassword'
    })
    .then(function (user) {
      expect(typeof user.password).toEqual('string');
      done();
    })
    .catch(function (err) {
      done.fail(err);
    });   
  });

  it('should fail if email is invalid', function (done) {
    User.create({
      email: 'THIS IS NOT AN EMAIL',
      password: 'testpassword'
    })
    .then(function (user) {
      done();
    })
    .catch(function (err) {
      expect(err.name).toBe('SequelizeValidationError');
      done();
    });  
  });

  it('Compare password should return true for matching PW', function (done) {
    User.find({
      where: {
        email: 'Test@test.com',
      }
    })
    .then(function (user){
      user.comparePassword('testPassword').then(function (isMatch){
        expect(isMatch).toEqual(true);
        done();
      });
    })
    .catch(function (err) {
      done.fail(err);
    });

  });
  
  it('Compare password should return false for non-matching PW', function (done) {
      User.find({
        where: {
          email: 'Test@test.com',
        }
      })
      .then(function (user){
        user.comparePassword('tesasdftpassword').then(function (isMatch){
          expect(isMatch).toEqual(false);
          done();
        });
      })
      .catch(function (err) {
        done.fail(err);
      });

    });

});
