'use strict';

class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}


//BST definition
class BinarySearchTree {
  //CONSTRUCTOR
  constructor(name, arrayOfValues) {
    this.name = name;

    //this.arrayOfValues = arrayOfValues;

    this.root = new BSTNode(arrayOfValues[0]);
    
    for(var i = 0; i < arrayOfValues.length; i++) {
      this.insert(arrayOfValues[i]);
    }
  }

  //METHODS
  insert(value) {

    var currNode = this.root;
    var newNode = new BSTNode(value);

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
}