'use strict';

angular.module('tropicalbs')
  .controller('AdminUsersController', AdminUsersController);

AdminUsersController.$inject = ['$state', '$mdSidenav', 'authService', 'navService', 'userService'];

/**
 * Manages the view of navigation tabs
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Service that manages authentication
 * @param {CustomService} Service that manages navigation
 * @param {CustomService} Service that manages user sessions
 */
function AdminUsersController ($state, $mdSidenav, authService, navService, userService) {
  var vm = this;
  vm.state = $state;
  vm.user = userService.currentUser;

}
