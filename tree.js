
var width = 500;
var speed=100/1
var height = 500;
var gr=0;
var u=0;
var lines = [];
function tree(xo, yo, len, angle) {
  if (len <2) {
    return;
  }
  var rad = angle * Math.PI / 180;
  var xe = xo + len * Math.sin(rad);
  var ye = yo - len * Math.cos(rad);
  var xc = (xo + xe) / 2;
  var yc = (yo + ye) / 2;
  lines.push([xo, yo, xe, ye,len]);
  var a
  if (gr>10){gr=gr-1;}
  if (gr<-10){gr=gr+1;}
  if (angle<-15){a=-5+gr;}
  else if(angle>15){a=5+gr;}
  else {gr=gr+(Math.random()-Math.random())/30;a=gr;}
  tree(xe, ye, len*(0.7), angle+a);
  tree(xc, yc, len*(0.6), angle-44);
  tree(xe, ye, len*(0.5), angle+44);
}
function drawer(u) {
   var um=u/2;
   if (um>120){um=120;}
   lines = [];
   tree(250, 450, um, 0);
   ctx.clearRect(0, 0, width, height);
   ctx.save();
   ctx.beginPath();
   if (um<50){
   ctx.arc(250, 450, 5-um/10, 0 , 2 * Math.PI);
   ctx.fillStyle = "#920";
   ctx.fill();
   ctx.stroke();
   ctx.restore();
   }
   for (var i = 0; i < lines.length; i++) { 
       ctx.save();
       ctx.beginPath(); 
       var [x1, y1, x2, y2,len] = lines[i];
       ctx.lineWidth = len/20;
       var green=400/len+50;
       ctx.strokeStyle= "rgb(0," + green + ", 0)";
       ctx.moveTo(x1, y1);
       ctx.lineTo(x2, y2);
       if (len<5){
        ctx.arc(x1, y1, 2.8, 0 , 1 * Math.PI);
        var gre=700/len-100;
        if (gre<250-u/5 || um<100){
         ctx.fillStyle = "rgb(0," + gre + ", 0)";
        }
        else{
         ctx.fillStyle = "rgb(255,255, 150)";
        }
        ctx.fill();
      }
      ctx.stroke();
      ctx.restore();
    }
}
var canvas = document.getElementById("myCanvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
ctx.strokeStyle = '#000000';
var run=setInterval(function(){u=start(u);}, speed);
var run;
var u = 0;

function start(u) {
  u++;
  drawer(u);
  return u;
}
function n(){
u=0;
drawer(u);
} 
function pau(){
 clearInterval(run);
 document.r.pp.value="play";
 document.r.pp.onclick=plu;
}
function plu(){
 run=setInterval(function(){u=start(u);}, speed);
 document.r.pp.value="pause";
 document.r.pp.onclick=pau;
}
