'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));
var request = require('supertest');

var Tab = db.Tab;

describe('/api/core/tabs', function () {

  var tab;

  beforeAll(function (done){
    db.sequelize.sync({force: true})
      .then(function(){
        done();
      });
  });

  beforeEach(function () {
    tab = {};
    tab.title = 'Derp';
    tab.uisref = 'derp';
    tab.visibleRoles = ['owner', 'admin'];
  });

  var app = require(path.resolve('./lib/express.js'));

  it('should respond to a request to "/api/core/tabs" with 200 status', function (done) {
    request(app)
      .get('/api/core/tabs')
      .expect(200)
      .end(function (err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should respond to a request to "/api/core/tabs" with an array', function (done) {
    request(app)
      .get('/api/core/tabs')
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(Array.isArray(res.body)).toEqual(true);
          done();
        }
      });
  });

  it('should start with an empty array of tabs', function (done) {
    request(app)
      .get('/api/core/tabs')
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body.length).toEqual(0);
          done();
        }
      });
  });

  it('should respond to a request to "/api/core/tabs/1" (non-existant tab) with 404 status', function (done) {
    request(app)
      .get('/api/core/tabs/1')
      .expect(404)
      .end(function (err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should create a new tab without an error and should return tab', function (done) {
    request(app)
      .post('/api/core/tabs')
      .send(tab)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body.title).toEqual(tab.title);
          expect(res.body.uisref).toEqual(tab.uisref);
          expect(res.body.visibleRoles).toEqual(tab.visibleRoles);
          expect(res.body.id).toEqual(1);
          done();
        }
      });
  });

  describe('', function () {

    var tab = {};
    tab.title = 'Derp2';
    tab.uisref = 'derp2';
    tab.visibleRoles = ['owner', 'admin'];

    var savedTab;

    beforeEach(function (done) {
      Tab.create(tab)
        .then(function (newTab) {
          savedTab = newTab;
        })
        .then(done);
    });

    afterEach(function (done) {
      Tab.destroy({
        where: {
          id: savedTab.id
        }
      })
      .then(done);
    });

    it('should be able to retrieve the new tab', function (done) {
      request(app)
        .get('/api/core/tabs/' + savedTab.id)
        .expect(200)
        .end(function (err) {
          if(err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });

    it('should be able to retrieve the new tab', function (done) {
      request(app)
        .get('/api/core/tabs/' + savedTab.id)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.title).toEqual(tab.title);
            expect(res.body.uisref).toEqual(tab.uisref);
            console.log('-----RES BODY---1',res.body);
            expect(res.body.visibleRoles).toEqual(tab.visibleRoles);
            expect(res.body.id).toEqual(savedTab.id);
            done();
          }
        });
    });

    it('should be able to update a tab', function (done) {
      request(app)
        .put('/api/core/tabs/' + savedTab.id)
        .send(tab)
        .expect(200)
        .end(function (err, res) {
          expect(res.body.title).toEqual(tab.title);
          expect(res.body.uisref).toEqual(tab.uisref);
          console.log('-----RES BODY---2',res.body);
          expect(res.body.visibleRoles).toEqual(tab.visibleRoles);
          expect(res.body.id).toEqual(savedTab.id);
          if(err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });

    it('should be able to update a tab', function (done) {
      tab.title = 'Some New Tab Title';
      request(app)
        .put('/api/core/tabs/' + savedTab.id)
        .send(tab)
        .expect(200)
        .end(function (err) {
          if(err) {
            done.fail(err);
          } else {
            request(app)
              .get('/api/core/tabs/' + savedTab.id)
              .expect(200)
              .end(function (err, res) {
                if(err) {
                  done.fail(err);
                } else {
                  expect(res.body.title).toEqual('Some New Tab Title');
                  expect(res.body.uisref).toEqual(tab.uisref);
                  expect(res.body.visibleRoles).toEqual(tab.visibleRoles);
                  expect(res.body.id).toEqual(savedTab.id);
                  done();
                }
              });
          }
        });
    });

    it('should be able to delete a tab', function (done) {
      request(app)
        .delete('/api/core/tabs/' + savedTab.id)
        .expect(200)
        .end(function (err) {
          if(err) {
            done.fail(err);
          } else {
            // done();
            request(app)
              .get('/api/core/tabs/' + savedTab.id)
              .expect(404)
              .end(function (err) {
                if(err) {
                  done.fail(err);
                } else {
                  done();
                }
              });
          }
        });
    });
  });
});
