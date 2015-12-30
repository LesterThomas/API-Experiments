



angular.module('webserverApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $http, $interval, integrationPoint) {

  $scope.integrationPoint = integrationPoint;
  $scope.testCount=0;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.delete = function () {
    
    $http.delete('http://localhost:3002/api/' + $scope.integrationPoint._id.replace(':','/')).
      success(function(data, status, headers, config) {
          console.log('Database delete success', status, data)
          $uibModalInstance.close();
      }).
      error(function(data, status, headers, config) {
        // log error
        console.log('Database delete error', status, data)
      });
      
     
  };

  $scope.runTest = function () {
    if ($scope.testCount==1) {
        $scope.integrationPoint.testPing='r';
        $scope.integrationPoint.testPingComment='Service unreachable';
    }
    if ($scope.testCount==2) {
        $scope.integrationPoint.testJSONLD='r';
        $scope.integrationPoint.testJSONLDComment='Service unreachable';
    }
    if ($scope.testCount==3) {
        $scope.integrationPoint.testRFSCatalogue='r';
        $scope.integrationPoint.testRFSCatalogueComment='Service unreachable';
    }
    $scope.testCount++;


  };

  $interval($scope.runTest, 2000);

});