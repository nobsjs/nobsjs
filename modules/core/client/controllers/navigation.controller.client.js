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
  vm.goToTabs = goToTabs;
  vm.login = login;
  vm.logout = authService.logout;
  vm.openAdminSidenav = openAdminSidenav;
  vm.pages = goToPages;
  vm.signup = signup;
  vm.state = $state;
  vm.tabs = [];
  vm.user = userService.currentUser;
  vm.users = users;
  vm.userIsAdmin = userIsAdmin;

  activate();

  //////////

  /**
   * Initial set-up of navigation tabs
   */
  function activate () {
    vm.tabs = navService.getUserTabs();
  }

  function goToPages () {
    $mdSidenav('admin').toggle();
    $state.go('pagesList');
  }

  function goToTabs () {
    $mdSidenav('admin').toggle();
    $state.go('adminTabs');
  }

  /**
   * Redirects state to login page
   */
  function login () {
    $state.go('login');
  }

  function openAdminSidenav () {
    $mdSidenav('admin').toggle();
  }

  /**
   * Redirects state to signup page
   */

  function signup () {
    $state.go('signup');
  }

  function users () {
    $mdSidenav('admin').toggle();
    $state.go('users');
  }

  function userIsAdmin () {
    return userService.hasRole(['admin', 'owner']);
  }
}
