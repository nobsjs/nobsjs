'use strict';

angular.module('tropicalbs')
	.controller('NavigationController', NavigationController);

NavigationController.$inject = ['$state', 'AuthService', 'NavService', 'UserService'];

function NavigationController ($state, AuthService, NavService, UserService) {
  var vm = this;
  vm.logout = AuthService.logout;
  vm.state = $state;
  vm.tabs = [];
  vm.user = UserService.currentUser;

  activate ();

  //////////

  function activate () {
    vm.tabs = _.filter(NavService.tabs, function (tab) {
    //intersection returns empty array when no intersection is found
    //thus we can use this to determine whether or not a tab should be visible
    return _.intersection(tab.visibleRoles, vm.user.roles).length > 0;
    });
  }
}
