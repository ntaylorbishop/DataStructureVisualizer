
angular.module('DataStructureVisualizer').
component('nodeView', {
    templateUrl: 'NodeView/NodeView.html'
});


angular.module('DataStructureVisualizer').
controller("NodeViewController", function($scope, structureDataService, $document, $window, $timeout) {
    structureDataService.structureSelectedEvent.subscribe(structureSelectedEvent);
    structureDataService.structureAddCalledEventListener = triggerAddNodeAnimation;
    structureDataService.structureDeleteCalledEventListener = triggerDeleteNodeAnimation;

    var startPoint = new Vector2(500, 160);
    var xDiff = 400;
    var yDiff = 600;
    var canvas = document.getElementById("LineDrawCanvas");
    var canvasContext = canvas.getContext("2d");
    var array = [];
    $scope.nodes = array;

    function triggerDeleteNodeAnimation() {
        structureSelectedEvent();
        return 1;
    }

    function triggerAddNodeAnimation() {
        return 0;
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
                break;
            case StructureType.STRUCTURE_TYPE_QUEUE:
                drawQueue(dataStructure);
                break;
            case StructureType.STRUCTURE_TYPE_HEAP:

                break;
            case StructureType.STRUCTURE_TYPE_LINKED_LIST:

                break;
        }
   }

   //DRAW BST====================================================================
    function drawBST(dataStructure) {
        $timeout(function() {
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
        });
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
        $timeout(function() {
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
        });
    }

    //DRAW STACK====================================================================
    function drawStack(dataStructure) {
        $timeout(function() {
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
    
            for(var i = 0; i < stack.values.length; i++) {
                stack.values[i].isLastIdx = false;
            }
            stack.values[stack.values.length - 1].isLastIdx = true;
            $scope.nodes = stack.values;
        });
    }

    //DRAW QUEUE====================================================================
    function drawQueue(dataStructure) {
        $timeout(function() {
            var queue = new Queue(dataStructure.title);

            for(var i = 0; i < dataStructure.values.length; i++) {
                if(dataStructure.dataType == "Integer") {
                    queue.insert(parseInt(dataStructure.values[i]));
                }
                else {
                    queue.insert(dataStructure.values[i]);
                }
            }
            var windowWidth = $window.innerWidth;
            queue.generatePositionsInPanel(startPoint, xDiff * 2, yDiff, 100, 50, windowWidth);
    
            for(var i = 0; i < queue.values.length; i++) {
                queue.values[i].isLastIdx = false;
            }
    
            //HACK - apply not getting called when Push is called for the first time
            if(structureDataService.selectedStructure.changeType == 'Add') {
                queue.values[0].isLastIdx = true;
                $scope.nodes = queue.values;
            }
            else if(structureDataService.selectedStructure.changeType == 'Delete') {
                queue.values[queue.values.length - 1].isLastIdx = true;
            }
    
            $scope.nodes = queue.values;
        });
    }
});