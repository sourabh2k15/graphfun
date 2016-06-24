// a stack for storing past snapshots of the canvas basically. stack has been implemented with an array
// in a non-circular manner, as size is limited, at the max "l" undos will work.

var hist = function(l){
  this.memory = l; // the number of states of the canvas we keep in memory
  this.stateArray  = [];
  this.currentState = -1;
}

hist.prototype.getLength = function(){ return this.stateArray.length; }

hist.prototype.save = function(img){
  if(this.getLength()== this.memory) this.stateArray.shift();
  this.stateArray.push(img);
  if(this.currentState< this.memory-1) this.currentState++;
}

hist.prototype.undo = function(){
  if(this.currentState>0) this.currentState--;
  return this.stateArray[this.currentState];
}

hist.prototype.redo = function(){
  if(this.currentState< this.memory-1) this.currentState++;
  return this.stateArray[this.currentState];
}