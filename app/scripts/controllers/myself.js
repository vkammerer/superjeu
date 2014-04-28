'use strict';

angular.module('superjeuApp')
  .controller('MyselfCtrl',[
  	'$scope',
  	'$http',
  	'$location',
    'sessionManager',
  	function (
    	$scope,
    	$http,
    	$location,
      sessionManager
  	){
    var init = function(){
      $scope.title = 'Myself'

      $scope.signup = function(user){
      	$http.post(window.VK_API_SIGNUP_URL, user)
        	.success(function(){
        		$location.path( "/game" );
        	})
        	.error(function(data){
        		alert(data.message)
        	})
      };
    }
    sessionManager.check(init)

}]);
