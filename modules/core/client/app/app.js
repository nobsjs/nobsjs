'use strict';

// defines main app and inject dependencies
angular
  .module('nobsjs', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngCookies',
    'textAngular'
  ])
  .run(runBlock);

runBlock.$inject = ['$cookies', '$location', '$rootScope', 'authService', 'userService'];

function runBlock ($cookies, $location, $rootScope, authService, userService) {
  $rootScope.$on('$stateChangeStart', function (evt, next, nextParams, current, currentParams) {
    if (next && !userService.isLoggedIn && $cookies.get('userToken')) {
      authService.checkAuth();
    }
  });
}
