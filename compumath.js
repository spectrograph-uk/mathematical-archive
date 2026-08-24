// Note once we put in flattens we can ignore the loops of length 1

function otimes(a,b){

if(a.length==0)return b
if(b.length==0)return a
while((a.op=="."||a.op=="+")&&a.length==1)a=a[0]
while((b.op=="."||b.op=="+")&&b.length==1)b=b[0]
if(a.op=="."&&b.op=="."){res=a.concat(b);res.op=".";return res}
if(a.op=="."){res=a.concat([b]);res.op=".";return res}
if(b.op=="."){res=[a].concat(b);res.op=".";return res}
res=[a,b]
res.op="."
return res
}



function oplus(a,b){
if(a.length==0)return b
if(b.length==0)return a

if(a.op=="+"&&b.op=="+"){res=a.concat(b);res.op="+";return res}
if(a.op=="+"){res=a.concat([b]);res.op="+";return res}
if(b.op=="+"){res=[a].concat(b);res.op="+";return res}
res=[a,b]
res.op="+"
return res
}

function expand(aa){
if (aa.op=="+"){var  res=[];res.op="+";for(var i=0;i<aa.length;i++){res[i]=expand(aa[i])};return res}

if(aa.op=="."){

var a=flattenm(aa)

//find first part which is a nontrivial sum
for(var i=0;i<a.length;i++){

while(a[i].length==1&&(a[i].op=="+"||a[i].op=="."))a[i]=a[i][0]

if(a[i].op=="+"&&a[i].length>1){break}}

if(i==a.length)return a


if(i!=0){var parts1=a.slice(0,i)}
if(i!=a.length-1){var parts3=a.slice(i+1)}

if(i!=0){var res1=parts1;res1.op=".";if(res1.length==1){res1=res1[0]}}
var res2=a[i].slice(1);res2.op=".";if(res2.length==1){res2=res2[0]}
if(i!=a.length-1){var res3=parts3;res3.op=".";if(res3.length==1){res3=res3[0]}}

if(i==0)return oplus(otimes(a[i][0],res3),otimes(res2,res3))
if(i==a.length-1) return oplus(otimes(res1,a[i][0]),otimes(res1,res2))
return oplus( otimes(res1,otimes(a[i][0],res3)),otimes(res1,otimes(res2,res3)))
}

return aa
}




function expandmm(a){
if (a.op=="+"){var res=[];res.op="+";for(var i=0;i<a.length;i++){res[i]=expandmm(a[i])};return res}

if(a.op=="."){
//find first part which is has op of mm
for(var i=0;i<a.length;i++){if(a[i].op=="mm"&&a[i].length>1){break}}


if(i==a.length)return a
var val=flatten(a[i][1])
if(val.length<2)return a
if(val.op!="+")return a



var object1=mm(a[i][0],val[0])
if(a[i][1].length==2){
var object2=mm(a[i][0],val[1])}
else{
var o2=val.split(1);o2.op="+" 
object2=mm(a[i][0],o2)
}


if(i!=0){var parts1=a.slice(0,i)}
if(i!=a.length-1){var parts3=a.slice(i+1)}

if(i!=0){var res1=parts1;res1.op=".";if(res1.length==1){res1=res1[0]}}
if(i!=a.length-1){var res3=parts3;res3.op=".";if(res3.length==1){res3=res3[0]}}

if(i==0)return oplus(otimes(object1,res3),otimes(object2,res3))
if(i==a.length-1) return oplus(otimes(res1,object1),otimes(res1,object2))
return oplus( otimes(res1,otimes(object1,res3)),otimes(res1,otimes(object2,res3)))
}

return a
}



function shiftmm(a){

//assume already done expandmm and flatten

if (a.op=="+"){var res=[];res.op="+";for(var i=0;i<a.length;i++){res[i]=shiftmm(a[i])};return res}

if(a.op=="."){
//find first part which is has op of mm
for(var i=0;i<a.length;i++){if(a[i].op=="mm"&&a[i].length>1){break}}


if(i==a.length)return a







if(i!=0){var parts1=a.slice(0,i)}
var parts2=a[i][1]
var arg=a[i][0]
if(i!=a.length-1){var parts3=a.slice(i+1)}

if(i!=0){var res1=parts1;res1.op=".";if(res1.length==1){res1=res1[0]}}
var res2=parts2
if(i!=a.length-1){var res3=parts3;res3.op=".";if(res3.length==1){res3=res3[0]}}

if(i==0)return otimes(mm(arg,res3),res2)
if(i==a.length-1)return otimes(res1,mm(arg,res2)) // unchanged
return otimes(mm(arg,otimes(res3,res1)),res2)

}
return a
}

function expandAll(a){
var ret=a
var l=string(ret).length
var m=-1
while(l!=m){ l=m


ret=expand(ret)

var str=string(ret)

m=str.length


}
return ret
}







function string(a){
if(a.length==0)return ""
if(typeof(a)!="object")return a
if(a.op=="")return a[0]
var res=""
if(a.op=="+"){for(var i=0;i<a.length;i++){res+=string(a[i]); if(i<a.length-1)res+=" + "};return res}
if(a.op=="."){for(var i=0;i<a.length;i++){var sym1="";var sym2="";if(a[i].op=="+"||a[i].op=="."){sym1="(";sym2=")"};res+=sym1+string(a[i])+sym2}return res}

res=a.op+"("
for(var i=0;i<a.length;i++){res+=string(a[i]); if(i<a.length-1)res+=" , "}
res+=")"
return res


}



function isConstant(x){
if(x.op=="" && "CXn".match(x[0].charAt(0))   )return true
return false

}


function d(u){

if(u.op=="+"){
var res=[];res.op="+"
for(var k=0;k<u.length;k++){if(isConstant(u[k]))continue;res.push(d(u[k]))}
            
return res
}

if(u.op=="."){
var res=[];res.op="+"
for(var k=0;k<u.length;k++){if(isConstant(u[k]))continue
var ww=[];ww.op="."
for(var l=0;l<u.length;l++){
if(l==k){ww.push(d(u[l]))}
                             else
        {ww.push(u[l])}
 }
res.push(ww)
}


return res

}


if(u.op=="a"){
return otimes(aa(u[0]),  d(u[0]))

}

if(u.op=="m"){
return mm(u[0],d(u[0]))

}


var res=[u];res.op="d";return res

}


function aa(u){
var res=[u];res.op="aa";return res
}

function mm(u,v){var res=[u,v];res.op="mm";return res}


function a(x){var res=[x];res.op="a";return res}

function m(x){var res=[];res.op="m";res=[x];return res}
