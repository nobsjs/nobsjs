'use strict';

var path = require('path');
var sequelize = require(path.resolve('./lib/sequelize.js'));
var request = require('supertest');

var Page = require(path.resolve('./modules/core/server/models/page.model.server.js'));

describe('Pages', function () {

  var app = require(path.resolve('./lib/express.js'));

  beforeAll(function (done){
    
    sequelize.sync({force: true})
      .then(function () {
        return Page.create({
          slug: '/test1',
          title: 'Page Title Test1',
          content: 'Content for the Test1 Page'
        });
      })
      .then(function(){
        done();
      });
  });

  it('should respond to a request to "/api/core/pages" with 200 status', function () {
    
    request(app)
      .get('/api/core/pages')
      .expect(200)
      .end(function(err){
        if (err) {
          throw err;
        }
      });  
  });

});
