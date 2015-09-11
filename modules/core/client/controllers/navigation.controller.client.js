'use strict';

angular.module('nobsjs')
	.controller('NavigationController', NavigationController);

NavigationController.$inject = ['$state', '$mdSidenav', 'authService', 'navService', 'userService'];

/**
 * Manages the view of navigation tabs
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Service that manages authentication
 * @param {CustomService} Service that manages navigation
 * @param {CustomService} Service that manages user sessions
 */
function NavigationController ($state, $mdSidenav, authService, navService, userService) {
  var vm = this;
  vm.logout = authService.logout;
  vm.state = $state;
  vm.tabs = [];
  vm.user = userService.currentUser;
  vm.login = login;
  vm.openAdminSidenav = openAdminSidenav;
  vm.signup = signup;
  vm.userIsAdmin = userIsAdmin;
  vm.users = users;

  activate();

  //////////

  /**
   * Initial set-up of navigation tabs
   */
  function activate () {
    vm.tabs = navService.getUserTabs();
  }

  /**
   * Redirects state to login page
   */
  function login () {
    $state.go('login');
  }

  /**
   * Redirects state to signup page
   */
  function signup () {
    $state.go('signup');
  }

  function openAdminSidenav () {
    $mdSidenav('admin').toggle();
  }

  function users () {
    $mdSidenav('admin').toggle();
    $state.go('users');
  }

  function userIsAdmin () {
    return userService.hasRole(['admin', 'owner']);
  }
}
