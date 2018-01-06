
angular.module('DataStructureVisualizer').
component('sidebar', {
    templateUrl: 'Sidebar/Sidebar.html',
});

angular.module('DataStructureVisualizer').
controller("SidebarController", function($scope, $http, structureDataService, userService) {
    
    structureDataService.registerCallbackToCurrStructurePage(subscribeToCurrStructurePage);
    structureDataService.setCurrStructurePage(StructureType.STRUCTURE_TYPE_BST);
    structureDataService.subscribeToStructureChange(onStructureDataChange);
    userService.registerCallbackToIsLoggedIn(onUserLoggedIn);

    function subscribeToCurrStructurePage() {
        $scope.currStructurePage = structureDataService.getCurrStructurePage();
        loadInStructuresOfType($scope.currStructurePage);
    }

    function onStructureDataChange() {
        $scope.structuresList = structureDataService.structures;

        for(var i = 0; i < $scope.structuresList.length; i++) {
            $scope.structuresList[i].index = i;
        }
    }

    function onUserLoggedIn() {
        var userData = {
            username : userService.username,
        };

        loadInStructuresOfType($scope.currStructurePage);
    }

    function loadInStructuresOfType(structureType) {    
        switch(structureType) {
            case StructureType.STRUCTURE_TYPE_BST:
                $scope.structureTitle = 'Binary Search Trees';
                $scope.createBtnTitle = 'BST';
                break;
            case StructureType.STRUCTURE_TYPE_STACK:
                $scope.structureTitle = 'Stacks';
                $scope.createBtnTitle = 'Stack';        
                break;
            case StructureType.STRUCTURE_TYPE_QUEUE:
                $scope.structureTitle = 'Queues';
                $scope.createBtnTitle = 'Queue';
                break;
            case StructureType.STRUCTURE_TYPE_HEAP:
                $scope.structureTitle = 'Heaps';
                $scope.createBtnTitle = 'Heap';
                break;
            case StructureType.STRUCTURE_TYPE_LINKED_LIST:
                $scope.structureTitle = 'Linked Lists';    
                $scope.createBtnTitle = 'Linked List';        
                break;
        }
        if(userService.getIsLoggedIn()) {
            structureDataService.loadUserStructuresOfType(structureType);
        }
        else {
            structureDataService.loadDefaultStructuresOfType(structureType);
        }
        onStructureDataChange();
    }


    $scope.createStructure = function() {
        var username = userService.getUsername();
        structureDataService.createStructure(username);
    }

    $scope.deleteStructure = function(indexInStructureArray) {
        console.log(indexInStructureArray);
    }
});