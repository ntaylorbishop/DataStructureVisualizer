
angular.module('DataStructureVisualizer').
controller("NodeController", function($scope, structureDataService) {

    $scope.isHovered = false;

    $scope.deleteStructure = function(node) {
        structureDataService.deleteFromCurrentStructure(node.valueIndex);
    }

    $scope.animNode = "";

    $scope.setToPushOrPopNode = function(node) {
        if(node.isLastIdx != true) {
            return;
        }

        var shouldPop = $scope.wasNodeDeleted();
        if(shouldPop) {
            $scope.animNode = "Pop";
        }
        else {
            $scope.animNode = "Push";
        }
    }
});