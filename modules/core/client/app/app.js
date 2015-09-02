'use strict';

// defines main app and inject dependencies
// TODO: load all modules and controllers dynamically
var tropicalbs = angular.module('tropicalbs', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngCookies'
  ]);

tropicalbs.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    // MAIN PARENT ROUTE ========
    .state('app', {
      templateUrl: '../../../../modules/core/client/views/app.view.client.html',
      abstract: true,
      controller: 'AppController'
    });

  $httpProvider.interceptors.push('AttachTokens');

}])
.factory('AttachTokens', ['$window', '$cookies', function ($window, $cookies) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (req) {
      var jwt = $cookies.get('userToken');
      if (jwt) {
        req.headers['x-access-token'] = jwt;
      }
      req.headers['Allow-Control-Allow-Origin'] = '*';
      return req;
    }
  };
  return attach;
}])
.run(['$rootScope', '$location', '$cookies', 'Auth', 'User', function ($rootScope, $location, $cookies, Auth, User) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$stateChangeStart', function (evt, next, nextParams, current, currentParams) {
    if (next && !User.isLoggedIn && $cookies.get('userToken')) {
      Auth.checkAuth();
    }
  });
}]);

tropicalbs.config(['$mdThemingProvider', function ($mdThemingProvider) {
   // Configure a dark theme with primary foreground yellow
   $mdThemingProvider.theme('docs-dark', 'default')
       .primaryPalette('yellow');
 }]);
