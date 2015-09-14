'use strict';

angular.module('nobsjs')
  .controller('EditTabDialogueController', EditTabDialogueController);

EditTabDialogueController.$inject =  ['$mdDialog', 'tab', 'tabsService', 'allUsersService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function EditTabDialogueController ($mdDialog, tab, tabsService, allUsersService) {
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
  vm.selectedRole = null;
  vm.selectedRoleChange = selectedRoleChange;

  activate();

  //////////

  function activate () {
    _.assign(vm.tab, tab);
    vm.title = 'Edit Tab';
    console.log(vm.tab);
    // console.log('activated');
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
    console.log(err);
  }

  function hide () {
    $mdDialog.hide();
  }

  /**
   * Search for roles.
   */
  function querySearch (query) {
    var results = query ? vm.availableRoles.filter( createFilterFor(query) ) : vm.availableRoles;
    // console.log('available', vm.availableRoles, 'querysearch', results);
    return results;
  }

  /**
   * Saves the user submitted information
   */
  function saveAction () {
    tabsService.updateTab(vm.tab, tab.id)
      .then(showSuccess)
      .catch(displayError);
  }

  function selectedRoleChange (role) {
    // TODO: Do stuff with the selected role
  }

  function setAvailableRoles (roles) {
    // console.log('before', vm.availableRoles);
    vm.availableRoles = roles;
    // console.log('after', vm.availableRoles);
  }

  function showSuccess (stuff) {
    console.log('success');
    if(stuff) {
      console.log(stuff);
    }
    $mdDialog.hide();
  }
}
