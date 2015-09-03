'use strict';

angular.module('tropicalbs')
  .controller('HomeController', HomeController);

function HomeController () {
  var vm = this;
  vm.content = 'this is some controller generated content';
}
