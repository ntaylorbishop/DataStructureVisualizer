'use strict';

//BSTNODE
function QueueNode(value, position) {
    this.value = value;
    this.position = position;
}

////////////////////////////////////////////////////////////////////
//BST
////////////////////////////////////////////////////////////////////

//CONSTRUCTOR
function Queue(name) {
    this.name = name;
    this.values = [];
}

//METHODS
Queue.prototype.insert = function(value) {
    var newNode = new QueueNode(value, new Vector2(0, 0));
    this.values.push(newNode);
}

Queue.prototype.generatePositionsInPanel = function(startPos, panelWidth, panelHeight, width, height, windowWidth) {
    this.computeNodePositions(startPos, panelWidth, panelHeight, width, height, windowWidth);
}

Queue.prototype.computeNodePositions = function(startPos, panelWidth, panelHeight, width, height, windowWidth) { 
    var WARNING_MAGIC_NUMBER_HEIGHT = 50;
    var WARNING_MAGIC_NUMBER_WIDTH = 130;

    //var middleOfScreen = new Vector2(panelWidth / 2, panelHeight / 2);
    var middleOfScreen = new Vector2(panelWidth / 2, panelHeight / 2);
    var totalWidth = (this.values.length) * width;
    var xOffset = windowWidth * 0.35;
    var yOffset = 50;

    for(var i = 0; i < this.values.length; i++) {
        var xPos = middleOfScreen.x - (totalWidth / 2) + xOffset + (width + 2) * i;
        //var xPos = middleOfScreen.x - (totalWidth / 2) + (width + 2) * i;
        var yPos = middleOfScreen.y + yOffset;
        this.values[i].position = new Vector2(xPos, yPos);
    }
} 