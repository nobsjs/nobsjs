'use strict';

var path = require('path');
var request = require('supertest');
var sequelize = require(path.resolve('./lib/sequelize.js'));

var User = require(path.resolve('./modules/core/server/models/user.models.server.js'));


describe('login', function () {

  beforeAll(function(done){
    
    sequelize.sync()
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

  afterAll(function(done){
    User.destroy({
      where: {
        id: {
          $gt: 0
        }
      }
    }).then(function (rows) {
      // console.log('Destroyed ', rows, ' entries');
      return sequelize.drop();
    }).then(function(){
      done();
    });
  });

  var app = require(path.resolve('./lib/express.js'));

  it('should respond to a successful POST request to "/api/core/users/login" with 200 status', function (done) {
    
    request(app)
      .post('/api/core/users/login')
      .send({username: 'Rob', password: 'testpassword'})
      .expect(200)
      .end(function(err){
        if (err) {
          done(err);
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
          done(err);
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
          done(err);
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
          done(err);
        } else {
          done();
        }
      });  
  });

});

