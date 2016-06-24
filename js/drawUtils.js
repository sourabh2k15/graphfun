var drawHelper = function(ctx,w,h){
  this.ctx = ctx;
  this.w = w;
  this.h = h;
  this.prev = [];
  this.radius = w/40;
};

drawHelper.prototype.setRadius = function(r){
   this.radius = r;
}

drawHelper.prototype.getRadius = function(){
   return this.radius;
}

drawHelper.prototype.getContext = function(){
  return this.ctx;
}

drawHelper.prototype.getSnap = function(){
  return this.getContext().getImageData(0,0,this.w,this.h);
}

drawHelper.prototype.paint = function(img){
  this.getContext().putImageData(img,0,0);
}

drawHelper.prototype.drawNode = function(pos){
  var ctx = this.getContext();
  ctx.beginPath();
  ctx.arc(pos[0],pos[1],this.getRadius(),0,360,false);
  ctx.fillStyle = 'blue';
  ctx.fill();
}

drawHelper.prototype.drawEdge = function(pos){
  var ctx = this.getContext();
  ctx.strokeStyle = 'yellow';
  ctx.beginPath();
  ctx.lineWidth ='10px';
  ctx.moveTo(this.prev[0],this.prev[1]);
  ctx.lineTo(pos[0],pos[1]);
  ctx.lineJoin ='miter';
  ctx.stroke();
}

drawHelper.prototype.draw2Edge = function(pos1,pos2){
  var ctx = this.getContext();
  ctx.strokeStyle = 'yellow';
  ctx.beginPath();
  ctx.lineWidth ='10px';
  ctx.moveTo(pos1[0],pos1[1]);
  ctx.lineTo(pos2[0],pos2[1]);
  ctx.lineJoin ='miter';
  ctx.stroke();
}


drawHelper.prototype.blank = function(){
  var ctx = this.getContext();
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

drawHelper.prototype.addValue = function(x,pos){
  ctx.fillStyle = 'white';
  ctx.font = '20px Ubuntu';
  ctx.fillText(x,pos[0]-5,pos[1]+5);
}

drawHelper.prototype.feedPrev = function(pos){
  this.prev = pos;
}

drawHelper.prototype.getPrev = function(){
  return this.prev;
}

drawHelper.prototype.isPrevEmpty = function(){
  return this.prev.length == 0;
}