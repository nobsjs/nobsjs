'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));
var request = require('supertest');

describe('Posts API', function () {

  var app, post, token;

  beforeAll(function (done) {
    app = require(path.resolve('./lib/express.js'));
    db.sequelize.sync({force: true})
      .then(function () {
        request(app)
          .post('/api/core/users/signup')
          .send({firstName: 'Test', lastName: 'Test', email: 'test@test.com', password: 'testpassword'})
          .end(function (err, res) {
            token = res.body.token;
            done();
          });
        });
  });

  beforeEach(function () {
    post = {};
    post.content = 'Some content for the Title of the Post';
    post.title = 'Post Title';
  });

  it('should be able to get the posts', function (done) {
    request(app)
      .get('/api/blog/posts')
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

  it('should be able to create a post', function (done) {
    request(app)
      .post('/api/blog/posts')
      .set('x-access-token', token)
      .send(post)
      .expect(200)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          expect(res.body.UserId).toBeGreaterThan(0);
          done();
        }
      });
  });

  it('should not allow a user not logged in to create a post', function (done) {
    request(app)
      .post('/api/blog/posts')
      .set('x-access-token', null)
      .send(post)
      .expect(401)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return 404 when trying to get a non existant post', function (done) {
    request(app)
      .get('/api/blog/posts/754307589432')
      .set('x-access-token', token)
      .expect(404)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return 404 when trying to update a non existant post', function (done) {
    request(app)
      .put('/api/blog/posts/754307589432')
      .set('x-access-token', token)
      .send(post)
      .expect(404)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return 404 when trying to delete a non existant post', function (done) {
    request(app)
      .delete('/api/blog/posts/754307589432')
      .set('x-access-token', token)
      .expect(404)
      .end(function (err, res) {
        if(err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  describe('modifying existing posts', function () {

    var dbPost;

    beforeEach(function (done) {
      request(app)
        .post('/api/blog/posts')
        .set('x-access-token', token)
        .send(post)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            dbPost = res.body;
            done();
          }
        });
    });

    it('should be able to get a single post', function (done) {
      request(app)
        .get('/api/blog/posts/' + dbPost.id)
        .set('x-access-token', token)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.title).toEqual(post.title);
            expect(res.body.content).toEqual(post.content);
            done();
          }
        });
    });

    it('should be able to get a single post', function (done) {
      request(app)
        .get('/api/blog/posts/' + dbPost.id)
        .set('x-access-token', null)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.title).toEqual(post.title);
            expect(res.body.content).toEqual(post.content);
            done();
          }
        });
    });

    it('should be able to update a post', function (done) {
      post.title = 'newTitle';
      request(app)
        .put('/api/blog/posts/'+dbPost.id)
        .set('x-access-token', token)
        .send(post)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.title).toEqual('newTitle');
            done();
          }
        });
    });

    it('should be able to update a post with only a title', function (done) {
      var post2 = {title: 'newTitle'};
      request(app)
        .put('/api/blog/posts/'+dbPost.id)
        .set('x-access-token', token)
        .send(post2)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.title).toEqual(post2.title);
            expect(res.body.content).toEqual(post.content);
            done();
          }
        });
    });

    it('should be able to update a post with only some content', function (done) {
      var post2 = {content: 'newContent'};
      request(app)
        .put('/api/blog/posts/'+dbPost.id)
        .set('x-access-token', token)
        .send(post2)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            expect(res.body.title).toEqual(post.title);
            expect(res.body.content).toEqual(post2.content);
            done();
          }
        });
    });

    it('should not allow a non-logged in user to update a post', function (done) {
      post.title = 'aHackersTitle';
      request(app)
        .put('/api/blog/posts/'+dbPost.id)
        .set('x-access-token', null)
        .send(post)
        .expect(401)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });

    it('should actually update the post in the database', function (done) {
      post.title = 'newTitle';
      request(app)
        .put('/api/blog/posts/'+dbPost.id)
        .set('x-access-token', token)
        .send(post)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            db.Post.findOne({
              where: {
                id: dbPost.id
              }
            }).then(function (result) {
              expect(result.title).toEqual(post.title);
              done();
            });
          }
        });
    });

    it('should be able to delete a post', function (done) {
      request(app)
        .delete('/api/blog/posts/'+dbPost.id)
        .set('x-access-token', token)
        .expect(200)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });

    it('should not allow a non-logged in user to delete a post', function (done) {
      post.title = 'aHackersTitle';
      request(app)
        .delete('/api/blog/posts/'+dbPost.id)
        .set('x-access-token', null)
        .expect(401)
        .end(function (err, res) {
          if(err) {
            done.fail(err);
          } else {
            done();
          }
        });
    });

  });

});
