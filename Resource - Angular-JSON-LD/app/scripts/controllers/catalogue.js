'use strict';

/**
 * @ngdoc function
 * @name webserverApp.controller:CatalogueCtrl
 * @description
 * # CatalogueCtrl
 * Controller of the webserverApp
 */
angular.module('webserverApp')
  .controller('CatalogueCtrl', ['$scope','$http','JsonldRest', function ($scope,$http,JsonldRest) {

  	console.log('Started controller'); 
  	$scope.getRFSItem=function(rfsItem){
				console.log('RFS Item',rfsItem);
				console.log('RFS Item Description',rfsItem.description);
				$scope.rfsCollection.push(rfsItem);
			};

	/* Confiigure the API baseUrl */
	JsonldRest.setBaseUrl('http://lesterthomas.ddns.net:3000/api/');

	console.log('Set baseURL',JsonldRest);

 

	//*****************************************************************************************************************
	// 				TO-DO this should use the API entry point to find the RFSCatalogue URL String
	//*****************************************************************************************************************
	var apiEntryPoint=JsonldRest.collection(''); 
	apiEntryPoint.one('').get().then(function(res){
		console.log('EntryPoint item', res);
		

		/* A handler to a server collection of RFSCatalogue items with a local context interpretation */
		var rfscatalogue = res[res['@type']+'/RFSCatalogue']; //get the RFSCatalogue entry point relative to this entry point
		//var rfscatalogue = JsonldRest.collection('RFSCatalogue');
		console.log('RFSCatalogue collection', rfscatalogue);
	    $scope.name='Not set';
	 
	    /* We retrieve the person http://example.org/person/1 */
	    
		rfscatalogue.one('1').get().then(function(res){
			console.log('RFSCatalogue item', res);
			console.log('result',res);
			$scope.name=res.name;
		});

		rfscatalogue.all('').get().then(function(res){
			console.log('All res',res.list);
			$scope.rfsCollection=[];
			for (var i=0;i<res.list.length;i++){
				console.log('All res - getting item '+i,res.list[i]);
				res.list[i].get().then($scope.getRFSItem);
			}
			
		});

	});
	/*$http.get('http://localhost:9000/person.json').success(function(res){
  	console.log('Hello ',res.name);
  	$scope.name=res.name;
	});*/

}]);
