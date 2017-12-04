
angular.module('DataStructureVisualizer').
controller("StructureLoaderController", function($scope, $rootScope) {

    $scope.LoadBST = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_BST;
    };

    $scope.LoadStack = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_BST;
    };
            
    $scope.LoadQueue = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_BST;
    };

    $scope.LoadHeap = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_BST;
    };
            
    $scope.LoadLinkedList = function() {
        $rootScope.DataStructure.currStructurePage = StructurePage.STRUCTURE_PAGE_BST;
    };
});