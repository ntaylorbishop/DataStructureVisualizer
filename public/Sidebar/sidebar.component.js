
angular.module('DataStructureVisualizer').
component('sidebar', {
  templateUrl: 'Sidebar/sidebar.html',
});

angular.module('DataStructureVisualizer').
controller("SidebarController", function($scope, $rootScope, structureDataService) {

  //structureDataService.binarySearchTrees[0] = new BinarySearchTree('first',  [ 0 ] );
  //structureDataService.binarySearchTrees[1] = new BinarySearchTree('second', [ 0 ] );
  //structureDataService.binarySearchTrees[2] = new BinarySearchTree('third',  [ 0 ] );
  //structureDataService.binarySearchTrees[3] = new BinarySearchTree('fourth', [ 0 ] );
  //structureDataService.binarySearchTrees[4] = new BinarySearchTree('fifth',  [ 0 ] );
  //structureDataService.binarySearchTrees[5] = new BinarySearchTree('sixth',  [ 0 ] );

  function SubscribeToCurrStructurePage() {
    $scope.currStructurePage = structureDataService.GetCurrStructurePage();
    LoadInStructuresOfType($scope.currStructurePage);
  }
  structureDataService.RegisterCallbackToCurrStructurePage(SubscribeToCurrStructurePage);

  function LoadInStructuresOfType(structureType) {

    $scope.structuresList = structureDataService.binarySearchTrees;
    
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