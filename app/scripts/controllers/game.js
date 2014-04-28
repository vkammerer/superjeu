'use strict';

angular.module('superjeuApp')
  .controller('GameCtrl', [
  '$scope',
  '$http',
  '$injector',
  '$location',
  'sessionManager',
  function(
    $scope,
    $http,
    $injector,
    $location,
    sessionManager
    ){
    var init = function(){

      $scope.starter = {
        status : 0,
        text : 'Start'
      }

      var socket = $injector.get('socket');

      var socketLength = 0;
      for (var o in io.sockets) {
          socketLength++;
      }
      console.log($scope.user)
      if (socketLength == 0) {
          socket.connect();  
          socket.on('connect', function () {
            socket.emit('user', $scope.user);
          })
      }
      else {
          socket.reconnect();  
      }
      $scope.$on('$destroy', function(){
        socket.disconnect();
      });

      socket.on('userlist', function (data) {
        $scope.competitors = data;
      })
      socket.on('questionset', function (data) {
        $scope.starter.status = 3;
        $scope.questionset = data.questionset;
        $scope.questionset.hasreplied = false;
      })
      socket.on('start', function (){
        $scope.starter.status = 2;
        $scope.starter.text = 'Go';
      })
      socket.on('end', function (){
        $scope.starter = {
          status : 0,
          text : 'Start'
        }
        $scope.questionset = {};
      })

      $scope.start = function(){
        console.log('start');
        if($scope.starter.text !== 'Waiting') {
          socket.emit('start');
          $scope.starter.status = 1;
          $scope.starter.text = 'Waiting';
        }
      };

      var correctSound = new Howl({
        urls: ['sounds/sprite.wav'],
        sprite: {
          incorrect: [1000, 800],
          correct: [2000, 800]
        }
      });
      $scope.reply = function(answer){
        if(!$scope.questionset.hasreplied) {
          if (answer.iscorrect) {
            correctSound.play('correct');
          }
          else {
            correctSound.play('incorrect');
          }
          socket.emit('reply', answer);
          answer.isreplied = true;
          $scope.questionset.hasreplied = true;
          console.log(answer)        
        }
      };    
    }
    sessionManager.check(init);

}])