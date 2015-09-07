'use strict';

angular.module('tropicalbs')
	.controller('PagesController', PagesController);

PagesController.$inject = ['$state', 'pagesService'];

/**
 * Manages the view of an individual page
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Service than manages custom pages
 */
function PagesController ($state, pagesService) {
  var vm = this;
  vm.title = '';
  vm.content = '';

  activate();

  //////////

  /**
   * Retrieves the page and loads data into the view model
   */
  function activate() {
    pagesService.getPage()
      .then(setPageView);
  }

  function setPageView (res) {
    vm.title = res.title;
    vm.content = res.content;
  }
}
