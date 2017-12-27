
angular.module('DataStructureVisualizer').
component('nodeView', {
    templateUrl: 'NodeSystem/NodeView.html'
});


angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, structureDataService, structureVisService, $document) {

    structureDataService.subscribeToStructureSelected(structureSelectedEvent);

    var startPoint = structureVisService.startPoint;
    var xDiff = structureVisService.xDiff;
    var yDiff = structureVisService.yDiff;
    var canvas = document.getElementById("LineDrawCanvas");
    var canvasContext = canvas.getContext("2d");
    var array = [];
    $scope.nodes = array;
    
    function structureSelectedEvent() {   

        var dataStructure = structureDataService.selectedStructure.structure;
        
        console.log(structureDataService.selectedStructure.structureType);
        console.log(structureDataService.selectedStructure.structure);

        var bst = new BinarySearchTree(dataStructure.title);
        
        for(var i = 0; i < dataStructure.values.length; i++) {
            if(dataStructure.type == 0) {
                bst.insert(parseInt(dataStructure.values[i]));
            }
            else {
                bst.insert(dataStructure.values[i]);
            }
        }

        var array = [];

        //POPULATE NODES
        bst.generatePositionsInPanel(new Vector2(500, 160), xDiff * 2, yDiff);
        bst.serialize(array);
        
        canvasContext.clearRect(0, 0, 1903, 900);
        drawLinesBetweenNodes(bst.root);

        var nodes = [];

        $scope.nodes = array;
    }

    //DRAW LINES
    function draw(start, end) {
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
            draw(start, end);
            drawLinesBetweenNodes(node.left);
        }
        if(node.right != null) {
            var end = new Vector2(node.right.position.x + 25, node.right.position.y - 25);
            draw(start, end);
            drawLinesBetweenNodes(node.right);
        }
    }
});