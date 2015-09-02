'use strict';
angular.module('tropicalbs')
  .factory('AttachTokens', AttachTokens);

AttachTokens.$inject = ['$window', '$cookies'];

function AttachTokens($window, $cookies){
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  return {
    request: request
  };

  //////////

  function request (req) {
      var jwt = $cookies.get('userToken');
      if (jwt) {
        req.headers['x-access-token'] = jwt;
      }
      req.headers['Allow-Control-Allow-Origin'] = '*';
      return req;
    }
}



