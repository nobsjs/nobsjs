'use strict';

angular.module('tropicalbs')
	.controller('PagesController', PagesController);

PagesController.$inject = ['$state', 'Pages'];

function PagesController ($state, Pages) {
  var vm = this;

  activate();
  // Get the page and attach data to the scope
  function activate() {
    Pages.getPage().then(function(res){
      vm.title = res.title;
      vm.content = res.content;
    });
  }
}
