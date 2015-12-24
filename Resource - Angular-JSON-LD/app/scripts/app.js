'use strict';

/**
 * @ngdoc overview
 * @name webserverApp
 * @description
 * # webserverApp
 *
 * Main module of the application.
 */
angular
  .module('webserverApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularJsonld'
  ])
  .config(function(jsonldContextProvider){
    /* If we need to change the semantics of 'fullName' we just do it here for the entire application */
    jsonldContextProvider.add({
      "schema": "http://schema.org/",
      "foaf": "http://xmlns.com/foaf/0.1/",
      "fullName": "schema:name", /* My client calls 'fullName' the http://schema.org/name property */
      "friends": "foaf:knows" /* My client calls 'friends' the http://xmlns.com/foaf/0.1/knows property */
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/console', {
        templateUrl: 'views/console.html',
        controller: 'ConsoleCtrl',
        controllerAs: 'console'
      })
      .otherwise({
        redirectTo: '/'
      });
  });