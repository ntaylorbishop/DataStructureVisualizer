'use strict';

//BSTNODE
function StackNode(value, position) {
    this.value = value;
    this.position = position;
}

////////////////////////////////////////////////////////////////////
//BST
////////////////////////////////////////////////////////////////////

//CONSTRUCTOR
function Stack(name) {
    this.name = name;
    this.values = [];
}

//METHODS
Stack.prototype.insert = function(value) {
    var newNode = new StackNode(value, new Vector2(0, 0));
    this.values.push(newNode);
}

Stack.prototype.generatePositionsInPanel = function(startPos, panelWidth, panelHeight, width, height) {
    this.computeNodePositions(startPos, panelWidth, panelHeight, width, height);
}

Stack.prototype.computeNodePositions = function(startPos, panelWidth, panelHeight, width, height) { 
    var WARNING_MAGIC_NUMBER_HEIGHT = 50;
    var WARNING_MAGIC_NUMBER_WIDTH = 130;
    for(var i = 0; i < this.values.length; i++) {
        var xPos = startPos.x + (panelWidth / 2) + WARNING_MAGIC_NUMBER_WIDTH - (width / 2);
        var yPos = startPos.y + panelHeight - WARNING_MAGIC_NUMBER_HEIGHT - height * i;
        this.values[i].position = new Vector2(xPos, yPos);
    }
} 