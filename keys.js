var scaleWidthSpeed=0,panLeftSpeed=0,scaleHeightSpeed=0,panTopSpeed=0

var thistimer=0
function tim(){thistimer++;setTimeout(tim,100)

if(downDown)scaleWidthSpeed=scaleWidthSpeed-2
if(upDown)scaleWidthSpeed++
if(rightDown)panLeftSpeed++
if(leftDown)panLeftSpeed--
scaleWidthSpeed=scaleWidthSpeed*.995
panLeftSpeed=panLeftSpeed*.94
panLeft=panLeft+panLeftSpeed/scaleWidth+500*scaleWidthSpeed/Math.pow(scaleWidth,2)*.02
scaleWidth=scaleWidth-0+scaleWidthSpeed*.02
if(scaleWidth<1){scaleWidth=1;panLeft=0;panLeftSpeed=0;scaleWidthSpeed=0}
if(oldscaleWidth!=scaleWidth||oldpanLeft!=panLeft||oldscaleHeight!=scaleHeight||oldpanTop!=panTop){
zoomPan(document.getElementById("sgraph"),scaleWidth,panLeft,scaleHeight,panTop)
oldpanLeft=panLeft;oldscaleHeight=scaleHeight;oldscaleWidth=scaleWidth;oldpanTop=panTop}
}
var oldscaleWidth=0,oldpanLeft=0,oldscaleHeight=0,oldpanTop=0


var upDown=false,leftDown=false,rightDown=false,downDown=false

function keydown(e){
e=(window.event)?event:e
 var key=(e.keyCode)?e.keyCode:e.charCode;
if(key=="38"){upDown=true; e.preventDefault();return false}
if(key=="40"){downDown=true; e.preventDefault();return false}
if(key=="37"){leftDown=true; e.preventDefault();return false}
if(key=="39"){rightDown=true; e.preventDefault();return false}
}

function keyup(e){
e=(window.event)?event:e
 var key=(e.keyCode)?e.keyCode:e.charCode;
if(key=="38"){upDown=false; e.preventDefault();return false}
if(key=="40"){downDown=false; e.preventDefault();return false}
if(key=="37"){leftDown=false;e.preventDefault();return false}
if(key=="39"){rightDown=false;e.preventDefault();return false}
//if(key=="13"){nextt2(aNumber)}
}

 

document.onkeydown=keydown
document.onkeyup=keyup


