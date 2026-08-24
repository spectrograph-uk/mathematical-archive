function writeMarkings(){
document.getElementById("sgraph").style.position="relative"
document.getElementById("sgraph").style.width="1000px"
document.getElementById("sgraph").style.height="110px"
document.getElementById("sgraph").style.background="black"
document.getElementById("sgraph").style.borderStyle="solid"
document.getElementById("sgraph").style.borderWidth="3px"
document.getElementById("sgraph").style.borderColor="#CCAA55"


for(var i=0;i<20;i++){
var s=document.createElement("div")
s.style.lineHeight="0px"
s.style.width="1px"
s.style.height="5px"
s.style.background="#cccccc"
s.style.left=(50*i).toString()+"px"
s.style.position="absolute"
s.style.top="90px"
var l=document.createElement("div")
l.style.position="absolute"
l.style.width="40px"
l.style.left=(-10+50*i).toString()+"px"
l.innerHTML=i.toString()+"00 nm"
l.style.top="98px"
l.style.height="10px"
l.style.lineHeight="10px"
l.style.fontSize="10px"
l.style.color="#cccccc"
document.getElementById("sgraph").appendChild(s)
if(i>0)document.getElementById("sgraph").appendChild(l)
var li=document.createElement("div")
li.style.height="1px"
li.style.lineHeight="1px"
li.style.width="1000px"
li.style.background="#AAAAAA"
li.style.position="absolute"
li.style.top="89px"
document.getElementById("sgraph").appendChild(li)
zoomed=0
}}

function writeLn(x,h){
var w=document.createElement("div")
w.style.position="absolute"
var nm=299792458*Math.pow(10,9)/x
w.style.height="75px"
w.style.width="1px"
w.style.top="5px"
w.style.lineHeight="1px"
w.style.background="#cccccc"
if(freq2RGB(x,h)!="rgb(0,0,0)")w.style.background=freq2RGB(x,h)
w.style.left=(nm/2).toString()+"px"
if(nm>0&&nm<2000)
document.getElementById("sgraph").appendChild(w)
zoomed=false
}
function clearLn(){

while(document.getElementById("sgraph").firstChild)
document.getElementById("sgraph").removeChild(
document.getElementById("sgraph").firstChild)
writeMarkings()
zoomed=false
}