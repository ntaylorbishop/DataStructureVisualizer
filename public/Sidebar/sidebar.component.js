
angular.module('DataStructureVisualizer').
component('sidebar', {
  templateUrl: 'Sidebar/sidebar.html',
});

angular.module('DataStructureVisualizer').
controller("SidebarController", function($scope, $rootScope) {

  $rootScope.DataStructure.binarySearchTrees[0] = new BinarySearchTree('first',  [ 0 ] );
  $rootScope.DataStructure.binarySearchTrees[1] = new BinarySearchTree('second', [ 0 ] );
  $rootScope.DataStructure.binarySearchTrees[2] = new BinarySearchTree('third',  [ 0 ] );
  $rootScope.DataStructure.binarySearchTrees[3] = new BinarySearchTree('fourth', [ 0 ] );
  $rootScope.DataStructure.binarySearchTrees[4] = new BinarySearchTree('fifth',  [ 0 ] );
  $rootScope.DataStructure.binarySearchTrees[5] = new BinarySearchTree('sixth',  [ 0 ] );
    
  $scope.$watch('$root.DataStructure.currStructurePage', function() {
    $scope.currStructurePage = $rootScope.DataStructure.currStructurePage;
    LoadInStructuresOfType($scope.currStructurePage);
  });

  function LoadInStructuresOfType(structureType) {

    $scope.structuresList = $rootScope.DataStructure.binarySearchTrees;
    
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
});