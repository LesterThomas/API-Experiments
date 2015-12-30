



angular.module('webserverApp').controller('AddModalInstanceCtrl', function ($scope, $uibModalInstance, $http) {

  $scope.integrationPoint={ EntryPoint:""};


  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.add = function () {
    
    $http({
           method: 'POST',
           url: 'http://localhost:3002/api/integrationPoint',
           headers: {
               'content-type':'application/json'               
             },
           data:  $scope.integrationPoint
           }).
      success(function(data, status, headers, config) {
          console.log('Database add success', status, data)
          $uibModalInstance.close();
      }).
      error(function(data, status, headers, config) {
        // log error
        console.log('Database add error', status, data)
      });
      
     
  };





});