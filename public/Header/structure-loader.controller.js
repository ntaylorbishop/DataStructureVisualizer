
angular.module('DataStructureVisualizer').
controller("StructureLoaderController", function($scope, structureDataService) {

    $scope.LoadBST = function() {
        structureDataService.SetCurrStructurePage(StructurePage.STRUCTURE_PAGE_BST);
    };

    $scope.LoadStack = function() {
        structureDataService.SetCurrStructurePage(StructurePage.STRUCTURE_PAGE_STACK);
    };
            
    $scope.LoadQueue = function() {
        structureDataService.SetCurrStructurePage(StructurePage.STRUCTURE_PAGE_QUEUE);
    };

    $scope.LoadHeap = function() {
        structureDataService.SetCurrStructurePage(StructurePage.STRUCTURE_PAGE_HEAP);
    };
            
    $scope.LoadLinkedList = function() {
        structureDataService.SetCurrStructurePage(StructurePage.STRUCTURE_PAGE_LINKED_LIST);
    };
});