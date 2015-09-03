'use strict';
angular.module('tropicalbs')
  .controller('UsersController', UsersController);

UsersController.$inject = ['AuthService', '$window', '$location', 'UserService'];

function UsersController (AuthService, $window, $location, UserService) {
  var vm = this;
  vm.login = login;
  vm.signup = signup;
  vm.user = {};

  //////////

  function login () {
    AuthService.login(vm.user)
      .then(function () {
        $location.path('/home');
      })
      .catch(function (error) {
        //ng-message looks for key vaue pairs on the $error object of the form field. since the form is
        //'loginForm' and the password field is named 'password', we are able to attach the 'reject'
        //property to the $error object when login fails. This allows us to put a 'ng-message="reject"'
        //directive in the login view, informing the user that their attempt was unsuccessful
        vm.loginForm.password.$error.reject = true;
      });
  }

  function signup () {
    AuthService.signup(vm.user)
      .then(function () {
        $location.path('/home');
      })
      .catch(function (error) {
        //see comment for signup above
        vm.signupForm.email.$error.reject = true;
      });
  }

}
