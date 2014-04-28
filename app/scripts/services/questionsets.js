'use strict';

angular.module('superjeuApp')
  .factory('questionsets', function ($rootScope, $http) {
    return {
      fetch : function(callback){
        $http.get(window.VK_API_QUESTIONSET_LIST_URL)
          .success(function(data){
            callback(data);
          })
          .error(function(data){
            return false;
            alert(data.message)
          })      
      }      
    }
});