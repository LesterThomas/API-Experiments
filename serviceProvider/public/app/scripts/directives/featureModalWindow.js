



angular.module('webserverApp').controller('featureModalInstanceCtrl',['$scope', '$uibModalInstance', '$http', '$interval', 'jsonld', 'RFSCatalogue', function ($scope, $uibModalInstance, $http, $interval, jsonld, RFSCatalogue) {

  $scope.RFSCatalogue = RFSCatalogue;
  console.log('featureModalInstanceCtrl initiated',RFSCatalogue);
  $scope.ok = function () {
    $uibModalInstance.dismiss('ok');
  };


}]);