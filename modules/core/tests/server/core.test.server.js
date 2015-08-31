'use strict';

var path = require('path');
var request = require('supertest');

describe('basic request', function () {

  var app = require(path.resolve('./lib/express.js'));

  it('should respond to a request to "/" with 200 status', function (done) {
    
    request(app)
      .get('/')
      .expect(200)
      .end(function(err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

});
