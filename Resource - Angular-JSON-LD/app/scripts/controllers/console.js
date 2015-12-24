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

  	console.log('Started controller'); 
	/* Confiigure the API baseUrl */
	JsonldRest.setBaseUrl('http://acmenetworks.com:3000/api/');

	console.log('Set baseURL',JsonldRest);



	//*****************************************************************************************************************
	// 				TO-DO this should use the API entry point to find the ResourceFacingServiceCatalogue URL String
	//*****************************************************************************************************************
	/* A handler to a server collection of ResourceFacingServiceCatalogue items with a local context interpretation */
	var rfscatalogue = JsonldRest.collection('ResourceFacingServiceCatalogue');   
	console.log('ResourceFacingServiceCatalogue collection', rfscatalogue);
    $scope.name='Not set';

    /* We retrieve the person http://example.org/person/1 */
    
	rfscatalogue.one('1').get().then(function(res){
		console.log('ResourceFacingServiceCatalogue item', res);
		console.log('result',res);
		$scope.name=res.name;
	});

	rfscatalogue.all('').get().then(function(res){
		console.log('All res',res.list);
		$scope.rfsCollection=[];
		for (var i=0;i<res.list.length;i++){
			console.log('All res - getting item '+i,res.list[i]);
			res.list[i].get().then(function(rfsItem){
				console.log('RFS Item',rfsItem);
				console.log('RFS Item Description',rfsItem.description);
				$scope.rfsCollection.push(rfsItem);
			});
		}
		
	});
	/*$http.get('http://localhost:9000/person.json').success(function(res){
  	console.log('Hello ',res.name);
  	$scope.name=res.name;
	});*/

}]);
