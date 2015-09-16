'use strict';

angular.module('nobsjs')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$state', '$window', 'authService', 'userService'];

/**
 * Manages the login and signup views
 *
 * @param {AngularService} $location Angular service that references the URL location in the browser
 * @param {AngularService} $window Angular service that references the browser window
 * @param {CustomService} Service that manages authentication
 * @param {CustomService} Service that manages user sessions
 */
function UsersController ($state, $window, authService, userService) {
  var vm = this;
  vm.login = login;
  vm.signup = signup;
  vm.user = {};

  //////////

  /**
   * Calls the login Authentication service and then redirects to the home
   */
  function login () {
    authService.login(vm.user)
      .then(sendHome)
      .catch(loginReject);
  }

  function loginReject (err) {
    // ng-message looks for key vaue pairs on the $error object of the form field. since the form is
    // 'loginForm' and the password field is named 'password', we are able to attach the 'reject'
    // property to the $error object when login fails. This allows us to put a 'ng-message="reject"'
    // directive in the login view, informing the user that their attempt was unsuccessful
    vm.loginForm.password.$error.reject = true;
  }

  function sendHome () {
    $state.go('home');
  }

  /**
   * Calls the signup Authentication service and then redirects to the home
   */
  function signup () {
    authService.signup(vm.user)
      .then(sendHome)
      .catch(signupReject);
  }

  function signupReject (err) {
    // ng-message looks for key vaue pairs on the $error object of the form field. since the form is
    // 'signupForm' and the password field is named 'password', we are able to attach the 'reject'
    // property to the $error object when login fails. This allows us to put a 'ng-message="reject"'
    // directive in the login view, informing the user that their attempt was unsuccessful
    vm.signupForm.email.$error.reject = true;
  }
}
