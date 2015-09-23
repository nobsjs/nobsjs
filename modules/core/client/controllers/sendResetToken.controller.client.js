'use strict';

angular.module('nobsjs')
  .controller('SendResetTokenController', SendResetTokenController);

SendResetTokenController.$inject = ['$state', '$window', 'authService'];

/**
 * Manages the Resetting of Forgotten Passwords
 *
 * @param {AngularService} $location Angular service that references the URL location in the browser
 * @param {AngularService} $window Angular service that references the browser window
 * @param {CustomService} authService that manages authentication
 */
function SendResetTokenController ($state, $window, authService) {
  var vm = this;
  vm.resetPassword = resetPassword;
  vm.sendResetToken = sendResetToken;
  vm.user = {};

  //////////

  function resetPassword () {
    authService.resetPassword(vm.user)
      .then(sendToLogin);
  }

  function sendResetToken () {
    authService.sendResetToken(vm.user)
      .then(sendToReset);
  }

  function sendToLogin () {
    $state.go('login');
  }

  function sendToReset () {
    $state.go('resetPassword');
  }
}
