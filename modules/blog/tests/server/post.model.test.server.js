'use strict';

var path = require('path');
var db = require(path.resolve('./lib/db.js'));

describe('Post Model', function () {

  var post1;

  beforeEach(function (done) {

    db.sequelize.sync({force: true})
      .then(function () {
        return db.User.create({
          firstName: 'Blog',
          lastName: 'Test',
          email: 'blog@example.com',
          password: 'somePasswordForTheBlog'
        });
      })
      .then(function (user) {
        post1 = {
          title: 'Post 1 Title',
          content: 'Content for Post 1',
          UserId: user.id
        };

        return post1;
      })
      .then(done)
      .catch(done.fail);
  });

  it('should start with no posts in the database', function (done) {
    db.Post.findAll()
      .then(function (posts) {
        expect(posts.length).toEqual(0);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should be able to create a post', function (done) {
    db.Post.create(post1)
      .then(done)
      .catch(done.fail);
  });

  it('should be able to fetch a newly created post', function (done) {
    db.Post.create(post1)
      .then(function () {
        return db.Post.findAll();
      })
      .then(function (posts) {
        expect(posts.length).toEqual(1);
        expect(posts[0].title).toEqual(post1.title);
        expect(posts[0].content).toEqual(post1.content);
        expect(posts[0].UserId).toEqual(post1.UserId);
        done();
      })
      .catch(done.fail);
  });

  it('should be able to edit a post title', function (done) {
    db.Post.create(post1)
      .then(function (post) {
        var updatedPost = {
          title: 'New Title'
        };
        return db.Post.update(updatedPost, {
          where: {
            id: post.id
          }
        });
      })
      .then(function () {
        return db.Post.findAll();
      })
      .then(function (posts) {
        expect(posts.length).toEqual(1);
        expect(posts[0].title).toEqual('New Title');
        expect(posts[0].content).toEqual(post1.content);
        done();
      })
      .catch(done.fail);
  });

});
