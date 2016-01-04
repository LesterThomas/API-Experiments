'use strict';

/**
 * @ngdoc function
 * @name webserverApp.controller:CatalogueCtrl
 * @description
 * # CatalogueCtrl
 * Controller of the webserverApp
 */
angular.module('webserverApp')
  .controller('CatalogueCtrl', ['$scope','$http', function ($scope,$http,JsonldRest) {

  	console.log('Started controller'); 
  	$scope.rfsCollection=[];
	$scope.status='Loading';
  	$http.get('http://localhost:3002/api/catalogue').
		    success(function(data, status, headers, config) {
				if (data.constructor === Array) {
					$scope.status='Loaded';
					data.forEach( function(dataItem){
						var catalogueItem={};
						//map expanded JSON-LD to internal representation
						catalogueItem.name=dataItem['http://schema.org/name'][0]['@value'];
						catalogueItem.description=dataItem['http://schema.org/description'][0]['@value'];
						catalogueItem['@id']=dataItem['@id'];
						$scope.rfsCollection.push(catalogueItem);
					})		    	

					console.log('Catalogue get success',data,status);	
				} else {
					console.log('Catalogue get error - no Array returned',data,status);
					$scope.status='Error'; 
				}
		    }).
		    error(function(data, status, headers, config) {
		      // log error
		      	console.log('Catalogue get error',data, status, headers, config);
		    });

	

 


}]);
