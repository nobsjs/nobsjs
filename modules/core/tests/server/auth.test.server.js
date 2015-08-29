'use strict';

var path = require('path');
var request = require('supertest');
var sequelize = require(path.resolve('./lib/sequelize.js'));

var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));


describe('login', function () {

  beforeAll(function(done){
    
    sequelize.sync({force: true})
      .then(function () {
        return User.create({
          username: 'Rob',
          password: 'testpassword'
        });
      })
      .then(function(){
        done();
      });
  });

  afterAll(function (done) {
    User.destroy({
      where: {
        id: {
          $gt: 0
        }
      }
    })
    .then(function () { //callback argument would be # of rows deleted
      // console.log('Destroyed ', rows, ' entries (login)');
      // return sequelize.drop();
      done();
    });
    // .then(function(){
    //   done();
    // });
  });

  var app = require(path.resolve('./lib/express.js'));

  it('should respond to a successful POST request to "/api/core/users/login" with 200 status', function (done) {
    
    request(app)
      .post('/api/core/users/login')
      .send({username: 'Rob', password: 'testpassword'})
      .expect(200)
      .end(function(err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

  it('should respond to a POST request with bad password to "/api/core/users/login" with 400 status', function (done) {
    
    request(app)
      .post('/api/core/users/login')
      .send({username: 'Rob', password: 'testpaasdfasdfssword'})
      .expect(400)
      .end(function(err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

  it('should respond to a POST request with bad username to "/api/core/users/login" with 400 status', function (done) {
    
    request(app)
      .post('/api/core/users/login')
      .send({username: 'RobISNOTINTHISDAF', password: 'testpassword'})
      .expect(400)
      .end(function(err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

  it('response to successful login should include a token', function (done) {
    
    request(app)
      .post('/api/core/users/login')
      .send({username: 'Rob', password: 'testpassword'})
      .expect(200)
      .expect(function (res) {
        if (!res.body.hasOwnProperty('token')){
          return 'token not found';
        }
      })
      .end(function(err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

});

describe('signup', function () {

  beforeAll(function (done) {
    sequelize.sync({force: true})
      .then(function () {
        done();
      });
  });

  afterEach(function (done) {
    User.destroy({
      where: {
        id: {
          $gt: 0
        }
      }
    })
    .then(function () { //callback argument would be # of rows deleted
      // console.log('Destroyed ', rows, ' entries (signup)');
      done();
    });
    // .then(function(){
    //   done();
    // });
    
  });

  var app = require(path.resolve('./lib/express.js'));

  it('should return a token upon new user signup', function (done) {
    
    request(app)
      .post('/api/core/users/signup')
      .send({username: 'Rob', password: 'testpassword'})
      .expect(function (res) {
        if (!res.body.hasOwnProperty('token')){
          return 'token not found';
        }
      })
      .end(function (err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

  it('should fail upon duplicate signup', function (done) {
    
    request(app)
      .post('/api/core/users/signup')
      .send({username: 'Rob', password: 'testpassword'})
      .end(function () { //call back arguments would be err, res
        request(app)
          .post('/api/core/users/signup')
          .send({username: 'Rob', password: 'testpassword'})
          .expect(400)
          .end(function (err) {
            if (err) {
              done.fail(err);
            } else {
              done();
            }
          });
      });
  });
});
