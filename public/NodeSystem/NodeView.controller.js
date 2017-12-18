
////////////////////////////////////////////////////////////////////
//NODE VIEW CONTROLLER
////////////////////////////////////////////////////////////////////
angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, structureDataService, $document) {

    var startPoint = new Vector2(995, 160);
    var xDiff = 400;
    var yDiff = 600;

    structureDataService.binarySearchTrees[0] = new BinarySearchTree('first');
    structureDataService.binarySearchTrees[1] = new BinarySearchTree('first1');
    structureDataService.binarySearchTrees[2] = new BinarySearchTree('first2');
    structureDataService.binarySearchTrees[3] = new BinarySearchTree('first3');
    structureDataService.binarySearchTrees[4] = new BinarySearchTree('first4');
    
    structureDataService.binarySearchTrees[0].insert(100);
    structureDataService.binarySearchTrees[0].insert(25);
    structureDataService.binarySearchTrees[0].insert(20);
    structureDataService.binarySearchTrees[0].insert(50);
    structureDataService.binarySearchTrees[0].insert(110);
    structureDataService.binarySearchTrees[0].insert(105);
    structureDataService.binarySearchTrees[0].insert(103);
    structureDataService.binarySearchTrees[0].insert(113);
    structureDataService.binarySearchTrees[0].insert(112);

    var array = [];

    //POPULATE NODES
    structureDataService.binarySearchTrees[0].generatePositionsInPanel(new Vector2(500, 160), xDiff * 2, yDiff);
    structureDataService.binarySearchTrees[0].serialize(array);

    $scope.nodes = array;    

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

    var canvas = document.getElementById("LineDrawCanvas");
    this.canvasContext = canvas.getContext("2d");
    this.drawLinesBetweenNodes(structureDataService.binarySearchTrees[0].root);
});