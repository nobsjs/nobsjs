'use strict';

var path = require('path');

var db = require(path.resolve('./lib/db.js'));

exports.createTab = createTab;
exports.deleteTab = deleteTab;
exports.getTabById = getTabById;
exports.getTabs = getTabs;
exports.sendTab = sendTab;
exports.updateTab = updateTab;

/////////

/**
    * Helper function that adds role associations to a tab
    *
    * @param {sequelizeModel} tab - the sequelize tab model to which we want to attach roles
    * @param {Array} roles - array of strings representing the names of the roles we want attached to the tab
    * @returns {Promise} - returns a promise - resolved value is the array of roles that were just added to the tab
    */
function addRolesToTab (tab, roles) {
  // Create an array to use with the $or operator
  var or = [];
  roles.forEach(function (role) {
    or.push({name: role});
  });

  // Query for getting role models from the database
  var roleQuery = {
    where: {
      $or: or
    }
  };

  // Set locate the appropriate roles and associate them with our tab
  return db.Role.findAll(roleQuery)
    .then(setRoles)
    .then(returnTab);

  function returnTab () {
    return tab;
  }

  function setRoles (roles) {
    // tab.setRoles is provided by Sequelize associations
    return tab.setRoles(roles);
  }
}

/**
  * Create a tab
  *
  * @param {ExpressRequestObject} req The request object generated by express.
  * @param {ExpressResponseObject} res The response object generated by express.
  */

function createTab (req, res) {
  // Build the new tab
  var newTab = {};
  newTab.title = req.body.title;
  newTab.uisref = req.body.uisref;
  newTab.visibleRoles = req.body.visibleRoles || ['owner', 'admin'];
  if(newTab.visibleRoles.length === 0) {
    newTab.visibleRoles.push(null);
  }

  // Create the tab
  db.Tab.create(newTab)
    .then(addRoles)
    .then(sendTab)
    .catch(sendError);

  //////////

  /**
    * Helper function that invokes our helper function with the desired roles
    *
    * @param {sequelizeModel} tab - the sequelize tab model that was just created
    * @returns {promise} - returns a promise - resolved value is the array of roles that were just added to the tab
    */
  function addRoles (tab) {
    return addRolesToTab(tab, newTab.visibleRoles);
  }

  /**
    * Helper function that creates and returns the tab object with only the information the client needs
    */
  function sendTab (tab) {
    var resTab = tab.get({plain: true});
    resTab.visibleRoles = newTab.visibleRoles;
    res.send(resTab);
  }

  function sendError (err) {
    res.status(500).send('Database error: Tab could not be created.');
  }
}

/**
 * Delete tab given in request
 *
 * @param {ExpressRequestObject} req The request object generated by express.
 * @param {ExpressResponseObject} res The response object generated by express.
 */

function deleteTab (req, res) {
  var tabQuery = {
    where: {
      id: req.tab.id
    }
  };
  db.Tab.destroy(tabQuery)
    .then(sendSuccess)
    .catch(sendError);

    //////////

    function sendSuccess (arg) {
      res.status(200).send('Tab deleted');
    }

    function sendError () {
      res.status(500).send('Database Error: could not delete tab');
    }
}

/**
  * Gets a tab by a specific id
  *
  * @param {ExpressRequestObject} req The request object generated by express.
  * @param {ExpressResponseObject} res The response object generated by express.
  * @param {function} next invokes next route function
  * @param {string} id - id of the tab from URL parameter
  */

function getTabById (req, res, next, id) {

  var tabQuery = {
    include: [{all: true}],
    where: {
      id: id
    }
  };

  db.Tab.findOne(tabQuery)
    .then(setTab)
    .catch(sendError);

  //////////

  function setTab (tab) {
    req.tab = tab;
    next();
  }

  function sendError () {
      res.status(404).send('Database Error: could not find tab');
    }
}

/**
 * Get all tabs from database and join their associated roles to the result
 *
 * @param {ExpressRequestObject} req The request object generated by express.
 * @param {ExpressResponseObject} res The response object generated by express.
 */

function getTabs (req, res) {

  var tabQuery = {
    include: [{model: db.Role}]
  };

  db.Tab.findAll(tabQuery)
    .then(processTabsAndSend)
    .catch(sendError);

  //////////

  function processTabsAndSend (tabs) {
    var response = [];
    tabs.forEach(function (tab) {
      var tempTab = tab.get({plain: true});
      tempTab.visibleRoles = [];
      tab.Roles.forEach(function (role) {
        tempTab.visibleRoles.push(role.name);
      });
      delete tempTab.Roles;
      response.push(tempTab);
    });
    res.send(response);
  }

  function sendError (err) {
    res.send(err);
  }
}

/**
 * Send tab back - This works because getTabById middleware has already attached the tab
 * to the req object
 *
 * @param {ExpressRequestObject} req The request object generated by express.
 * @param {ExpressResponseObject} res The response object generated by express.
 */

function sendTab (req, res) {
  if(req.tab) {
    var resTab = req.tab.get({plain: true});
    resTab.visibleRoles = [];
    req.tab.Roles.forEach(function (role) {
      resTab.visibleRoles.push(role.name);
    });
    res.send(resTab);
  } else {
    res.status(404).send('Tab not found');
  }
}

/**
 * Update tab
 *
 * @param {ExpressRequestObject} req The request object generated by express.
 * @param {ExpressResponseObject} res The response object generated by express.
 */

function updateTab (req, res) {
  var updates = {};
  updates.title = req.body.title || req.tab.title;
  updates.uisref = req.body.uisref || req.tab.uisref;
  req.tab.updateAttributes(updates)
    .then(setRoles)
    .then(sendUpdatedTab)
    .catch(sendError);

  //////////

  function setRoles (tab) {
    // if no visibleRoles array on request, make no changes to associations and return the tab object to the next promise
    if(!req.body.visibleRoles) {
      return tab;
    } else {
      //if it's empty, set it to null
      if(req.body.visibleRoles.length === 0) {
        req.body.visibleRoles.push(null);
      }
      return addRolesToTab(tab, req.body.visibleRoles);
    }
  }

  function sendUpdatedTab (tab) {
    var resTab = tab.get({plain: true});
    delete resTab.Roles;
    resTab.visibleRoles = req.body.visibleRoles;
    res.send(resTab);
  }

  function sendError () {
    res.status(500).send('Database Error: could not update tab');
  }
}
