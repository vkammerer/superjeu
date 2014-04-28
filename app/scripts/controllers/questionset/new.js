'use strict';

angular.module('superjeuApp')
  .controller('QuestionsetnewCtrl',[
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

      $scope.submitbuttontext = 'Create question set';

      $scope.submitForm = function(){
        $http.post(window.VK_API_QUESTIONSET_CREATE_URL, $scope.questionset)
          .success(function(){
            $scope.submitbuttontext = 'cool';
  //          $location.path( "/game" );
          })
          .error(function(data){
            alert(data.message)
          })
      };
    }
    sessionManager.check(init);
  }]);
