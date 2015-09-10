'use strict';

angular.module('tropicalbs')
  .controller('EditUserController', EditUserController);

EditUserController.$inject = ['$scope', '$mdDialog', 'allUsersService', 'user'];

/**
 * Manages the view of navigation tabs
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Service that manages authentication
 * @param {CustomService} Service that manages navigation
 * @param {CustomService} Service that manages user sessions
 */

function EditUserController ($scope, $mdDialog, allUsersService, user) {
  var vm = this;

  vm.cancel = cancel;
  vm.save = save;
  vm.user = user;

  // Add role autocomplete variables below
  vm.querySearch = querySearch;
  vm.roles = [];
  vm.selectedRole = null;
  vm.searchText = null;
  vm.selectedRoleChange = selectedRoleChange;

  activate();

  ///////////

  function activate () {
    allUsersService.getStrippedRoles()
      .then(setRoles);

    //////////

    function setRoles (roles) {
      vm.roles = roles;
    }
  }

  function cancel () {
    $mdDialog.cancel();
  }

  function save () {
    // TODO: start a spinner here
    allUsersService.updateUser(vm.user)
      .then(showSuccess)
      .catch(displayError);

    //////////

    function displayError (err) {
      // TODO: display so sort of error
    }

    function showSuccess () {
      $mdDialog.hide();
    }
  }

  /**
   * Create filter function for a query string
   */

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(role) {
      return (role.indexOf(lowercaseQuery) === 0);
    };
  }

  /**
   * Search for roles.
   */

  function querySearch (query) {
    var results = query ? vm.roles.filter( createFilterFor(query) ) : vm.roles;
    return results;
  }

  function selectedRoleChange (role) {
    // TODO: Do stuff with the selected role
  }
}
