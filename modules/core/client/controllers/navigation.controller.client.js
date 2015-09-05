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

  activate();

  //////////

  /**
   * Initial set-up of navigation tabs
   */
  function activate () {
    filterTabs();
  }

  function filterTabs () {
    vm.tabs = _.filter(navService.getTabs(), function (tab) {
    // intersection returns empty array when no intersection is found
    // thus we can use this to determine whether or not a tab should be visible
    return _.intersection(tab.visibleRoles, vm.user.roles).length > 0;
    });
  }
}
