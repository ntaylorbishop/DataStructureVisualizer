'use strict';

angular.module('DataStructureVisualizer').
component('pageHeader', {
    templateUrl: 'Header/Header.html',
});

angular.module('DataStructureVisualizer').
controller("PageHeaderController", function($scope, structureDataService, userService) {

    $scope.LoadBST = function() {
        loadStructuresOfType(StructureType.STRUCTURE_TYPE_BST);
    };

    $scope.LoadStack = function() {
        loadStructuresOfType(StructureType.STRUCTURE_TYPE_STACK);
    };
            
    $scope.LoadQueue = function() {
        loadStructuresOfType(StructureType.STRUCTURE_TYPE_QUEUE);
    };

    $scope.LoadHeap = function() {
        loadStructuresOfType(StructureType.STRUCTURE_TYPE_HEAP);
    };
            
    $scope.LoadLinkedList = function() {
        loadStructuresOfType(StructureType.STRUCTURE_TYPE_LINKED_LIST);
    };

    function loadStructuresOfType(structureType) {
        structureDataService.setCurrStructurePage(structureType);
    }
});