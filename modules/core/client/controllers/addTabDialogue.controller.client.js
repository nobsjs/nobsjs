'use strict';

angular.module('nobsjs')
  .controller('AddTabDialogueController', AddTabDialogueController);

AddTabDialogueController.$inject =  ['$mdDialog', 'tabsService', 'allUsersService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function AddTabDialogueController ($mdDialog, tabsService, allUsersService) {
  var vm = this;
  vm.cancel = cancel;
  vm.hide = hide;
  vm.saveAction = saveAction;
  vm.tab = {};
  vm.title = '';

  // Add role autocomplete variables below
  vm.availableRoles = [];
  vm.querySearch = querySearch;
  vm.searchText = null;

  activate();

  //////////

  /**
   * Initiates the values of the view
   */
  function activate () {
    vm.tab = {
      title: '',
      uisref: '',
      visibleRoles: []
    };
    vm.title = 'Create Tab';
    allUsersService.getStrippedRoles()
      .then(setAvailableRoles);
  }

  function cancel () {
    $mdDialog.cancel();
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor (query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn (role) {
      return (role.indexOf(lowercaseQuery) === 0);
    };
  }

  function displayError(err) {
    //TODO
  }

  function hide () {
    $mdDialog.hide();
  }

  /**
   * Search for roles.
   */
  function querySearch (query) {
    var results = query ? vm.availableRoles.filter( createFilterFor(query) ) : vm.availableRoles;
    return results;
  }

  /**
   * Saves the user submitted information
   */
  function saveAction () {
    tabsService.createTab(vm.tab)
      .then(showSuccess)
      .catch(displayError);
  }

  function setAvailableRoles (roles) {
    vm.availableRoles = roles;
  }

  function showSuccess () {
    $mdDialog.hide();
  }

}
