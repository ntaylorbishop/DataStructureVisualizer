////////////////////////////////////////////////////////////////////
//NODE VIEW CONTROLLER
////////////////////////////////////////////////////////////////////
angular.module('DataStructureVisualizer').
controller("StructureLinkController", function($scope, structureDataService, $document) {

    $scope.isTextSelected = false;
    $scope.isTextHovered = false;

    $scope.clickText = function() {
        $scope.isTextSelected = true;                
    }

    $scope.enterText = function($event) {
        if($event.keyCode == 13) {
            $scope.isTextSelected = false;        
        }
    }

    $scope.selectStructure = function(dataStructure) {

        if(! $scope.isTextHovered) {
            $scope.isTextSelected = false;
            structureDataService.handleStructureSelected(StructurePage.STRUCTURE_PAGE_BST, dataStructure);
        }
    }

    $scope.isHoveringText = function(isHovering) {
        $scope.isTextHovered = isHovering;
    }

    $scope.selectStructure($scope.structuresList[0]);
});