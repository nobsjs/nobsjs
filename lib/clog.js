'use strict';

/**
 * Module Dependencies
 */
var chalk = require('chalk');

exports.green = function(value) {
  console.log(chalk.green(value));
};

exports.red = function(value) {
  console.log(chalk.red(value));
};
