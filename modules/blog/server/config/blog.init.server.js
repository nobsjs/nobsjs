'use strict';

var path = require('path');

var db = require(path.resolve('./lib/db'));

module.exports = blogInit;

//////////

function blogInit() {
  return db.Role.create({ name: 'admin' })
    .then(function (role) {
      // Create an Admin User
      return db.User.create({ displayName: 'Admin Example', firstName: 'Admin', lastName: 'test', email: 'admin@example.com', password: 'testPassword' })
        .then(function (user) {
          return user.addRole(role)
            .then(function () {
              return db.Post.create({
                title: 'Title of Blog Post 1',
                UserId: user.id,
                content: '<div>This is some content.</div>'
              });
            })
            .then(function () {
              return db.Post.create({
                title: 'Title of Blog Post 2',
                UserId: user.id,
                content: '<div>This is some content.</div>'
              });
            })
            .then(function () {
              return db.Post.create({
                title: 'Title of Blog Post 3',
                UserId: user.id,
                content: '<div>This is some content.</div>'
              });
            })
            .then(function () {
              return db.Post.create({
                title: 'Title of Blog Post 4',
                UserId: user.id,
                content: '<div>This is some content.</div>'
              });
            });
        });
    });
}
