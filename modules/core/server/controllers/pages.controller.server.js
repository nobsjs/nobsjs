'use strict';

var path = require('path');

var Page = require(path.resolve('./modules/core/server/models/page.model.server.js'));

exports.getPages = function(req, res) {

  Page.findAll({ limit: 10 })
    .then(function (pages) {
      res.send(pages);
    })
    .catch(function (e) {
      res.send(e);
    });
};

exports.getPage = function(req, res) {
  if(req.page) {
    res.send(req.page);
  } else {
    res.status(400).send('Page does not exist');
  }
};

exports.createPage = function(req, res) {
  var page = {};
  page.slug = req.body.slug;
  page.title = req.body.title;
  page.content = req.body.content;

  Page.create(page)
    .then(function (newPage) {
      res.send(newPage);
    });
};

exports.updatePage = function(req, res) {
  var page = {};
  page.slug = req.body.slug || req.page.slug;
  page.title = req.body.title || req.page.title;
  page.content = req.body.content || req.body.content;
  Page.update(page, { where: { id: req.page.id } })
    .then(function (updatedPage) {
      res.send(updatedPage);
    });
};

exports.deletePage = function(req, res) {
  Page.destroy({ where: { id: req.page.id } })
    .then(function () {
      res.status(200).send('Page deleted');
    });
};

exports.getPageById = function(req, res, next, id) {
  Page.findOne({ 
    where: {
      id: id
    }
  })
  .then(function (page) {
    req.page = page;
    next();
  });
};
