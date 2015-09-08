'use strict';

var path = require('path');

var posts = require(path.resolve('./modules/blog/server/controllers/post.controller.server.js'));
var auth = require(path.resolve('./modules/core/server/controllers/auth.controller.server.js'));
module.exports = postRoutes;

//////////

function postRoutes (app) {
  app.route('/api/blog/posts')
    .all(auth.decode)
    .get(posts.getPosts)
    .post(posts.createPost);

  app.route('/api/blog/posts/:postId')
    .all(auth.decode)
    .get(posts.sendPost)
    .put(posts.updatePost)
    .delete(posts.deletePost);

  app.param('postId', posts.getPostById);
}
