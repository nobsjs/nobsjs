'use strict';

var glob = require('glob');
var _ = require('lodash');

exports.getFiles = function (filePaths) {
  var output = [];
  _.each(filePaths, function (filePath){
    var urlRegex = new RegExp('[*]');
    if(!urlRegex.test(filePath)){
      output.push(filePath);
    } else {
      output = output.concat(glob.sync(filePath));
    }
  });
  return output;
};

