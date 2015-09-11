'use strict';

angular.module('nobsjs')
  .controller('AllUsersController', AllUsersController);

AllUsersController.$inject = ['$scope', '$state', '$mdSidenav', '$mdDialog', 'authService', 'navService', 'userService', 'allUsersService'];

/**
 * Manages the view of navigation tabs
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Service that manages authentication
 * @param {CustomService} Service that manages navigation
 * @param {CustomService} Service that manages user sessions
 */

function AllUsersController ($scope, $state, $mdSidenav, $mdDialog, authService, navService, userService, allUsersService) {
  var vm = this;

  vm.deleteUser = deleteUser;
  vm.openModal = openModal;
  vm.roles = [];
  vm.state = $state;
  vm.user = userService.currentUser;
  vm.users = [];

  activate();

  //////////

  /**
   * Function to run on controller load.
   */

  function activate () {
    allUsersService.getStrippedRoles()
      .then(setRoles);

    allUsersService.getUsers()
      .then(setUsers);

    //////////

    /**
     * Set roles from the database to vm object.
     */

    function setRoles (roles) {
      vm.roles = roles;
    }

    function setUsers (users) {
      vm.users = _.map(users, function (user) {
        return user;
      });
    }
  }

  /**
   * Delete a user.
   */

  function deleteUser (ev, user) {
    openConfirmDialog(user)
      .then(deleteUserFromDatabase)
      .then(showSuccess)
      .catch(showError);

    //////////

    function deleteUserFromDatabase (user) {
      deleteUserFromScope(user);
      return allUsersService.deleteUser(user);
    }

    function deleteUserFromScope (user) {
      var index = vm.users.indexOf(user);
      vm.users.splice(index, 1);
      return allUsersService.deleteUser(user);
    }

    function showSuccess () {
      // TODO: show some sort of success on user successful user deletion
    }

    function showError () {
      // TODO: show some sort of error message indicating user could not be deleted.
    }
  }

  /**
   * Open a dialog to confirm a deletion
   */

  function openConfirmDialog (user) {
    // var confirm = $mdDialog.confirm()
    //   .title('Are you sure you want to delete ' + user.email + '?')
    //   .content('This will delete all the user information and they will not be able to log in.')
    //   .ariaLabel('Delete User')
    //   .ok('Delete')
    //   .cancel('Cancel');

    return $mdDialog.show({
      template:
        '<md-dialog>' +
        '  <md-dialog-content>Are you sure you want to delete {{ vm.user.email }}!</md-dialog-content>' +
        '  <div class="md-actions">' +
        '    <md-button ng-click="vm.hide(vm.user)" class="md-primary">' +
        '      Yes' +
        '    </md-button>' +
        '    <md-button ng-click="vm.cancel()" class="md-primary">' +
        '      No' +
        '    </md-button>' +
        '  </div>' +
        '</md-dialog>',
      controller: 'EditUserController',
      controllerAs: 'vm',
      locals: { user: user }
    });
  }

  /**
   * Open a dialog to edit user information
   */

  function openModal (ev, user) {
    var userCopy = {};
    _.extend(userCopy, user);
    $mdDialog.show({
      controller: 'EditUserController',
      controllerAs: 'vm',
      templateUrl: '../modules/core/client/views/adminEditUserModal.view.client.html',
      parent: angular.element(document.body),
      locals: { user: userCopy },
      clickOutsideToClose: true
    })
    .then(updateLocalUser);
  }

  function updateLocalUser (respData) {
    var updatedUser = respData.config.data;
    var i = _.findIndex(vm.users, function (user) {
      return user.id === updatedUser.id;
    });
    vm.users[i] = updatedUser;
  }
}
