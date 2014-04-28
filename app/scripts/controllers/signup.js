'use strict';

angular.module('superjeuApp')
  .controller('SignupCtrl',[
    '$rootScope',
  	'$scope',
  	'$http',
  	'$location',
  	function (
      $rootScope,
    	$scope,
    	$http,
    	$location
  	){

    $scope.title = 'Signup'

    $scope.signup = function(user){
    	$http.post(window.VK_API_SIGNUP_URL, user)
      	.success(function(){
      		$location.path( "/game" );
      	})
      	.error(function(data){
      		alert(data.message)
      	})
    };
  }]);
