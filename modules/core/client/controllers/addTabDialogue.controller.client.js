'use strict';

angular.module('nobsjs')
  .controller('AddTabDialogueController', AddTabDialogueController);

AddTabDialogueController.$inject =  ['$mdDialog', 'allUsersService', 'rolesService', 'tabsService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function AddTabDialogueController ($mdDialog, allUsersService, rolesService, tabsService) {
  var vm = this;
  vm.cancel = cancel;
  vm.hide = hide;
  vm.saveAction = saveAction;
  vm.tab = {};
  vm.title = '';

  // Add role autocomplete variables below
  vm.searchText = null;
  vm.querySearch = rolesService.queryAvailableRoles;

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
  }

  function cancel () {
    $mdDialog.cancel();
  }

  function displayError(err) {
    //TODO
  }

  function hide () {
    $mdDialog.hide();
  }

  /**
   * Saves the user submitted information
   */
  function saveAction () {
    tabsService.createTab(vm.tab)
      .then(showSuccess)
      .catch(displayError);
  }

  function showSuccess () {
    $mdDialog.hide();
  }

}
