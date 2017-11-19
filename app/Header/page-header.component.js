'use strict';

angular.
  module('DataStructureVisualizer').
  component('pageHeader', {
    template:
      '<div id="header">' + 
      '<center>' + 
        '<a href="#!/BinaryTree">Binary Tree</a>' + 
        '<a href="#!/Stack">Stack</a>' + 
        '<a href="#!/Queue">Queue</a>' + 
        '<a href="#!/Heap">Heap</a>' + 
        '<a href="#!/LinkedList">Linked List</a>' + 
      '</center>' + 
      '</div>',
    controller: function PageHeaderController() {

    }
  });