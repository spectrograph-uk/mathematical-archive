// This is a collection of linear algebra and polynomial algebra
// functions used in character and linear algebra calculations


//Note, this does not get called directly anymore and is here for expository purposes only.
//A vesion of this is in the webworker now.



function factorial(i){
if(i==0)return 1
return i*factorial(i-1)

}

function binomial(i,j){if(i<j)return 0
return factorial(i)/(factorial(j)*factorial(i-j))

}


function plus(a,b){
if(typeof(a)!="object"&&typeof(b)!="object")return a+b
if(typeof(a)!="object")a=[a]
if(typeof(b)!="object")b=[b]
var result=[]
var max=a.length
if(b.length>a.length)max=b.length
for(var i=0;i<max;i++){
if(a[i]!=undefined&&b[i]!=undefined)result[i]=plus(a[i],b[i])
if(a[i]==undefined)result[i]=b[i]
if(b[i]==undefined)result[i]=a[i]
}
return result
}


function poly2string(m,vars){
if(typeof(m)!="object")return m.toString()
var result=""
var vars2=vars.slice()
var letter=vars2[0]
vars2.splice(0,1)//remove first entry
for(var i=0;i<m.length;i++){
var prev=poly2string(m[i],vars2)
var added=letter+"\^{"+i+"}"
result+=prev.replace(/\+/g,added+"+")
result+=added
if(i<m.length-1)result+="+"
}

return result
}

function poly2HTML(m,vars){
if(typeof(m)!="object")return m.toString()
var result=""
var vars2=vars.slice()
var letter=vars2[0]
vars2.splice(0,1)//remove first entry
for(var i=0;i<m.length;i++){
var prev=poly2HTML(m[i],vars2)
var added=letter
added+="\<sup\>"+i+"\</sup\>"
if(i!=0)result+=prev.replace(/(.)(\-)/g,"$1"+added+"-").replace(/\+/g,added+"+")+added
if(i==0)result+=prev
if(i<m.length-1)result+="+"
}
var x=result.replace(/\+\-/g,"-")
.replace(/(^|[\+\-])(0)([a-zA-Z0-9\<\>\/sup]*)/g,"")
.replace(/^[\+]/g,"")
if(x.match(/^[\ ]*$/)){return "0"}else{return x}
}

function minus(a,b){
var c=polyTimes(b,-1)
return plus(a,c)
}





function polyTimes(a,b){
while(depth(a)<depth(b)) a=[a]
while(depth(b)<depth(a)) b=[b]
if(typeof(a)!="object"&&typeof(b)!="object")return a*b
if(typeof(a)!="object")a=[a]
if(typeof(b)!="object")b=[b]
var result=[]
for(var i=0;i<a.length;i++){
for(var j=0;j<b.length;j++){
if(result[i+j]!=undefined){result[i+j]=plus(result[i+j],polyTimes(a[i],b[j]))}
else{result[i+j]=polyTimes(a[i],b[j])}
}}
return result
}




function depth(b){
var a=b
var d=0
while(typeof(a)=="object"){d++;a=a[0]}
return d
}



function diff(i,b){
if(depth(b)-1==i){
var a=[]
for(var j=0;j<b.length-1;j++){a[j]=polyTimes(j+1,b[j+1])}
return a}
else
{var a=[]
for(var j=0;j<b.length;j++){a[j]=diff(i,b[j])}
return a}
}

function transpose(m){
var a=m[0].length
var b=m.length
var n=[]
for(var i=0;i<a;i++){n[i]=[];for(var j=0;j<b;j++){n[i][j]=m[j][i]}}
return n
}



function w(x){return JSON.stringify(x)}




function copy(m){
//copy m
var m3=[]
for(var s=0;s<m.length;s++){m3[s]=[];for(var t=0;t<m[s].length;t++){m3[s][t]=m[s][t]}}
return m3

}



//invert a matrix (can simplify this I think)

function inverse(m3){
var m=copy(m3)
var n=m.length
for(var i=0;i<n;i++){
for(var j=0;j<n;j++){if(i==j){m[i].push(1)}else{m[i].push(0)}}}

for(var i=0;i<n;i++){m=reduce(m,i)}

for(var i=n-1;i>-1;i--){for(var j=0;j<i;j++){for(var k=n;k<2*n;k++){m[j][k]=(m[j][k]-m[j][i]/m[i][i]*m[i][k])}}}
for(var i=0;i<n;i++){for(var k=n;k<2*n;k++){m[i][k]=m[i][k]/m[i][i]}}
for(var i=0;i<n;i++){m[i]=m[i].slice(n,2*n)}

return m}

// Put smallest entry in column i in row at least i into position (i,i) by row ops
// and subtract, keep going.
function reduce(m,i){


//find min abs value in column i, row at least i
var min=Infinity
 var save=-1
for(var j=i;j<m.length;j++){
if(min>Math.abs(m[j][i])&&Math.abs(m[j][i])>0){save=j;min=Math.abs(m[j][i])}

}

if(save==-1)return  m

//Switch


var s=m[i]
m[i]=m[save]
m[save]=s
if((save-i)%2==1||(i-save)%2==1){for(var u=0;u<m[0].length;u++){m[0][u]=-m[0][u]}}
//do the op
var done=true
for(var j=i-0+1;j<m.length;j++){
var ratio=m[j][i]/m[i][i]

if(ratio>0){ratio=Math.floor(ratio);done=false}
if(ratio<0){ratio=-Math.floor(-ratio);done=false}
for(var ii=0;ii<m[0].length;ii++){
m[j][ii]=m[j][ii]-ratio*m[i][ii]

}
}

if(done){return m}else{return reduce(m,i)}
}







function det(m){
var result=1
for(var i=0;i<m.length;i++){m=reduce(m,i)}

for(var i=0;i<m.length;i++){result=result*m[i][i]}
return result
}



























function triangularize(m3){
m=copy(m3)



for(var i=0;i<m[0].length;i++){m=reduce(m,i)}
return m

}

function times(a,b){
var c=[]
for(var i=0;i<a.length;i++){c[i]=[]
for(var j=0;j<b[0].length;j++){var t=0;
for(var k=0;k<a[i].length;k++){t=t+a[i][k]*b[k][j]}
c[i][j]=t
}}
return c
}

function commutator(a,b){return minus(times(a,b),times(b,a))}