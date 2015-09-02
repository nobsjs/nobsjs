'use strict';

// defines main app and inject dependencies
// TODO: load all modules and controllers dynamically
angular
  .module('tropicalbs', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngCookies'
  ])
  .run(runBlock);

runBlock.$inject = ['$rootScope', '$location', '$cookies', 'Auth', 'User'];

function runBlock($rootScope, $location, $cookies, Auth, User) {
  $rootScope.$on('$stateChangeStart', function (evt, next, nextParams, current, currentParams) {
    if (next && !User.isLoggedIn && $cookies.get('userToken')) {
      Auth.checkAuth();
    }
  });
}


  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup

