'use strict';

angular.module('superjeuApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/game'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/myself', {
        templateUrl: 'views/myself.html',
        controller: 'MyselfCtrl'
      })
      .when('/questions/new', {
        templateUrl: 'views/question/new.html',
        controller: 'QuestionnewCtrl'
      })
      .when('/questionsets/new', {
        templateUrl: 'views/questionset/new.html',
        controller: 'QuestionsetnewCtrl'
      })
      .when('/question/edit', {
        templateUrl: 'views/question/new.html',
        controller: 'QuestioneditCtrl'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  });
