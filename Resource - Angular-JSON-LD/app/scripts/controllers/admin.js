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

  	$scope.getIntegrationPoints=function() {
		$http.get('http://localhost:3002/api/integrationPoint').
		    success(function(data, status, headers, config) {

		      	$scope.integrationCollection = data;

		      	$scope.integrationCollection.forEach(function(integrationPoint) {
				    integrationPoint.testPing="a";
		      		integrationPoint.testJSONLD="a";
		      		integrationPoint.testRFSCatalogue="a";
				});
		      
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
	      templateUrl: '/scripts/directives/modalWindow.html',
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
	      templateUrl: '/scripts/directives/addModal.html',
	      controller: 'AddModalInstanceCtrl',
	      size: size,
	      resolve: {}
    });

    modalInstance.result.then(function () {
      		console.log('Add Modal dismissed at: ' + new Date());
      		$scope.getIntegrationPoints();  //refresh the list
    	});
  	};

  	

		

  });
