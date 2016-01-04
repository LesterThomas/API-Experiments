angular.module('webserverApp').directive('compModal', function(){


return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: true,
    templateUrl: '/scripts/directives/compModal.html',
    controller: function($scope, $element, $location){
        $scope.isActive = function(viewLocation){

            var active = false;

            if(viewLocation === $location.path()){
                active = true;
            }

            return active;

        }
    }
 }
});