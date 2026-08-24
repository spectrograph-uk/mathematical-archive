// This whole file is just some code to speed up something else computationally

function equals2(x,y){
var res=[]
for(var i=0;i<x.length+3;i++){res[i]=[];for(var j=0;j<y.length+3;j++){res[i][j]=0}}
for(var i=0;i<x.length;i++){var min=i-2;if(min<0)min=0;var max=i+2;if(max>y.length)max=y.length;
for(var j=min;j<max;j++){if(x[i].equals(y[j]))res[i][j]=1}}
return res
}

var memoPth={}

function pth(e,i,j,a,b){              // initially call with (e,0,0,2,2), ways of deleting 2 elts from two parts so they match


if(i==j&&j==e.length-4&&a==0&&b==0)return [[[],[]]]


//var res=[]
var res2=[]
if(a<0||b<0||i>e.length-4||j>e.length-4||i-j>2||j-i>2)return res2

if(i==0&&j==0&&a==2&&b==2){
var test=sillyStringify2(e)
if(memoPth[test]!==undefined){return memoPth[test]}
}


if(e[i+1][j+1]==1){
//var  w=pth(e,i+1,j+1,a,b)[0]
var ww=pth(e,i+1,j+1,a,b)//[1]

for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
res2.push(ww[s])
}

}
if(e[i+2][j+1]==1){
//var  w=pth(e,i+2,j+1,a-1,b)[0]
var ww=pth(e,i+2,j+1,a-1,b)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0].push(i+1)
res2.push(ww[s])
}

}
if(e[i+1][j+2]==1){
//var  w=pth(e,i+1,j+2,a,b-1)[0]
var ww=pth(e,i+1,j+2,a,b-1)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][1].push(j+1)
res2.push(ww[s])

}

}

if(e[i+2][j+2]==1){
//var  w=pth(e,i+2,j+2,a-1,b-1)[0]
var ww=pth(e,i+2,j+2,a-1,b-1)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0].push(i+1)
ww[s][1].push(j+1)
res2.push(ww[s])
}

}

if(e[i+1][j+3]==1){
//var  w=pth(e,i+1,j+3,a,b-2)[0]
var ww=pth(e,i+1,j+3,a,b-2)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][1].push(j+2)
ww[s][1].push(j+1)
res2.push(ww[s])
}

}
if(e[i+2][j+3]==1){
//var  w=pth(e,i+2,j+3,a-1,b-2)[0]
var ww=pth(e,i+2,j+3,a-1,b-2)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0].push(i+1)
ww[s][1].push(j+2)
ww[s][1].push(j+1)
res2.push(ww[s])
}

}
if(e[i+3][j+3]==1){
//var  w=pth(e,i+3,j+3,a-2,b-2)[0]
var ww=pth(e,i+3,j+3,a-2,b-2)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0].push(i+2)
ww[s][0].push(i+1)
ww[s][1].push(j+2)
ww[s][1].push(j+1)
res2.push(ww[s])
}

}

if(e[i+3][j+1]==1){
//var  w=pth(e,i+3,j+1,a-2,b)[0]
var ww=pth(e,i+3,j+1,a-2,b)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0].push(i+2)
ww[s][0].push(i+1)
res2.push(ww[s])
}

}
if(e[i+3][j+2]==1){
//var  w=pth(e,i+3,j+2,a-2,b-1)[0]
var ww=pth(e,i+3,j+2,a-2,b-1)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0].push(i+2)
ww[s][0].push(i+1)
ww[s][1].push(j+1)
res2.push(ww[s])
}

}
if(i==0&&j==0&&a==2&&b==2)memoPth[test]=res2
return res2
}


function equals1(x,y){
var res=[]
for(var i=0;i<x.length+2;i++){res[i]=[];for(var j=0;j<y.length+2;j++){res[i][j]=0}}
for(var i=0;i<x.length;i++){var min=i-2;if(min<0)min=0;var max=i+2;if(max>y.length)max=y.length;
for(var j=min;j<max;j++){if(x[i].equals(y[j]))res[i][j]=1}}
return res
}



function pth1(e,i,j,a,b){              // initially call with (e,0,0,1,1), ways of deleting 1 elts from two parts so they match

if(i==j&&j==e.length-3&&a==0&&b==0)return [[]]


//var res=[]
var res2=[]
if(a<0||b<0||i>e.length-3||j>e.length-3||i-j>1||j-i>1)return res2




if(e[i+1][j+1]==1){
//var  w=pth1(e,i+1,j+1,a,b)[0]
var ww=pth1(e,i+1,j+1,a,b)//[1]

for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
res2.push(ww[s])
}

}
if(e[i+2][j+1]==1){
//var  w=pth1(e,i+2,j+1,a-1,b)[0]
var ww=pth1(e,i+2,j+1,a-1,b)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0]=i+1
res2.push(ww[s])
}

}
if(e[i+1][j+2]==1){
//var  w=pth1(e,i+1,j+2,a,b-1)[0]
var ww=pth1(e,i+1,j+2,a,b-1)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][1]=j+1
res2.push(ww[s])

}

}

if(e[i+2][j+2]==1){
//var  w=pth1(e,i+2,j+2,a-1,b-1)[0]
var ww=pth1(e,i+2,j+2,a-1,b-1)//[1]
for(var s=0;s<ww.length;s++){
//w[s][0].push(i)
//w[s][1].push(j)
//res.push(w[s])
ww[s][0]=i+1
ww[s][1]=j+1
res2.push(ww[s])
}

}


return res2
}

function sillyStringify(m){ // just for arrays 3 deep
var res="["
for(var i=0;i<m.length;i++){
res+="["
for(var j=0;j<m[i].length;j++){res+="["
for(var k=0;k<m[i][j].length;k++){res+=m[i][j][k].toString();if(k<m[i][j].length-1)res+=","}
res+="]"
if(j<m[i].length-1)res+=","
}
res+="]"
}
res+="]"
return res
}

function sillyStringify2(m){
return sillyStringify(arrayToSparse(m))
.replace(/\[\]/g,"")
.replace(/([\,]*)(\])/,"$2")
.replace(/^\[\[/,"")
.replace(/\]\]$/,"")
.replace(/\,/g,"A")
.replace(/\]/g,"B")
.replace(/\[/g,"C")

}



