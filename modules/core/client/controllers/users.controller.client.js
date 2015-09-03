'use strict';
angular.module('tropicalbs')
  .controller('UsersController', UsersController);

UsersController.$inject = ['Auth', '$window', '$location', 'User'];

/**
 * Manages the login and signup views
 *
 * @param {CustomService} Auth authentication service
 * @param {AngularService} $window Angular service that references the browser window
 * @param {AngularService} $location Angular service that references the URL location in the browser
 * @param {CustomService} User service that manages user sessions
 */
function UsersController (Auth, $window, $location, User) {
  var vm = this;
  vm.login = login;
  vm.signup = signup;
  vm.user = {};

  //////////

  /**
   * Calls the login Authentication service and then redirects to the home
   */
  function login () {
    Auth.login(vm.user)
      .then(function () {
        $location.path('/home');
      })
      .catch(function (error) {
        // ng-message looks for key vaue pairs on the $error object of the form field. since the form is
        // 'loginForm' and the password field is named 'password', we are able to attach the 'reject'
        // property to the $error object when login fails. This allows us to put a 'ng-message="reject"'
        // directive in the login view, informing the user that their attempt was unsuccessful
        vm.loginForm.password.$error.reject = true;
      });
  }

  /**
   * Calls the signup Authentication service and then redirects to the home
   */
  function signup () {
    Auth.signup(vm.user)
      .then(function () {
        $location.path('/home');
      })
      .catch(function (error) {
        // ng-message looks for key vaue pairs on the $error object of the form field. since the form is
        // 'loginForm' and the password field is named 'password', we are able to attach the 'reject'
        // property to the $error object when login fails. This allows us to put a 'ng-message="reject"'
        // directive in the login view, informing the user that their attempt was unsuccessful
        vm.signupForm.email.$error.reject = true;
      });
  }

}
