
////////////////////////////////////////////////////////////////////
//NODE VIEW CONTROLLER
////////////////////////////////////////////////////////////////////
angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, structureDataService, structureVisService, $document) {

    structureDataService.subscribeToStructureSelected(this.structureSelectedEvent);

    console.log('HELLO');

    var startPoint = structureVisService.startPoint;
    var xDiff = structureVisService.xDiff;
    var yDiff = structureVisService.yDiff;
    var canvas = document.getElementById("LineDrawCanvas");
    var canvasContext = canvas.getContext("2d");
    var array = [];
    $scope.nodes = array;    
    
    this.structureSelectedEvent = function(structureType, dataStructure) {        
        //POPULATE NODES
        dataStructure.generatePositionsInPanel(new Vector2(500, 160), xDiff * 2, yDiff);
        dataStructure.serialize(array);
        
        this.drawLinesBetweenNodes(structureDataService.binarySearchTrees[0].root);
        $scope.nodes = array;
    }

    //DRAW LINES
    this.draw = function(start, end) {
        //this.canvasContext.clearRect(0, 0, 1903, 900);        
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(start.x, start.y);
        this.canvasContext.lineTo(end.x, end.y);
        this.canvasContext.strokeStyle="black";
        this.canvasContext.lineWidth = 1;
        this.canvasContext.closePath();
        this.canvasContext.stroke();    
    }

    this.drawLinesBetweenNodes = function(node) {
        
        var start = new Vector2(node.position.x + 25, node.position.y - 25);

        if(node.left != null) {
            var end = new Vector2(node.left.position.x + 25, node.left.position.y - 25);
            this.draw(start, end);
            this.drawLinesBetweenNodes(node.left);
        }
        if(node.right != null) {
            var end = new Vector2(node.right.position.x + 25, node.right.position.y - 25);
            this.draw(start, end);
            this.drawLinesBetweenNodes(node.right);
        }
    }
});