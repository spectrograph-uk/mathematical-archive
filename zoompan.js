
var zoomed=false
var zoomData=[]
var zoomImData=[]
function zoomPan(div,scaleWidth,panLeft,scaleHeight,panTop){
var a=div.getElementsByTagName("div")
var b=div.getElementsByTagName("img")
if(!zoomed){zoomed=true
for(var i=0;i<a.length;i++){
a[i].id="divv"+i.toString();zoomData[i]=[a[i].style.width.replace(/[^0-9\.\-]/g,""),a[i].style.left.replace(/[^0-9\.\-]/g,""),a[i].style.height.replace(/[^0-9\.\-]/g,""),a[i].style.top.replace(/[^0-9\.\-]/g,"")]
}
for(var i=0;i<b.length;i++){
b[i].id="imgg"+i.toString();zoomImData[i]=[b[i].style.width.replace(/[^0-9\.\-]/g,""),b[i].style.left.replace(/[^0-9\.\-]/g,""),b[i].style.height.replace(/[^0-9\.\-]/g,""),b[i].style.top.replace(/[^0-9\.\-]/g,"")]
}

}
// already zoomed once

for(var i=0;i<a.length;i++){
var u=document.getElementById("divv"+i.toString())
if(zoomData[i][0]>1)
u.style.width=(zoomData[i][0]*scaleWidth).toString()+"px"
u.style.left=((zoomData[i][1]-panLeft)*scaleWidth).toString()+"px"
u.style.height=(zoomData[i][2]*scaleHeight).toString()+"px"
u.style.top=((zoomData[i][3]-panTop)*scaleHeight).toString()+"px"
}


for(var i=0;i<b.length;i++){
var u=document.getElementById("imgg"+i.toString())
var c=1
if(u.parentNode!=div)c=0
u.style.width=(zoomImData[i][0]*scaleWidth).toString()+"px"
u.style.left=((zoomImData[i][1]-c*panLeft)*scaleWidth).toString()+"px"
u.style.height=(zoomImData[i][2]*scaleHeight).toString()+"px"
u.style.top=((zoomImData[i][3]-c*panTop)*scaleHeight).toString()+"px"
}


}

