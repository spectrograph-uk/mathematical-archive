var showingColors=false
var allowForbidden=false

function showColors(){
document.body.style.background="black"
document.getElementById("colorButton").value="show levels"
document.getElementById("colorButton").onclick=function(){
if(resultt.length==0){showLevels(0)}
else{showLevels(pmult*resultt[0][11]+emult*resultt[0][10])}}
showingColors=true
while(document.getElementById("terms").firstChild)document.getElementById("terms").removeChild(document.getElementById("terms").firstChild)

var resultt2=[]
for(var i=0;i<resultt.length*2/3;i++){for(var j=i+1;j<resultt.length*2/3;j++){
if(allowForbidden||
(parseInt(resultt[i][7])==parseInt(resultt[j][7])&&
Math.abs(parseInt(resultt[i][8])-parseInt(resultt[j][8]))<=2&&
(
(resultt[i][0].match(/\#176/)&&!resultt[j][0].match(/\#176/))
||
(!resultt[i][0].match(/\#176/)&&resultt[j][0].match(/\#176/))
)))
resultt2.push([resultt[j][0]+ "\<sub\>"+resultt[j][9].replace(/\<[^\>]+[\>]/g,"")+"\</sub\>"  +" - "+ resultt[i][0]+"\<sub\>"+resultt[i][9].replace(/\<[^\>]+[\>]/g,"")+"\</sub\>"  ,
pmult*resultt[j][11]+emult*resultt[j][10]-pmult*resultt[i][11]-emult*resultt[i][10],(resultt.length*2-1-i-j)/resultt.length/2])}}

resultt2.sort(function(a,b){return a[1]-b[1]})
var st="\<table\>"

for(var i=0;i<resultt2.length;i++){if(freq2RGB(resultt2[i][1])!="rgb(0,0,0)")
st+="\<tr style=\"background:"+freq2RGB(resultt2[i][1],resultt2[i][2])+"\"\>\<td style=\"padding-right:20px\"\>"+resultt2[i][0]+"&nbsp;"+lightUnits(-resultt2[i][1])+"\</td\>\</tr\>"
}
st+="\<div style=\"height:10px\"\>\</div\>\</table\>"
document.getElementById("terms").innerHTML=st

}








var scaleWidth=1,panLeft=0,scaleHeight=1,panTop=0
function graphColors(){
clearLn()
var resultt2=[]

for(var i=0;i<resultt.length*2/3;i++){
for(var j=i+1;j<resultt.length*2/3;j++){
if(allowForbidden||
(parseInt(resultt[i][7])==parseInt(resultt[j][7])&&
Math.abs(parseInt(resultt[i][8])-parseInt(resultt[j][8]))<=2&&
(
(resultt[i][0].match(/\#176/)&&!resultt[j][0].match(/\#176/))
||
(!resultt[i][0].match(/\#176/)&&resultt[j][0].match(/\#176/))
)))
writeLn(pmult*resultt[j][11]+emult*resultt[j][10]-pmult*resultt[i][11]-emult*resultt[i][10],(resultt.length*2-1-i-j)/resultt.length/2)
}}
if(ionn==1&&aNumber>0)showImage(aNumber)
zoomed=false
//zoomed2=false
zoomPan(document.getElementById("sgraph"),scaleWidth,panLeft,scaleHeight,panTop)
//zoomPan2(document.getElementById("divv0"),scaleWidth,0,scaleHeight,0)//will be the renamed showdiv
}