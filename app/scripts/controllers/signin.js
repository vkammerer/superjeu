'use strict';

angular.module('superjeuApp')
  .controller('SigninCtrl',[
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

    $scope.title = 'Signin'

    $scope.signin = function(user){
    	$http.post(window.VK_API_SESSION_URL, user)
      	.success(function(data){
          $rootScope.user = data;
      		$location.path( "/game" );
      	})
      	.error(function(data){
      		alert(data.message)
      	})
    };
  }]);
