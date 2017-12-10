
angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, structureDataService) {

    //$scope.nodes = $rootScope.DataStructure.binarySearchTrees[0].arrayOfValues;
    console.log(structureDataService.binarySearchTrees[0]);
    
});