////////////////////////////////////////////////////////////////////
//NODE VIEW CONTROLLER
////////////////////////////////////////////////////////////////////
angular.module('DataStructureVisualizer').
controller("StructureLinkController", function($scope, structureDataService, $document) {

    $scope.isSelected = false;

    $scope.unselect = function($event) {

        console.log($event.keyCode);

        if($event.keyCode == 13) {
            $scope.isSelected = false;
            angular.element($event.srcElement).focus();
        }
    }

    $scope.select = function($event) {
        $scope.isSelected = true;
    }
});