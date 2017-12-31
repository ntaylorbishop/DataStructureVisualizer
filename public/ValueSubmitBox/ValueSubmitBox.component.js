'use strict';

angular.module('DataStructureVisualizer').
component('valueSubmitBox', {
    templateUrl: 'ValueSubmitBox/ValueSubmitBox.html',
});

angular.module('DataStructureVisualizer').
controller("ValueSubmitBoxController", function($scope, structureDataService) {

    var randomWords = ["board", "doctrine", "leather", "leg", "milkshake", "chair", "socks", "store", "mouse", "search", "referee", "colour", 
        "legs", "onion", "hot", "rank", "tsunami", "tragedy", "turkey", "target", "trellis", "reason", "comet", "sunglasses", "sunglasses", 
        "fountain", "address", "kangaroo", "kitten", "library", "varnish", "epidemic", "grade", "snore", "reindeer", "kitchen", "Italy", 
        "station", "shoelace", "tea", "tsunami", "tortoise", "toothpick", "playground", "powder", "factory", "mask", "ketchup"
    ];
    var randomLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    var defaultErrorMessage = 'Please enter a value.';
    $scope.errorMessage = defaultErrorMessage;
    $scope.NewNodeValue = '0';

    function updateStructureInService(value) {
        $scope.errorMessage = structureDataService.updateCurrentStructure(value);

        if($scope.errorMessage == '') {
            $scope.errorMessage = defaultErrorMessage;
        }
    }

    $scope.submitNewNode = function(event) {

        if(event != null) {
            if(event.keyCode == 13) {
                updateStructureInService($scope.NewNodeValue);
            }
        }
        else {
            updateStructureInService($scope.NewNodeValue);
        }
    }

    $scope.generateRandomNode = function() {

        var structureDataType = structureDataService.selectedStructure.structure.dataType;
        
        if(structureDataType == "Integer") {
            $scope.NewNodeValue = getRandomInt(0, 9999);
        }
        else if(structureDataType == "Word") {
            var endIdx = randomWords.length - 1;
            var idx = getRandomInt(0, endIdx);
            $scope.NewNodeValue = randomWords[idx];
        }
        else if(structureDataType == "Character") {
            var endIdx = randomLetters.length - 1;
            var idx = getRandomInt(0, endIdx);
            $scope.NewNodeValue = randomLetters[idx];
        }
    }
});