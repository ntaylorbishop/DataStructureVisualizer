
angular.module('DataStructureVisualizer').
controller("NodeDeleteController", function($scope, structureDataService) {

    $scope.isHovered = false;

    $scope.deleteStructure = function(node) {
        structureDataService.deleteFromCurrentStructure(node.valueIndex);
    }
});