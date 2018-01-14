
angular.module('DataStructureVisualizer').
controller("NodeController", function($scope, structureDataService) {

    $scope.isHovered = false;
    $scope.animNode = "";

    $scope.deleteNode = function(node) {
        structureDataService.deleteFromCurrentStructure(node.valueIndex);
    }

    $scope.setToPushOrPopNode = function(node) {
        if(node.isLastIdx != true || structureDataService.selectedStructure.changeType == 'None') {
            return;
        }

        var changeType = structureDataService.selectedStructure.changeType;
        if(changeType == 'Add') {
            $scope.animNode = "Push";
        }
        else if(changeType == 'Delete') {
            $scope.animNode = "Pop";
            setToHideAfterAnimation();
        }


        structureDataService.selectedStructure.changeType = 'None';
    }

    function setToHideAfterAnimation() {
        setTimeout( function(){
            $scope.animNode = "Hide";
            $scope.$apply();
        }, 800 );
    }

    $scope.setHovered = function(isHovered) {
        $scope.isHovered = isHovered;
    }
});