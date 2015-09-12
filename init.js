'use strict';

var db = require('./lib/db.js');

db.sequelize.sync({force:true})
.then(function () {
  // Create an Admin Role
  return db.Role.create({ name: 'admin' });
})
.then(function (role) {
  // Create an Admin User
  return db.User.create({ email: 'admin@example.com', password: 'testPassword' })
  .then(function (user) {
    return user.addRole(role)
      .then(function (){
        return db.Post.create({
          title: 'Title of Blog Post 1',
          UserId: user.id,
          content: '<div>This is some content.</div>'
        });
      })
      .then(function (){
        return db.Post.create({
          title: 'Title of Blog Post 2',
          UserId: user.id,
          content: '<div>This is some content.</div>'
        });
      })
      .then(function (){
        return db.Post.create({
          title: 'Title of Blog Post 3',
          UserId: user.id,
          content: '<div>This is some content.</div>'
        });
      })
      .then(function (){
        return db.Post.create({
          title: 'Title of Blog Post 4',
          UserId: user.id,
          content: '<div>This is some content.</div>'
        });
      });
  });
})
.then(function () {
  // Create an Owner Role
  return db.Role.create({ name: 'owner' });
})
.then(function (role) {
  // Create an Owner User
  return db.User.create({ email: 'owner@example.com', password: 'testPassword' })
  .then(function (user) {
    user.addRole(role);
  });
})
.then(function () {
  // Create a User Role
  return db.Role.create({ name: 'user' });
})
.then(function (role) {
  // Create a User User
  return db.User.create({ email: 'user@example.com', password: 'testPassword' })
  .then(function (user) {
    user.addRole(role);
  });
})
.then(function () {
  // Create a Public Role
  return db.Role.create({ name: 'public' });
})
.then(function () {
  // Create Home tab
  return db.Tab.create({ title: 'Home', uisref: 'home'});
})
.then(function (tab) {
    return db.Role.findAll({
      where: {
        $or: [
          { name: 'public' },
          { name: 'user' },
          { name: 'owner' },
          { name: 'admin' }
        ]
      }
    })
    .then(function (roles) {
      return tab.setRoles(roles);
    });
})
.then(function () {
  // Create Blog tab
  return db.Tab.create({ title: 'Blog', uisref: 'blog.list' });
})
.then(function (tab) {
  return db.Role.findAll({
    where: {
      $or: [
        { name: 'public' },
        { name: 'user' },
        { name: 'owner' },
        { name: 'admin' }
      ]
    }
  })
  .then(function (roles) {
    return tab.setRoles(roles);
  });
})
.then(function () {
  // Create About tab
  return db.Tab.create({ title: 'About', uisref: 'about' });
})
.then(function (tab) {
  return db.Role.findAll({
    where: {
      $or: [
        { name: 'public' },
        { name: 'user' },
        { name: 'owner' },
        { name: 'admin' }
      ]
    }
  })
  .then(function (roles) {
    tab.setRoles(roles);
  });
})
.then(function () {
  process.nextTick(function () {
    process.exit(0);
  });
})
.catch(function () {
  process.exit(1);
});
