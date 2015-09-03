'use strict';

angular.module('tropicalbs')
  .factory('Nav', function ($http, $location, $window) {

    var nav = {};
    nav.tabs = [
      { title:'Home', href:'#/home', uisref:'home', visibleRoles: ['public', 'user', 'admin', 'owner']},
      { title:'Blog', href:'#/blog', uisref:'blog', visibleRoles: ['public', 'user', 'admin', 'owner']},
      { title:'About', href:'#/about', uisref:'about', visibleRoles: ['public', 'user', 'admin', 'owner']},
      { title:'Admin', href:'#/admin', uisref:'admin', visibleRoles: ['admin', 'owner']}
    ];


    return nav;
  });
