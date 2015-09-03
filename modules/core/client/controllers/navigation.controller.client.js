'use strict';

angular.module('tropicalbs')
	.controller('NavigationController', NavigationController);

NavigationController.$inject = ['$state', 'Auth', 'Nav', 'User'];

/**
 * Manages the view of navigation tabs
 *
 * @param {AngularService} $state UI-router service
 * @param {CustomService} Auth authentication service
 * @param {CustomService} Nav service that manages the navigation object
 * @param {CustomService} User service that manages user sessions
 */
function NavigationController ($state, Auth, Nav, User) {
  var vm = this;
  vm.logout = Auth.logout;
  vm.state = $state;
  vm.tabs = [];
  vm.user = User.currentUser;

  activate ();

  //////////

  /**
   * Initial set-up of navigation tabs
   */
  function activate () {
    vm.tabs = _.filter(Nav.tabs, function (tab) {
    // intersection returns empty array when no intersection is found
    // thus we can use this to determine whether or not a tab should be visible
    return _.intersection(tab.visibleRoles, vm.user.roles).length > 0;
    });
  }
}
