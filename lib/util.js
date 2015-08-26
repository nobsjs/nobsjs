'use strict';

var glob = require('glob');
var _ = require('lodash');

exports.getFiles = function (filePaths) {
  var output = [];
  _.each(filePaths, function (filePath){
    var urlRegex = new RegExp('[*]', 'i');
    console.log(urlRegex.test(filePath));
    if(!urlRegex.test(filePath)){
      console.log('TRUE');
      output.push(filePath);
    } else {
      output.concat(glob.sync(filePath));
    }
  });
  return output;
};

