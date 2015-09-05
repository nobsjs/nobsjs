'use strict';

angular.module('tropicalbs')
	.controller('NavigationController', NavigationController);

NavigationController.$inject = ['$state', 'authService', 'navService', 'userService'];

/**
 * Manages the view of navigation tabs
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Service that manages authentication
 * @param {CustomService} Service that manages navigation
 * @param {CustomService} Service that manages user sessions
 */
function NavigationController ($state, authService, navService, userService) {
  var vm = this;
  vm.logout = authService.logout;
  vm.state = $state;
  vm.tabs = [];
  vm.user = userService.currentUser;
  vm.login = login;
  vm.signup = signup;

  activate ();

  //////////

  /**
   * Initial set-up of navigation tabs
   */
  function activate () {
    vm.tabs = _.filter(navService.tabs, function (tab) {
    // intersection returns empty array when no intersection is found
    // thus we can use this to determine whether or not a tab should be visible
    return _.intersection(tab.visibleRoles, vm.user.roles).length > 0;
    });
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
}
