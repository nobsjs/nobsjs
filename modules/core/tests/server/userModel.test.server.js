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
    }).then(function(user) {
      expect(typeof user.password).toEqual('string');
      done();
    }).catch(function(err){
      done.fail(err);
    });   
  });

});
