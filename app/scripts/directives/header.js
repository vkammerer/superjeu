'use strict';

angular.module('superjeuApp')
  .directive('vkheader', ['$location', function($location){
    return {
        restrict: 'E',
        templateUrl: 'views/header.html',
        controller: function($scope) {
        },
        link: function(){
        }
    };
}]);
