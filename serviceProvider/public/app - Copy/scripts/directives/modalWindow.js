



angular.module('webserverApp').controller('ModalInstanceCtrl',['$scope', '$uibModalInstance', '$http', '$interval', 'jsonld', 'integrationPoint', function ($scope, $uibModalInstance, $http, $interval, jsonld, integrationPoint) {

  $scope.integrationPoint = integrationPoint;
  
  $scope.integrationPoint.testPing='grey';
  $scope.integrationPoint.testJSONLD='grey';
  $scope.integrationPoint.testRFSCatalogue='grey';
  $scope.integrationPoint.testPingComment='Preparing test';
  $scope.integrationPoint.testJSONLDComment='Preparing test';
  $scope.integrationPoint.testRFSCatalogueComment='Preparing test';

  $scope.ok = function () {

    //PUT the updated integration point back into database
    $http.put('http://localhost:3002/api/' + $scope.integrationPoint._id.replace(':','/'),$scope.integrationPoint).
      success(function(data, status, headers, config) {
          console.log('Database put success', status, data)
          $uibModalInstance.close();
      }).
      error(function(data, status, headers, config) {
        // log error
        console.log('Database put error', status, data)
      });

    $uibModalInstance.dismiss('ok');
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
    if ($scope.integrationPoint.testPing=='grey') {
        $scope.integrationPoint.testPing='a';
        $scope.integrationPoint.testPingComment='Starting test';
        //do a simple HTTP GET against the end-point

        try {
          $http.get($scope.integrationPoint.EntryPoint).
            then( 
              function(response) { //success
              console.log('Test 1 success', response)
              $scope.integrationPoint.testPingComment='Success';
              $scope.integrationPoint.testPing='g';
              }, 
              function(response) { //error
              // log error
              console.log('Test 1 error');
              console.log(response);

              $scope.integrationPoint.testPingComment='Fail: Check debug console for more info';
              $scope.integrationPoint.testJSONLDComment='Test stopped';
              $scope.integrationPoint.testRFSCatalogueComment='Test stopped';
              $scope.integrationPoint.testPing='r';
              });
          } catch (err) {
            console.log('Test 1 exception', err);
            $scope.integrationPoint.testPingComment='Fail: Exception:'+err;
            $scope.integrationPoint.testPing='r';
          }
      
    }
    if (($scope.integrationPoint.testPing=='g') && ($scope.integrationPoint.testJSONLD=='grey')) {
      $scope.integrationPoint.testJSONLDComment='Starting test';
      try {
          jsonld.expand($scope.integrationPoint.EntryPoint, function(err, expanded) {
            if (err) {
              console.log('Error',err);
              $scope.integrationPoint.testJSONLD='r';
              $scope.integrationPoint.testJSONLDComment='Fail: Check debug console for more info. ' + err;
              $scope.integrationPoint.testRFSCatalogueComment='Test stopped';
            } else {
              console.log('Test 2 success', expanded);
              $scope.integrationPoint.testJSONLD='g';
              $scope.integrationPoint.testJSONLDComment='Success';

              try {
                $scope.integrationPoint.testRFSCatalogueComment='Starting test';
                var type=expanded[0]['@type'][0];
                //calculate Catalogue EndPoint type relative to API End Point type
                var RFSCatalogueEPType=type+'/RFSCatalogue';
                console.log('Catalogue End Point Type is',RFSCatalogueEPType);

                //get the API endpoint of the RFSCatalogue
                var RFSCatalogueEP=expanded[0][RFSCatalogueEPType][0]['@id'];
                console.log('Catalogue End Point is',RFSCatalogueEP);

                //call HTTP GET on the endpoint to get all the catalogue items
                jsonld.expand(RFSCatalogueEP, function (error, expandedRFSCatalogueEP) {
                  if (error) {
                    console.log('Error',error);
                    $scope.integrationPoint.testRFSCatalogue='r';
                    $scope.integrationPoint.testRFSCatalogueComment='Fail: Check debug console for more info:' + error;
                  } else {
                    console.log('Expanded Catalogue',expandedRFSCatalogueEP);
                    $scope.integrationPoint.testRFSCatalogueComment='Success';
                    $scope.integrationPoint.testRFSCatalogue='g';          
                  }

                });
              } catch(err) {
                console.log('Test 3 exception', err);
                $scope.integrationPoint.testRFSCatalogueComment='Fail: Exception:'+err;
                $scope.integrationPoint.testRFSCatalogue='r';                  
              }

            }
          });
        } catch (err) {
          console.log('Test 2 exception', err);
          $scope.integrationPoint.testJSONLDComment='Fail: Exception:'+err;
          $scope.integrationPoint.testJSONLD='r';          
        }
      }

    if (($scope.integrationPoint.testJSONLD=='g') && ($scope.integrationPoint.testRFSCatalogue=='grey')) {
        $scope.integrationPoint.testRFSCatalogue='r';
        $scope.integrationPoint.testRFSCatalogueComment='Starting test';
    }
    


  };

  $interval($scope.runTest, 1000);

}]);