'use strict';

angular.module('tropicalbs')
  .controller('AdminTabsController', AdminTabsController);

AdminTabsController.$inject =  ['tabsService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function AdminTabsController (tabsService) {
  var vm = this;
  vm.tabs = [];
  vm.readonly = true;

  activate();

  //////////

  /**
   * Queries the database to get all Tabs
   */
  function activate () {
    //do stuff
    tabsService.getAllTabs()
      .then(setAllTabs);
  }

  function setAllTabs (res) {
    vm.tabs = res;
  }
}
