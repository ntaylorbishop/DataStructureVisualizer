
angular.module('DataStructureVisualizer').
component('nodeView', {
    templateUrl: 'NodeView/NodeView.html'
});


angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, structureDataService, $document) {
    structureDataService.structureSelectedEvent.subscribe(structureSelectedEvent);
    structureDataService.structureChangeCalledEventListener = triggerDeleteNodeAnimation;

    var startPoint = new Vector2(500, 160);
    var xDiff = 400;
    var yDiff = 600;
    var canvas = document.getElementById("LineDrawCanvas");
    var canvasContext = canvas.getContext("2d");
    var array = [];
    $scope.nodes = array;
    $scope.isNodeBeingDeleted = false;
    $scope.animShouldPlay = false;

    function triggerDeleteNodeAnimation() {
        $scope.isNodeBeingDeleted = true;
        structureSelectedEvent();
        return 1;
    }
    
    function structureSelectedEvent() {        
        var dataStructure = structureDataService.selectedStructure.structure;
        $scope.currStructureType = dataStructure.structureType;
        canvasContext.clearRect(0, 0, 1903, 900);
        
        if(dataStructure == null) {
            $scope.nodes = [];
            return;
        }

        switch(dataStructure.structureType) {
            case StructureType.STRUCTURE_TYPE_BST:
                drawBST(dataStructure);
                break;
            case StructureType.STRUCTURE_TYPE_STACK:
                drawStack(dataStructure);
                console.log(dataStructure);
                break;
            case StructureType.STRUCTURE_TYPE_QUEUE:

                break;
            case StructureType.STRUCTURE_TYPE_HEAP:

                break;
            case StructureType.STRUCTURE_TYPE_LINKED_LIST:

                break;
        }
   }

    function drawBST(dataStructure) {
        var bst = new BinarySearchTree(dataStructure.title);
        
        for(var i = 0; i < dataStructure.values.length; i++) {
            if(dataStructure.dataType == "Integer") {
                bst.insert(parseInt(dataStructure.values[i]), i);
            }
            else {
                bst.insert(dataStructure.values[i], i);
            }
        }

        var array = [];

        //POPULATE NODES
        bst.generatePositionsInPanel(startPoint, xDiff * 2, yDiff);
        bst.serialize(array);
        drawLinesBetweenNodes(bst.root);
        $scope.nodes = array;
    }

    function drawStack(dataStructure) {
        var stack = new Stack(dataStructure.title);

        for(var i = 0; i < dataStructure.values.length; i++) {
            if(dataStructure.dataType == "Integer") {
                stack.insert(parseInt(dataStructure.values[i]));
            }
            else {
                stack.insert(dataStructure.values[i]);
            }
        }
        stack.generatePositionsInPanel(startPoint, xDiff * 2, yDiff, 200, 31);
        $scope.nodes = stack.values;

        for(var i = 0; i < $scope.nodes.length; i++) {
            $scope.nodes[i].isLastIdx = false;
        }
        $scope.nodes[$scope.nodes.length - 1].isLastIdx = true;
    }

    //DRAW LINES
    function drawLine(start, end) {
        //this.canvasContext.clearRect(0, 0, 1903, 900);        
        canvasContext.beginPath();
        canvasContext.moveTo(start.x, start.y);
        canvasContext.lineTo(end.x, end.y);
        canvasContext.strokeStyle="black";
        canvasContext.lineWidth = 1;
        canvasContext.closePath();
        canvasContext.stroke();    
    }

    function drawLinesBetweenNodes(node) {
        if(node == null) {
            return;
        }
        
        var start = new Vector2(node.position.x + 25, node.position.y - 25);

        if(node.left != null) {
            var end = new Vector2(node.left.position.x + 25, node.left.position.y - 25);
            drawLine(start, end);
            drawLinesBetweenNodes(node.left);
        }
        if(node.right != null) {
            var end = new Vector2(node.right.position.x + 25, node.right.position.y - 25);
            drawLine(start, end);
            drawLinesBetweenNodes(node.right);
        }
    }

    $scope.wasNodeDeleted = function() {
        if($scope.structureLengthDiff < 0) {
            return true;
        }
        else {
            return false;
        }
    }
});