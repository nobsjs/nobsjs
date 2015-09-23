'use strict';

angular.module('nobsjs')
  .config(userRoutes);

userRoutes.$inject = ['$stateProvider'];

function userRoutes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '../../../../modules/core/client/views/login.view.client.html',
      controller: 'UsersController',
      controllerAs: 'vm'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '../../../../modules/core/client/views/signup.view.client.html',
      controller: 'UsersController',
      controllerAs: 'vm'
    })
    .state('sendResetToken', {
      url: '/sendresettoken',
      templateUrl: '../../../../modules/core/client/views/sendResetToken.view.client.html',
      controller: 'SendResetTokenController',
      controllerAs: 'vm'
    })
    .state('resetPassword', {
      url: '/resetpassword',
      templateUrl: '../../../../modules/core/client/views/resetPassword.view.client.html',
      controller: 'SendResetTokenController',
      controllerAs: 'vm'
    });
}
