
angular.module('DataStructureVisualizer').
component('sidebar', {
  templateUrl: 'Sidebar/sidebar.html',
});

angular.module('DataStructureVisualizer').
controller("SidebarController", function($scope, $rootScope, structureDataService) {

  function SubscribeToCurrStructurePage() {
    $scope.currStructurePage = structureDataService.GetCurrStructurePage();
    LoadInStructuresOfType($scope.currStructurePage);
  }
  structureDataService.RegisterCallbackToCurrStructurePage(SubscribeToCurrStructurePage);

  function LoadInStructuresOfType(structureType) {

    $scope.structuresList = structureDataService.binarySearchTrees;
    console.log($scope.structuresList);
    
    switch(structureType) {
      case StructurePage.STRUCTURE_PAGE_BST:
        $scope.structureTitle = 'Binary Search Trees';
        break;
      case StructurePage.STRUCTURE_PAGE_STACK:
        $scope.structureTitle = 'Stacks';
      
        break;
      case StructurePage.STRUCTURE_PAGE_QUEUE:
        $scope.structureTitle = 'Queues';
      
        break;
      case StructurePage.STRUCTURE_PAGE_HEAP:
        $scope.structureTitle = 'Heaps';
      
        break;
      case StructurePage.STRUCTURE_PAGE_LINKED_LIST:
        $scope.structureTitle = 'Linked Lists';        
        break;
    }
  }

  structureDataService.SetCurrStructurePage(StructurePage.STRUCTURE_PAGE_BST);
});