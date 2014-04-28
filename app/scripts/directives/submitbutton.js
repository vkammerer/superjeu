'use strict';

angular.module('superjeuApp')
  .directive('submitbutton', ['$location', function($location){
    return {
      restrict: 'E',
        scope: {
          submitdestination: "&",
          submittext : "@"
        },
        template: '<button ng-click="submitdestination()" class="pure-button pure-input-1 notice">{{submittext}}</button>',
        link: function(scope, element, attrs){
          element.bind('click', function(){
            scope.submittext = 'Yay'
          })

        }
    };
}]);



