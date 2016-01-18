'use strict';

/**
 * @ngdoc function
 * @name webserverApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the webserverApp
 */
angular.module('webserverApp')
  .controller('AdminCtrl', function ($scope, $uibModal, $http) {

  	$scope.getIntegrationPoints=function(inId) {
		$http.get('http://localhost:3002/api/integrationPoint').
		    success(function(data, status, headers, config) {

		      	$scope.integrationCollection = data;

		      	$scope.integrationCollection.forEach(function(integrationPoint) {
		      		if (!integrationPoint.testPing) {
					    integrationPoint.testPing="a";
			      		integrationPoint.testJSONLD="a";
			      		integrationPoint.testRFSCatalogue="a";
			      	}
				});

		      	if (inId) {  //open test Modal window if id is set
		      		$scope.open('lg',inId);
		      	}

		      
		    }).
		    error(function(data, status, headers, config) {
		      // log error
		    });
		}

	$scope.getIntegrationPoints();


  	$scope.animationsEnabled = true;

  	$scope.open = function (size, id) {

    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: '/app/scripts/directives/modalWindow.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	      resolve: {
	        integrationPoint: function () {
	        	var integrationPointResult=null;
	        	$scope.integrationCollection.forEach(function(integrationPoint) {
				    if (integrationPoint._id==id) {
				    	integrationPointResult=integrationPoint;
				    }
				});
	          	return integrationPointResult;
	        },

	      }
    });

    modalInstance.result.then(function () {
      		console.log('View Modal dismissed at: ' + new Date());
      		$scope.getIntegrationPoints();  //refresh the list
    	});
  	};


  	$scope.add = function (size, id) {

    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: '/app/scripts/directives/addModal.html',
	      controller: 'AddModalInstanceCtrl',
	      size: size,
	      resolve: {}
    }); 

    modalInstance.result.then(function (inId) {
      		console.log('Add Modal dismissed at: ' + new Date());
      		
      		$scope.getIntegrationPoints(inId);  //refresh the list
    	});
  	};

  	

		

  });
