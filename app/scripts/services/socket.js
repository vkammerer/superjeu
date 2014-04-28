'use strict';

angular.module('superjeuApp')
  .factory('socket', function ($rootScope) {
    var socket;
  return {
    connect: function(){
      socket = io.connect(window.VK_SOCKET_URI);
    },
    reconnect: function(){
      socket.socket.connect();
    },
    disconnect: function(){
      socket.disconnect();
    },
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});