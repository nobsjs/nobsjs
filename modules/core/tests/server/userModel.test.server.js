'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));

var User = db.User;

describe('User functionality', function () {

  var savedUser, savedPassword;

  beforeAll(function(done){

    db.sequelize.sync({force: true})
      .then(function () {
        return User.create({
          displayName: 'Testacular',
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'User',
          password: 'testPassword'
        });
      })
      .then(function (user) {
        savedUser = user;
        savedPassword = user.password.toString();
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
    .then(done);
  });


  it('should create a user', function (done) {
    User.create({
      firstName: 'Test',
      lastName: 'Create',
      email: 'testcreate@test.com',
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
      firstName: 'Test',
      lastName: 'Create',
      email: 'THIS IS NOT AN EMAIL',
      password: 'testpassword'
    })
    .then(function () { //callback takes 'user' as an argument
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
        email: 'test@test.com',
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

  it('should not update the password when not updating the password field of the User model', function (done) {
    User.update({ passwordResetToken: '1234567890' }, {
      where : { email: 'test@test.com' },
      })
      .then(function (userOut) {
        return User.findOne({ where : { email: 'test@test.com' }})
          .then(function (user) {
            expect(user.password).toEqual(savedPassword);
            done();
          });
      })
      .catch(done.fail);

  });

  it('should hash a new password when updating the password field of the User model', function (done) {
    User.update({ password: 'mynewpassowrd' }, { where : { email: 'testcreate@test.com' }}, {individualHooks: true})
      .then(function () {
        return User.findOne({ where : { email: 'testcreate@test.com' }});
      })
      .then(function (user) {
        expect(user.password).not.toEqual('mynewpassowrd');
        done();
      })
      .catch(done.fail);

  });

  it('Compare password should return false for non-matching PW', function (done) {
      User.find({
        where: {
          email: 'test@test.com',
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
