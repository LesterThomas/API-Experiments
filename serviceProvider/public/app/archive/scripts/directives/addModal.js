



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
          //get the id from the data
          var idArray=data.id.split('/');
          var id=idArray[idArray.length-1];
          $uibModalInstance.close('IntegrationPoint:' + id);
      }).
      error(function(data, status, headers, config) {
        // log error
        console.log('Database add error', status, data)
      });
      
     
  };





});