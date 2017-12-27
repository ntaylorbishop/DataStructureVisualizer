'use strict';

angular.module('DataStructureVisualizer').
component('valueSubmitBox', {
    templateUrl: 'Structures/value-submit-box.html',
});

angular.module('DataStructureVisualizer').
controller("ValueSubmitBoxController", function($scope, structureDataService) {

    $scope.errorMessage = '';

    function updateStructureInService(value) {
        $scope.errorMessage = structureDataService.updateCurrentStructure(value);
    }

    $scope.submitNewNode = function(event) {

        if(event != null) {
            if(event.keyCode == 13) {
                console.log(structureDataService.binarySearchTrees);
                debugger;
                updateStructureInService($scope.NewNodeValue);
            }
        }
        else {
            updateStructureInService($scope.NewNodeValue);
        }
    }
});