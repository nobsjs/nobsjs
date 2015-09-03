'use strict';

angular.module('tropicalbs')
	.controller('NavigationController', NavigationController);

NavigationController.$inject = ['$state', 'Auth', 'Nav', 'User'];

function NavigationController ($state, Auth, Nav, User) {
  var vm = this;
  vm.logout = Auth.logout;
  vm.state = $state;
  vm.tabs = [];
  vm.user = User.currentUser;

  activate ();

  function activate () {
    vm.tabs = _.filter(Nav.tabs, function (tab) {
    //intersection returns empty array when no intersection is found
    //thus we can use this to determine whether or not a tab should be visible
    return _.intersection(tab.visibleRoles, vm.user.roles).length > 0;
    });
  }
}
