
angular.module('DataStructureVisualizer').
controller("StructureLoaderController", function($scope, structureDataService) {

    $scope.LoadBST = function() {
        structureDataService.setCurrStructurePage(StructureType.STRUCTURE_TYPE_BST);
    };

    $scope.LoadStack = function() {
        structureDataService.setCurrStructurePage(StructureType.STRUCTURE_TYPE_STACK);
    };
            
    $scope.LoadQueue = function() {
        structureDataService.setCurrStructurePage(StructureType.STRUCTURE_TYPE_QUEUE);
    };

    $scope.LoadHeap = function() {
        structureDataService.setCurrStructurePage(StructureType.STRUCTURE_TYPE_HEAP);
    };
            
    $scope.LoadLinkedList = function() {
        structureDataService.setCurrStructurePage(StructureType.STRUCTURE_TYPE_LINKED_LIST);
    };
});