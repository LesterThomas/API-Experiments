



angular.module('webserverApp').controller('featureModalInstanceCtrl',['$scope', '$uibModalInstance', '$http', '$interval', 'jsonld', 'RFSCatalogue', function ($scope, $uibModalInstance, $http, $interval, jsonld, RFSCatalogue) {

	$scope.RFSCatalogue = RFSCatalogue;
	console.log('featureModalInstanceCtrl initiated',RFSCatalogue);
	$scope.RFSCatalogue.featureArray=[];
	if (RFSCatalogue.features) {
		console.log('loading features from url', 'http://serviceprovider.com:3002/api/catalogue/' + encodeURIComponent(RFSCatalogue.features));
		$http.get('http://serviceprovider.com:3002/api/catalogue/' + encodeURIComponent(RFSCatalogue.features)).
			success(function(data, status, headers, config) {
				if (data.constructor === Array) {
					var featureArray=data[0]['http://www.w3.org/ns/hydra/core#member'];
					$scope.RFSCatalogue.featureArray=[];
					featureArray.forEach( function(feature){
						var featureObject={};
						//map expanded JSON-LD to internal representation
						featureObject.name=feature['http://schema.org/name'][0]['@value'];
						featureObject.description=feature['http://schema.org/description'][0]['@value'];
						featureObject['@id']=feature['@id'];
						$scope.RFSCatalogue.featureArray.push(featureObject);
						console.log('featureObject',featureObject);
					})		    	

					console.log('Features get success',data,status);	
				} else {
					console.log('Features get error - no Array returned',data,status);
					$scope.status='Error'; 
				}
			}).
			error(function(data, status, headers, config) {
			  // log error
				console.log('Features get error',data, status, headers, config);
			});  
	}
  
  
  
	$scope.ok = function () {
		$uibModalInstance.dismiss('ok');
	};


}]);