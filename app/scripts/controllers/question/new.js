'use strict';

angular.module('superjeuApp')
  .controller('QuestionnewCtrl',[
    '$scope',
    '$http',
    '$location',
    'questionsets',
    'sessionManager',
    function (
      $scope,
      $http,
      $location,
      questionsets,
      sessionManager
    ){
    var init = function(){

      questionsets.fetch(function(questionsets){
        console.log(questionsets)
        $scope.questionsets = questionsets.questionsets
      })
      $scope.submitbuttontext = 'Create question';

      $scope.submitForm = function(){
        $http.post(window.VK_API_QUESTION_CREATE_URL, $scope.question)
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



