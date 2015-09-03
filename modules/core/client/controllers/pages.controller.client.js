'use strict';

angular.module('tropicalbs')
	.controller('PagesController', PagesController);

PagesController.$inject = ['$state', 'Pages'];

/**
 * Manages the view of an individual page
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Pages service that manages Pages operations
 */
function PagesController ($state, Pages) {
  var vm = this;

  activate();

  //////////

  /**
   * Retrieves the page and loads data into the view model
   */
  function activate() {
    Pages.getPage().then(function(res){
      vm.title = res.title;
      vm.content = res.content;
    });
  }
}
