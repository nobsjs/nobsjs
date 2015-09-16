'use strict';

angular.module('nobsjs')
  .controller('EditUserController', EditUserController);

EditUserController.$inject = ['$scope', '$mdDialog', 'allUsersService', 'rolesService', 'user'];

/**
 * Manages the view of navigation tabs
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Service that manages authentication
 * @param {CustomService} Service that manages navigation
 * @param {CustomService} Service that manages user sessions
 */

function EditUserController ($scope, $mdDialog, allUsersService, rolesService, user) {
  var vm = this;

  vm.cancel = cancel;
  vm.hide = hide;
  vm.save = save;
  vm.user = user;

  // Add role autocomplete variables below
  vm.querySearch = rolesService.queryAvailableRoles;
  vm.searchText = null;
  vm.selectedRole = null;
  vm.selectedRoleChange = selectedRoleChange;

  ///////////

  function cancel () {
    $mdDialog.cancel();
  }

  function hide (user) {
    $mdDialog.hide(user);
  }

  function save () {
    // TODO: start a spinner here
    allUsersService.updateUser(vm.user)
      .then(hide)
      .catch(displayError);

    //////////

    function displayError (err) {
      // TODO: display so sort of error
    }
  }

  function selectedRoleChange (role) {
    // TODO: Do stuff with the selected role
  }
}
