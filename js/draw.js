// creating a canvas element
var picasso = document.createElement('canvas');
var canvasWidth = (window.innerWidth)*1;
var canvasHeight = (window.innerHeight)*1;
var ctx = picasso.getContext("2d");

// sizing and naming the canvas
picasso.id = "picasso";
picasso.width = canvasWidth;
picasso.height = canvasHeight;
picasso.style.border = '1px solid red';
document.getElementById("graphcanvas").appendChild(picasso);

// initializing graph, painterUtils and undo-redo
var painter = new drawHelper(ctx,canvasWidth,canvasHeight);
var graph   = new Graph();
var eraser  = new hist(10);

var addedNode = 0;
var nodeMove = 0;
var addEdge = 0;

var count = 0;

document.onkeypress = function(evt){
  console.log(evt.which);
  if(evt.which==101){
    console.log('user wants to add edge');
    addEdge = 1;
  }
  else if(evt.keyCode<=57){
    if(addedNode == 1){
      var val = evt.keyCode-48;
      var pos = graph.getPosition(graph.getCount()-1);
      graph.addVertex(val);
      console.log(pos);
      painter.addValue(val,pos);
      save();
      addedNode = 0;
    }
  }
  else if(evt.keyCode==117){
    painter.paint(eraser.undo());
  }
  else if(evt.keyCode==121){
    painter.paint(eraser.redo())
  }
}

picasso.onclick = function(evt){
  var x = evt.pageX, y = evt.pageY;
  var isNode = graph.isNode(x,y,painter.getRadius());
  // if position is not found in recorded node positions, it is safely concluded that user clicked on white,
  //  so either wants a new node or wants to move a node
  // if addEdge is 0 , means user is adding edge , so if nodeMove is 0 user is adding new node, or else if addEdge=0
  // and nodeMove = 1, implies user wants to move node

  if( !isNode && addEdge==0){
    // brand new node yippeee !!:)
    if(nodeMove==0){
      painter.drawNode([x,y]);
      graph.addPosition([x,y]);
      console.log("drew a node");
      addedNode = 1;
    }
    // selected new pos for node to move
    else{
      graph.updatePos(graph.getPrev(),[x,y]);
      console.log("graph redraw required!!");
      painter.blank();
      drawGraph();
    }
  }
  else if(isNode){
    if(addEdge==1){
      // selecting 1st vertex for edge
      if(graph.isPrevEmpty()){
         graph.setPrev(graph.index);
         painter.feedPrev(graph.getPosition(graph.index));
      }
      // selected 2nd vertex and completed edge
      else{
          console.log("drawing edge");
          painter.drawEdge(graph.getPosition(graph.index));
          graph.addEdge();
          graph.setPrev(-1);
          addEdge = 0;
          save();
      }
    }
    // moving the node, selected node to move
    else{
      console.log("moving node");
      if(graph.isPrevEmpty()){
        graph.setPrev(graph.getIndex());
        nodeMove=1;
      }
    }
  }
}

function drawGraph(){
  var pos = graph.getPosition(count);
  painter.drawNode(pos);
  var edgelist = graph.getEdges(count);

  for(var j=0;j<edgelist.length;j++){
    painter.draw2Edge(pos,graph.getPofV(edgelist[j]));
  }
  painter.drawNode(pos);
  painter.addValue(graph.getVertex(count),pos);
  count++;
  if(count<graph.getCount()){
    setTimeout(function(){ drawGraph(); },0);
  }else{
    save();
    console.log("finished drawing graph!");
    graph.setPrev(-1);
    painter.feedPrev([]);
    count =0;
    nodeMove = 0;
    addEdge = 0;
  }
}

function save(){ eraser.save(painter.getSnap());}