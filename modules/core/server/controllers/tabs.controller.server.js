'use strict';

var path = require('path');

var db = require(path.resolve('./lib/db.js'));

var Tab = db.Tab;
var Role = db.Role;

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

/**
  * Adds role associations to a tab
  *
  * @param    {sequelize model}   tab     - the sequelize tab model to add roles to
  * @param    {array}             roles   - an array of strings that represent the name of the roles to add to the tab
  * returns   {promise}                   - returns a promise with the tab and roles
  */

var addRoles = function (tab, roles) {
  //if there are no roles, set owner and admin
  if( roles === undefined ) {
    roles = ['owner', 'admin'];
  }
  //create an object to use with the $or operator
  var or = [];
  roles.forEach(function (role) {
    or.push({name: role});
  });
  //find role models from the database
  return Role.findAll({
    where: {
      $or: or
    }
  })
  //set the roles on the tab
  .then(function (roles) {
    return tab.setRoles(roles);
  });
};

exports.createTab = function (req, res) {
  //build the new tab
  var tab = {};
  tab.title = req.body.title;
  tab.uisref = req.body.uisref;
  tab.roles = req.body.roles;

  //create the tab
  Tab.create(tab)
  .then(function (newTab) {
    //add the roles to the newtab
    return addRoles(newTab, tab.roles)
      .then(function () {
        return newTab.getRoles();
      })
      .then(function (roles) {
        return Tab.find({
          where: {
            id: newTab.id
          },
          include: [{model: Role}]
        });
      })
      .then(function (tab) {
        res.send(tab);
      });
  })
  .catch(function (err) {
    res.status(500).send('Database error: Tab could not be created.');
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
