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
    'angularJsonld',
    'ui.bootstrap'
  ])
  .config(function(jsonldContextProvider){
    /* If we need to change the semantics of fullName we just do it here for the entire application */
    jsonldContextProvider.add({
      schema: 'http://schema.org/',
      foaf: 'http://xmlns.com/foaf/0.1/',
      list: 'http://www.w3.org/ns/hydra/core#member',
      name: 'schema:name', /* My client calls 'name' the http://schema.org/name property */
      description: 'schema:description', /* My client calls 'name' the http://schema.org/description property */
      friends: 'foaf:knows' /* My client calls 'friends' the http://xmlns.com/foaf/0.1/knows property */
      //RFSCatalogue:'RFSCatalogue' /* My client calls 'RFSCatalogue' the RFSCatalogue property */
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('app/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('app/catalogue', {
        templateUrl: 'views/catalogue.html',
        controller: 'CatalogueCtrl',
        controllerAs: 'catalogue'
      })
      .when('app/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
