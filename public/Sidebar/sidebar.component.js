
angular.module('DataStructureVisualizer').
component('sidebar', {
    templateUrl: 'Sidebar/sidebar.html',
});

angular.module('DataStructureVisualizer').
controller("SidebarController", function($scope, $rootScope, structureDataService, userService) {
    
    structureDataService.registerCallbackToCurrStructurePage(subscribeToCurrStructurePage);
    structureDataService.setCurrStructurePage(StructurePage.STRUCTURE_PAGE_BST);
    structureDataService.subscribeToStructureChange(onStructureDataChange);

    function subscribeToCurrStructurePage() {
        $scope.currStructurePage = structureDataService.getCurrStructurePage();
        loadInStructuresOfType($scope.currStructurePage);
    }

    function onStructureDataChange() {
        $scope.structuresList = structureDataService.binarySearchTrees;

        for(var i = 0; i < $scope.structuresList.length; i++) {
            $scope.structuresList[i].index = i;
        }
    }


    function loadInStructuresOfType(structureType) {
        onStructureDataChange();
    
        switch(structureType) {
            case StructurePage.STRUCTURE_PAGE_BST:
                $scope.structureTitle = 'Binary Search Trees';
                $scope.createBtnTitle = 'BST';
                structureDataService.loadBSTs();
                onStructureDataChange();
                break;
            case StructurePage.STRUCTURE_PAGE_STACK:
                $scope.structureTitle = 'Stacks';
                $scope.createBtnTitle = 'Stack';        
                break;
            case StructurePage.STRUCTURE_PAGE_QUEUE:
                $scope.structureTitle = 'Queues';
                $scope.createBtnTitle = 'Queue';
                break;
            case StructurePage.STRUCTURE_PAGE_HEAP:
                $scope.structureTitle = 'Heaps';
                $scope.createBtnTitle = 'Heap';
                break;
            case StructurePage.STRUCTURE_PAGE_LINKED_LIST:
                $scope.structureTitle = 'Linked Lists';    
                $scope.createBtnTitle = 'Linked List';        
                break;
        }
    }

    $scope.createStructure = function() {
        var username = userService.getUsername();
        structureDataService.createStructure(username);
    }

    $scope.deleteStructure = function(indexInStructureArray) {
        console.log(indexInStructureArray);
    }
});