'use strict';

var _ = require('lodash');
var glob = require('glob');

exports.getFiles = getFiles;

//////////

function getFiles(filePaths) {
  var output = [];
  _.each(filePaths, handlePath);
  return output;

  //////////

  function handlePath(filePath){
    var urlRegex = new RegExp('[*]');
    if(!urlRegex.test(filePath)){
      output.push(filePath);
    } else {
      output = output.concat(glob.sync(filePath));
    }
  }
}

