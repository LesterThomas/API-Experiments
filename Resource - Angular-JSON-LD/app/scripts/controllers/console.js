'use strict';

/**
 * @ngdoc function
 * @name webserverApp.controller:ConsoleCtrl
 * @description
 * # ConsoleCtrl
 * Controller of the webserverApp
 */
angular.module('webserverApp')
  .controller('ConsoleCtrl', ['$scope','$http','JsonldRest', function ($scope,$http,JsonldRest) {

	/* Confiigure the API baseUrl */
	JsonldRest.setBaseUrl('http://localhost:9000/');

	/* A handler to a server collection of ResourceFacingServiceCatalogue items with a local context interpretation */
	var rfscatalogue = JsonldRest.collection('api/ResourceFacingServiceCatalogue');
	console.log('ResourceFacingServiceCatalogue collection', rfscatalogue);
    $scope.name="Not set";

    /* We retrieve the person http://example.org/person/1 */
    
	rfscatalogue.one('4').get().then(function(res){
		console.log('ResourceFacingServiceCatalogue item', res);
		$scope.name=res.fullName;
		/*$scope.friends=[];
	    console.log(res.fullName+' is friend with: ');
	    res.friends.forEach(function(friendLink){
	      
	      friendLink.get().then(function(friend){
	        console.log(friend.fullName);
	        $scope.friends.push(friend.fullName);
	        console.log($scope.friends);
	      });
	    });*/
	});



	/*$http.get('http://localhost:9000/person.json').success(function(res){
  	console.log('Hello ',res.name);
  	$scope.name=res.name;
	});*/

}]);
