'use strict';

angular.module('nobsjs')
  .controller('EditTabDialogueController', EditTabDialogueController);

EditTabDialogueController.$inject =  ['$mdDialog', 'allUsersService', 'rolesService', 'tab', 'tabsService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function EditTabDialogueController ($mdDialog, allUsersService, rolesService, tab, tabsService) {
  var vm = this;
  vm.cancel = cancel;
  vm.hide = hide;
  vm.saveAction = saveAction;
  vm.tab = {};
  vm.title = '';

  // Add role autocomplete variables below
  vm.querySearch = rolesService.queryAvailableRoles;
  vm.searchText = null;

  activate();

  //////////

  /**
   * Initiates the values of the view
   */
  function activate () {
    _.assign(vm.tab, tab);
    vm.title = 'Edit Tab';
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
    tabsService.updateTab(vm.tab, tab.id)
      .then(showSuccess)
      .catch(displayError);
  }

  function showSuccess () {
    $mdDialog.hide();
  }
}
