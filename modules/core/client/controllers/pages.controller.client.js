'use strict';

angular.module('tropicalbs')
	.controller('PagesController', PagesController);

PagesController.$inject = ['$state', 'PagesService'];

function PagesController ($state, PagesService) {
  var vm = this;

  activate();

  //////////
  // Get the page and attach data to the scope
  function activate() {
    PagesService.getPage().then(function(res){
      vm.title = res.title;
      vm.content = res.content;
    });
  }
}
