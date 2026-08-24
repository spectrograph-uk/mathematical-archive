//assumes square matrices

var zeroVector=[]
function sparseToArray(x){
var n=x[0].length,ind=x[0],entries=x[1]

if(zeroVector[n]===undefined){
var z=[];for(var i=0;i<n;i++){z.push(0)}
zeroVector[n]=z
}

var res=[]
for(var i=0;i<n;i++){res.push(zeroVector[n].slice(0))}
for(var i=0;i<ind.length;i++){for(var j=0;j<ind[i].length;j++){
res[i][ind[i][j]]=entries[i][j]
}}
return res
}

function arrayToSparse(x){
var ind=[],entries=[]
for(var i=0;i<x.length;i++){ind[i]=[];entries[i]=[];for(var j=0;j<x[0].length;j++){
var u=x[i][j]
if(u!=0){entries[i].push(u);ind[i].push(j)}
}}

return [ind,entries]

}


function sparseTimes(x,y){ //creates non-sparse

var n=x[0].length

if(zeroVector[n]===undefined){
var z=[];for(var i=0;i<n;i++){z.push(0)}
zeroVector[n]=z
}

var result=[],temp=[]
for(var i=0;i<n;i++){temp.push(zeroVector[n].slice(0));result.push(zeroVector[n].slice(0))}


var indy=y[0],entriesy=y[1]
for(var i=0;i<indy.length;i++){for(var j=0;j<indy[i].length;j++){
temp[i][indy[i][j]]=j+1// so it is not zero!
}}

var indx=x[0],entriesx=x[1]



for(var i=0;i<indx.length;i++){for(var j=0;j<indx[i].length;j++){
var u=indx[i][j]
for(var k=0;k<temp.length;k++){

if(temp[u][k]!=0){
result[i][k]+=entriesx[i][j]*entriesy[u][temp[u][k]-1]
}}}}
return result
}


