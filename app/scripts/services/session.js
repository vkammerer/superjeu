'use strict';

angular.module('superjeuApp')
  .factory('sessionManager', [
    '$rootScope',
    '$http',
    '$location',
    function ($rootScope, $http, $location) {
      return {
        check: function (callback) {
          var userLength = 0;
          for (var o in $rootScope.user) {
              userLength++;
          }
          if ($rootScope.user && (userLength > 0)) {
            callback();
          }
          else {
            $http.get(window.VK_API_MYSELF_URL)
            .success(function(data){
              $rootScope.user = data;
              callback();
            })
            .error(function(){
              $location.path( "/signin" );
            })            
          }
        }
      };
    }
]);