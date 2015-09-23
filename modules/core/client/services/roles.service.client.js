'use strict';

angular.module('nobsjs')
  .factory('rolesService', rolesService);

rolesService.$inject = ['allUsersService', 'tabsService'];

function rolesService (allUsersService, tabsService) {
  var availableRoles;
  var roles = {
    getAvailableRoles: getAvailableRoles,
    queryAvailableRoles: queryAvailableRoles,
    refreshAvailableRoles: refreshAvailableRoles
  };

  refreshAvailableRoles();

  return roles;

  //////////

  /**
   * Create filter function for a query string
   */
  function createFilterFor (query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn (role) {
      return (role.indexOf(lowercaseQuery) === 0);
    };
  }

  /**
   * Returns the list of available roles. Note that this does not call the user service
   */
  function getAvailableRoles () {
    return availableRoles;
  }

  /**
   * Search for roles.
   */
  function queryAvailableRoles (query) {
    var results = query ? availableRoles.filter( createFilterFor(query) ) : availableRoles;
    return results;
  }

  /**
   * Updates the list of available roles by calling the User service.
   * TODO: move this logic from the User service into the Role service
   */
  function refreshAvailableRoles () {
    allUsersService.getStrippedRoles()
      .then(setAvailableRoles);
  }

  function setAvailableRoles (roles) {
    availableRoles = roles;
  }
}
