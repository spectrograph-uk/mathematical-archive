//This isn't used but it is a useful debugging tool, taking d=document.getElementById("terms") we can 
// graph sequences simultaneously to see what is going on.

function arraygraph(x,d,w,h){//x an array of arrays, d a div, w and h height and width of desired graph
if(typeof(d)=="undefined")d=document.body
if(typeof(h)=="undefined")h=d.offsetHeight
if(typeof(w)=="undefined")w=d.offsetWidth

//find min and max
var min=Infinity,max=-Infinity
for(var i=0;i<x.length;i++){
for(var j=0;j<x[i].length;j++){
for(var k=0;k<x[i][j].length;k++){
if(min>x[i][j][k])min=x[i][j][k]
if(max<x[i][j][k])max=x[i][j][k]


}}}

var colors=["red","green","blue","black", "brown", "orange", "yellow"]
for(var i=0;i<x.length;i++){
for(var j=0;j<x[i].length;j++){
for(var k=0;k<x[i][j].length;k++){
var a=document.createElement("div")
a.style.background=colors[i]
a.style.lineHeight="1px"
a.style.width="4px"
a.style.height="4px"
a.style.position="absolute"
a.style.top=(  h-h*(x[i][j][k]-min)/(max-min)    ).toString()+"px"
a.style.left=(w-w*j/x[0].length).toString()+"px"
d.appendChild(a)
}}}

}