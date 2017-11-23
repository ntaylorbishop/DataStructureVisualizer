
function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

var shouldDrag = true;

//Drag drop directive for Node
angular.module('DataStructureVisualizer')
.directive('dragDrop', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0;
      var startY = 0;
      var x = 0;
      var y = 0;

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();

        if(shouldDrag) {
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        }
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);

//Line draw directive for connecting nodes
angular.module('DataStructureVisualizer')
.directive('lineDraw', ['$document', function($document) {
return {
  link: function(scope, element, attr) {

      var canvas = document.getElementById("LineDrawCanvas");
      var canvasContext = canvas.getContext("2d");
      var start = new Vector2(0, 0);

      element.on('mousedown', function(event) {
          event.preventDefault();
          shouldDrag = false;

          var node = element[0].parentElement;

          var style = window.getComputedStyle(node);
          var left = parseInt(style.getPropertyValue('left'));
          var top = parseInt(style.getPropertyValue('top'));
          var width = parseInt(style.getPropertyValue('width'));
          var height = parseInt(style.getPropertyValue('height'));
          
          start = new Vector2(left + width / 2, top - height / 2);
          
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        end = new Vector2(event.pageX, event.pageY - 50);
        draw(start, end);
      }

      function mouseup() {
          shouldDrag = true;
          isDrawingCurrLine = false;
          canvasContext.clearRect(0, 0, 1903, 900);                  
        
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
      }

      function draw(start, end) {
        canvasContext.clearRect(0, 0, 1903, 900);        
        canvasContext.beginPath();
        canvasContext.moveTo(start.x, start.y);
        canvasContext.lineTo(end.x, end.y);
        canvasContext.strokeStyle="black";
        canvasContext.lineWidth = 1;
        canvasContext.closePath();
        canvasContext.stroke();    

        console.log(start);
      }
  }
};
}]);