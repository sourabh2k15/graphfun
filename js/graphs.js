var Graph = function(){
  this.vertices = [];
  this.edges    = [];
  this.positions = [];
  this.index =-1;
  this.prev = -1;
}

Graph.prototype.addVertex = function(x){
   this.vertices.push(x);
   this.edges.push([]);
}

Graph.prototype.getVertex = function(key){
   return this.vertices[key];
}

Graph.prototype.addEdge = function(){
   this.edges[this.prev].push(this.getVertex(this.index));
   this.edges[this.index].push(this.getVertex(this.prev));
}

Graph.prototype.addPosition = function(pos){
  this.positions.push(pos);
}

Graph.prototype.updatePos = function(i,pos){
  this.positions[i] = pos;
}

Graph.prototype.getCount = function(){
  return this.positions.length;
}

Graph.prototype.getPosition = function(key){
  return this.positions[key];
}

Graph.prototype.getEdges = function(key){
  return this.edges[key];
}

Graph.prototype.getPofV = function(v){
  return this.positions[this.vertices.indexOf(v)];
}

Graph.prototype.isNode = function(x,y,t){
  for(var i=0;i<this.getCount();i++){
    if(Math.sqrt( Math.pow((this.positions[i][0] - x),2) + Math.pow((this.positions[i][1] - y),2)) <= t){ break;}
  }
  this.index = i;
  if(i==this.getCount()) return false;
  else return true;
}

Graph.prototype.getIndex = function(){
  return this.index;
}

Graph.prototype.setPrev = function(x){
  this.prev = x;
}

Graph.prototype.getPrev = function(){
  return this.prev;
}

Graph.prototype.isPrevEmpty = function(){
  if(this.prev == -1) return true;
  else return false;
}
