'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));
var request = require('supertest');

var Page = db.Page;

describe('/api/core/pages', function () {

  var app, page;

  beforeAll(function (done){
    app = require(path.resolve('./lib/express.js'));

    db.sequelize.sync({force: true})
      .then(done);
  });

  beforeEach(function () {
    page = {};
    page.slug = '/test';
    page.title = 'Test title';
    page.content = 'Some content for the title page';
  });

  afterEach(function (done) {
    Page.truncate()
      .then(done);
  });

  it('should respond to a request to "/api/core/pages" with 200 status', function (done) {
    request(app)
      .get('/api/core/pages')
      .expect(200)
      .end(function (err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

  it('should respond to a request to "/api/core/pages" with an array', function (done) {
    request(app)
      .get('/api/core/pages')
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

  it('should start with an empty array of pages', function (done) {
    request(app)
      .get('/api/core/pages')
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

  it('should respond to a request to "/api/core/pages" with 400 status', function (done) {
    request(app)
      .get('/api/core/pages/1')
      .expect(400)
      .end(function (err){
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });  
  });

  it('should create a new page without an error', function (done) {
    request(app)
      .post('/api/core/pages')
      .send(page)
      .end(function (err) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return the newly created page', function (done) {
    request(app)
      .post('/api/core/pages')
      .send(page)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body.slug).toEqual(page.slug);
          expect(res.body.title).toEqual(page.title);
          expect(res.body.content).toEqual(page.content);
          done();
        }
      });
  });

  describe('', function () {

    var savedPage;

    beforeEach(function (done) {
      Page.create(page)
        .then(function (newPage) {
          savedPage = newPage;
        })
        .then(done);
    });

    it('should only have one page', function (done) {
      request(app)
        .get('/api/core/pages')
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.length).toEqual(1);
            done();
          }
        });
    });

    it('should be able to retrieve the new page', function (done) {
      request(app)
        .get('/api/core/pages/' + savedPage.id)
        .expect(200)
        .end(function (err) {
          if(err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });

    it('should be able to retrieve the new page', function (done) {
      request(app)
        .get('/api/core/pages/' + savedPage.id)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.slug).toEqual(page.slug);
            expect(res.body.title).toEqual(page.title);
            expect(res.body.content).toEqual(page.content);
            done();
          }
        });
    });
    
    it('should be able to retrieve the new page with a tab', function (done) {
      db.Tab.create({ title: 'Test1', uisref: 'pages.' + savedPage.id })
        .then(function (tab) {
          request(app)
            .get('/api/core/pages/' + savedPage.id)
            .expect(200)
            .end(function (err, res) {
              if(err) {
                done.fail(err);
              } else {
                console.log('Hello?: ', res.body);
                expect(res.body.slug).toEqual(page.slug);
                expect(res.body.title).toEqual(page.title);
                expect(res.body.content).toEqual(page.content);
                expect(res.body.tab.uisref).toEqual('pages.' + savedPage.id);
                done();
              }
            });
        });
    });

    it('should be able to update a page', function (done) {
      request(app)
        .put('/api/core/pages/' + savedPage.id)
        .send(page)
        .expect(200)
        .end(function (err, res) {
          expect(res.body.slug).toEqual(page.slug);
          expect(res.body.title).toEqual(page.title);
          expect(res.body.content).toEqual(page.content);
          if(err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });

    it('should be able to update a page', function (done) {
      page.title = 'Some New Title';
      request(app)
        .put('/api/core/pages/' + savedPage.id)
        .send(page)
        .expect(200)
        .end(function (err) {
          if(err) {
            done.fail(err);
          } else {
            request(app)
              .get('/api/core/pages/' + savedPage.id)
              .expect(200)
              .end(function (err, res) {
                if(err) {
                  done.fail(err);
                } else {
                  expect(res.body.slug).toEqual(page.slug);
                  expect(res.body.title).toEqual('Some New Title');
                  expect(res.body.content).toEqual(page.content);
                  done();
                }
              });
          }
        });
    });

    it('should be able to delete a page', function (done) {
      request(app)
        .delete('/api/core/pages/' + savedPage.id)
        .expect(200)
        .end(function (err) {
          if(err) {
            done.fail(err);
          } else {
            request(app)
              .get('/api/core/pages/' + savedPage.id)
              .expect(400)
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
