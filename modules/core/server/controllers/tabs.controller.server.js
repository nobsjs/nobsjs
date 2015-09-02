'use strict';

var path = require('path');

var db = require(path.resolve('./lib/db.js'));

var Tab = db.Tab;

exports.getTabs = function (req, res) {

  Tab.findAll()
    .then(function (tabs) {
      res.send(tabs);
    })
    .catch(function (e) {
      res.send(e);
    });
};

exports.getTab = function (req, res) {
  if(req.tab) {
    res.send(req.tab);
  } else {
    res.status(400).send('Tab does not exist');
  }
};

exports.createTab = function (req, res) {
  var tab = {};
  tab.title = req.body.title;
  tab.uisref = req.body.uisref;

  Tab.create(tab)
    .then(function (newTab) {
      res.send(newTab);
    });
};

exports.updateTab = function (req, res) {
  var tab = {};
  tab.title = req.body.title || req.tab.title;
  tab.uisref = req.body.uisref || req.tab.uisref;
  Tab.update(tab, { where: { id: req.tab.id } })
    .then(function () {
      return Tab.findOne({ where: { id: req.tab.id }});
    })
    .then(function (updatedTab) {
      res.send(updatedTab);
    });
};

exports.deleteTab = function (req, res) {
  Tab.destroy({ where: { id: req.tab.id } })
    .then(function () {
      res.status(200).send('Tab deleted');
    });
};

exports.getTabById = function (req, res, next, id) {
  Tab.findOne({
    where: {
      id: id
    }
  })
  .then(function (tab) {
    req.tab = tab;
    next();
  });
};
