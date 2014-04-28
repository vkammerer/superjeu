'use strict';

angular.module('superjeuApp')
  .directive('vkmenu', [
    '$rootScope',
    '$http',
    '$location',
    'socket',
    function(
        $rootScope,
        $http,
        $location,
        socket
    ){
    return {
        restrict: 'E',
        templateUrl: 'views/menu.html',
        link: function($scope) {
            $scope.menu = {
              isopen : false
            }
            $scope.links = [
                { text :'Sign up', href: '#/signup'},
                { text :'Sign in', href: '#/signin'}
            ]                

            $scope.logout = function(user){
              $http.get(window.VK_API_LOGOUT_URL)
                .success(function(){
                    socket.disconnect();
                    $rootScope.user = null;                    
                    $location.path( "/signin" );
                })
                .error(function(){
                  alert('Unable to logout')
                })
            };
            $scope.$watch('user', function (){
                var userLength = 0;
                for (var o in $scope.user) {
                    if (o == '_id') userLength++;
                }
                if ($scope.user && (userLength > 0)) {
                    $scope.title = $scope.user.firstname;
                    $scope.links = [
                        { text :'Game', href: '#/game'},
                        { text :'Myself', href: '#/myself'},
                        { text :'Create question', href: '#/questions/new'},
                        { text :'Create question set', href: '#/questionsets/new'}
                    ]                
                }
            })

            $scope.togglemenu = function(){
                $scope.menu.isopen = !$scope.menu.isopen
            }
        }
    };
}]);
