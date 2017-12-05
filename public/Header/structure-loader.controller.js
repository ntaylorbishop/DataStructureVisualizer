
angular.module('DataStructureVisualizer').
controller("StructureLoaderController", function($scope, $rootScope) {

    $scope.LoadBST = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_BST;

        
    };

    $scope.LoadStack = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_STACK;
    };
            
    $scope.LoadQueue = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_QUEUE;
    };

    $scope.LoadHeap = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_HEAP;
    };
            
    $scope.LoadLinkedList = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_LINKED_LIST;
    };
});