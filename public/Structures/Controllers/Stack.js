'use strict';

//BSTNODE
function BSTNode(value, valueIndex, position) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.position = position;
  this.valueIndex = valueIndex;
}

////////////////////////////////////////////////////////////////////
//BST
////////////////////////////////////////////////////////////////////

//CONSTRUCTOR
function BinarySearchTree(name) {
  this.name = name;
}

//METHODS
BinarySearchTree.prototype.insert = function(value, valueIndex) {
  var currNode = this.root;
  var newNode = new BSTNode(value, valueIndex, new Vector2(0, 0));

  if(this.root == null) {
    this.root = newNode;
    return;
  }

  while(currNode) {

    if(value < currNode.value) {
      if(currNode.left) {
        currNode = currNode.left;
      }
      else {
        currNode.left = newNode;
        break;
      }
    }
    else {
      if(currNode.right) {
        currNode = currNode.right;
      }
      else {
        currNode.right = newNode;
        break;
      }
    }
  }
}

BinarySearchTree.prototype.inorderPush = function(array, node) {
  
  if(node) {
    this.inorderPush(array, node.left);
    array.push(node);
    this.inorderPush(array, node.right);
  }
}
  
BinarySearchTree.prototype.serialize = function(array) {

  this.inorderPush(array, this.root);
}

BinarySearchTree.prototype.generatePositionsInPanel = function(startPos, panelWidth, panelHeight) {

  this.totalNodes = 0;
  this.computeNodePositions();

  this.gatherPositions(this.root, startPos, panelWidth, panelHeight);
}

BinarySearchTree.prototype.gatherPositions = function(node, startPos, panelWidth, panelHeight) {

  var dx = 0;
  var dy = 0;
  var dx2 = 0;
  var dy2 = 0;
  var ys = 20;
  var treeHeight = this.getTreeHeight(this.root);
  var xScale = panelWidth / this.totalNodes;

  if(this.totalNodes < 4) {
      xScale = panelWidth / 8;
  }
  var yScale = (panelHeight - ys) / (treeHeight + 1);
  
  if (node != null) {  
    this.gatherPositions(node.left, startPos, panelWidth, panelHeight); 
    dx = node.position.x * xScale; // get x,y coords., and scale them  
    dy = node.position.y * yScale; 

    node.position = new Vector2(startPos.x + (dx - ys), startPos.y + dy);
    this.gatherPositions(node.right, startPos, panelWidth, panelHeight); //now do right side of inorder traversal  
  } 
}

BinarySearchTree.prototype.getTreeHeight = function(node) {

  if (node == null) {
    return -1; 
  }
  else {
    return 1 + Math.max(this.getTreeHeight(node.left), this.getTreeHeight(node.right)); 
  }
}

BinarySearchTree.prototype.inorderTraversal = function(node, depth) { 

  if (node != null) { 
    this.inorderTraversal(node.left, depth + 1);
    this.totalNodes += 1;
    node.position.x = this.totalNodes + 1;
    node.position.y = depth - 1;
    this.inorderTraversal(node.right, depth + 1); 
  } 
} 

BinarySearchTree.prototype.computeNodePositions = function() { 

    var depth = 1; 
    this.inorderTraversal(this.root, depth); 
} 


