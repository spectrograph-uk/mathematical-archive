if(typeof(importScripts)!="undefined")importScripts("polyalg.js","intkernel.js","numeric.js","inde.js","sparse.js")

onmessage=function(e){
var w
eval(e.data)

postMessage("w="+JSON.stringify(w)+";warnmults="+warnmults)

}

var fmult=1

var aNumber=1,ionn=1,econfig

// Here are the names of the atoms

var elts=[["0","NOTHING","NOTHING"],["1","H","Hydrogen"],["2","He","Helium"],
["3","Li","Lithium"],["4","Be","Beryllium"],["5","B","Boron"],["6","C","Carbon"],
["7","N","Nitrogen"],["8","O","Oxygen"],["9","F","Fluorine"],["10","Ne","Neon"],
["11","Na","Sodium"],["12","Mg","Magnesium"],["13","Al","Aluminum"],["14","Si","Silicon"],
["15","P","Phosphorus"],["16","S","Sulfur"],["17","Cl","Chlorine"],["18","Ar","Argon"],
["19","K","Potassium"],["20","Ca","Calcium"],["21","Sc","Scandium"],["22","Ti","Titanium"],
["23","V","Vanadium"],["24","Cr","Chromium"],["25","Mn","Manganese"],["26","Fe","Iron"],
["27","Co","Cobalt"],["28","Ni","Nickel"],["29","Cu","Copper"],["30","Zn","Zinc"],
["31","Ga","Gallium"],["32","Ge","Germanium"],["33","As","Arsenic"],["34","Se","Selenium"],
["35","Br","Bromine"],["36","Kr","Krypton"],["37","Rb","Rubidium"],["38","Sr","Strontium"],
["39","Y","Yttrium"],["40","Zr","Zirconium"],["41","Nb","Niobium"],["42","Mo","Molybdenum"],
["43","Tc","Technetium"],["44","Ru","Ruthenium"],["45","Rh","Rhodium"],["46","Pd","Palladium"],
["47","Ag","Silver"],["48","Cd","Cadmium"],["49","In","Indium"],["50","Sn","Tin"],
["51","Sb","Antimony"],["52","Te","Tellurium"],["53","I","Iodine"],["54","Xe","Xenon"],
["55","Cs","Cesium"],["56","Ba","Barium"],["57","La","Lanthanum"],["58","Ce","Cerium"],
["59","Pr","Praseodymium"],["60","Nd","Neodymium"],["61","Pm","Promethium"],
["62","Sm","Samarium"],["63","Eu","Europium"],["64","Gd","Gadolinium"],["65","Tb","Terbium"],
["66","Dy","Dysprosium"],["67","Ho","Holmium"],["68","Er","Erbium"],["69","Tm","Thulium"],
["70","Yb","Ytterbium"],["71","Lu","Lutetium"],["72","Hf","Hafnium"],["73","Ta","Tantalum"],
["74","W","Tungsten"],["75","Re","Rhenium"],["76","Os","Osmium"],["77","Ir","Iridium"],
["78","Pt","Platinum"],["79","Au","Gold"],["80","Hg","Mercury"],["81","Tl","Thallium"],
["82","Pb","Lead"],["83","Bi","Bismuth"],["84","Po","Polonium"],["85","At","Astatine"],
["86","Rn","Radon"],["87","Fr","Francium"],["88","Ra","Radium"],["89","Ac","Actinium"],
["90","Th","Thorium"],["91","Pa","Protactinium"],["92","U","Uranium"],["93","Np","Neptunium"],
["94","Pu","Plutonium"],["95","Am","Americium"],["96","Cm","Curium"],["97","Bk","Berkelium"],
["98","Cf","Californium"],["99","Es","Einsteinium"],["100","Fm","Fermium"],["101","Md","Mendelevium"],
["102","No","Nobelium"],["103","Lr","Lawrencium"],["104","Rf","Rutherfordium"],["105","Db","Dubnium"],
["106","Sg","Seaborgium"],["107","Bh","Bohrium"],["108","Hs","Hassium"],["109","Mt","Meitnerium"],
["110","Ds","Darmstadtium"],["111","Rg","Roentgenium"],["112","Cn","Copernicium"],["113","Uut","Ununtrium"],
["114","Fl","Flerovium"],["115","Uup","Ununpentium"],["116","Lv","Livermorium"],["117","Uus","Ununseptium"],
["118","Uuo","Ununoctium"]]





//numerical constants 

var h=6.62606957*Math.pow(10,-34)
var e=1.60217657*Math.pow(10,-19)
var m=9.10938291*Math.pow(10,-31)
var eps=8.854*Math.pow(10,-12)
var lightspeed=29979245800
var beta=-8*m*Math.pow(Math.PI*e/h,2)//  note if we divide by (4*Math.PI*eps)  its reciprocal is half the Bohr radius
var correction=-e*e/(h*Math.pow(4*Math.PI*eps,2)) //multiplies by e^2 and then converts to Hz



//Degree of the multipole expansion

var multipole=4




var terms=["s","p","d","f","g","h","i","k","l","m"]


//This section has routines to do things like get the highest weight sum
// from a character, or to get Casimir elements
// The main thing here is the function BasisLSJmJ which intersects
// four sublattices of an integer lattice to get a free abelian group
// with a basis which can be considered to be the multiple terms 
// of each type coming from one term symbol. It is not needed
// when things are multiplicity free and just the highest weight
// calculation is needed (but for a perturbation character) 


function highestWeight(chi){
var result=0

for(var phi=0;phi<chi.length;phi++){
for(var psi=0;psi<chi[phi].length;psi++){


var angularPoly=[]
for(var j=0;j<psi-2;j++){angularPoly.push(0)}
for(var j=psi-2;-1<j&&j<psi-1;j++){angularPoly.push(-1)}
for(var j=psi-1;-1<j&&j<psi;j++){angularPoly.push(0)}
for(var j=psi;j<psi+1;j++){angularPoly.push(1)}


var zeroPoly=minus(angularPoly,angularPoly)

var bothPoly=[]
for(var j=0;j<phi-2;j++){bothPoly.push(zeroPoly)}
for(var j=phi-2;-1<j&&j<phi-1;j++){bothPoly.push(polyTimes(-1,angularPoly))}
for(var j=phi-1;-1<j&&j<phi;j++){bothPoly.push(zeroPoly)}
for(var j=phi;j<phi+1;j++){bothPoly.push(angularPoly)}

result=plus(result,polyTimes(bothPoly,chi[phi][psi]))

}}
return result}









var bbinomial=[]
for(var i=0;i<50;i++){bbinomial[i]=[];
for(var j=0;j<50;j++){bbinomial[i][j]=binomial(i,j)}
}


var ffactorial=[]
for(var i=0;i<50;i++){ffactorial[i]=factorial(i)}
for(var i=1;i<50;i++){ffactorial[-i]=0}



function fastGamma(n){          //for integers or half integers
if(n%1==0)return ffactorial[n-1]
var a=Math.floor(2*n-1+.001)
var b=a/2
return ffactorial[a]*Math.pow(Math.PI,1/2)/(Math.pow(4,b)*ffactorial[b])
}


var gammaOfHalf=[]
for(var i=0;i<100;i++){
gammaOfHalf[i]=fastGamma(i/2)
}



function zeroOdd(a,b,c){
if(a%2==1||b%2==1||c%2==1)return 0
return 1
}












// non-sparse versions


/*


function oraiseL(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}
for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){
var u=compareL(r[ii],r[i])
if(u=="no")continue


result[ii][i]+=u[0]-u[1]+1
}}

return result
}

function olowerL(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)

var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}
for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){
var u=compareL(r[i],r[ii])

if(u=="no")continue







result[ii][i]+=u[0]-0+u[1]
}}

return result
}


function oraiseS(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}

for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){
var u=compareS(r[ii],r[i])
if(u=="no")continue


result[ii][i]+=u[4]

}}
return result
}




function olowerS(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}

for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){

var u=compareS(r[i],r[ii])

if(u=="no")continue



result[ii][i]+=u[4]

}}
return result
}

function olowerJ(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)

return plus(olowerL(r),olowerS(r))


}

function oraiseJ(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)

return plus(oraiseL(r),oraiseS(r))
}

function ocasimirJ(r){
var a=times(oraiseJ(r),olowerJ(r))
var b=times(olowerJ(r),oraiseJ(r))
var c=times(minus(a,b),minus(a,b))

var f=plus(a,b)
for(var i=0;i<f.length;i++){for(var j=0;j<f[i].length;j++){f[i][j]=2*f[i][j]}}
return plus(f,c)
}


function ocasimirL(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
var a=times(oraiseL(r),olowerL(r))
var b=times(olowerL(r),oraiseL(r))
var c=times(minus(a,b),minus(a,b))

var f=plus(a,b)
for(var i=0;i<f.length;i++){for(var j=0;j<f[i].length;j++){f[i][j]=2*f[i][j]}}
return plus(f,c)
}


function ocasimirS(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
var a=times(oraiseS(r),olowerS(r))
var b=times(olowerS(r),oraiseS(r))
var c=times(minus(a,b),minus(a,b))

var f=plus(a,b)
for(var i=0;i<f.length;i++){for(var j=0;j<f[i].length;j++){f[i][j]=2*f[i][j]}}
return plus(f,c)
}



*/

function memoizeCompareS(r){

for(var i=0;i<r.length;i++){compareSmemoized[i]=[];for(var j=0;j<r.length;j++){
compareSmemoized[i][j]=compareS(r[i],r[j])
}}

}

function memoizeCompareL(r){
for(var i=0;i<r.length;i++){compareLmemoized[i]=[];for(var j=0;j<r.length;j++){
compareLmemoized[i][j]=compareL(r[i],r[j])
}}

}



// sparse versions -- note that sparseTimes returns a non-sparse array


function raiseL(r){
if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
if(compareLmemoized.length==0)memoizeCompareL(r)
var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}
for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){
//var u=compareL(r[ii],r[i])
var u=compareLmemoized[ii][i]
if(u=="no")continue


result[ii][i]+=u[0]-u[1]+1
}}
return arrayToSparse(result)
}

function lowerL(r){
if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
if(compareLmemoized.length==0)memoizeCompareL(r)
var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}
for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){
//var u=compareL(r[i],r[ii])
var u=compareLmemoized[i][ii]
if(u=="no")continue







result[ii][i]+=u[0]-0+u[1]
}}

return arrayToSparse(result)
}


function raiseS(r){
if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
if(compareSmemoized.length==0)memoizeCompareS(r)
var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}

for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){
//var u=compareS(r[ii],r[i])
var u=compareSmemoized[ii][i]
if(u=="no")continue


result[ii][i]+=u[4]

}}
return arrayToSparse(result)
}




function lowerS(r){
if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
if(compareSmemoized.length==0)memoizeCompareS(r)
var result=[]
for(var i=0;i<r.length;i++){result[i]=[]
for(var j=0;j<r.length;j++){result[i][j]=0}}

for(var i=0;i<r.length;i++){
for(var ii=0;ii<r.length;ii++){

//var u=compareS(r[i],r[ii])
var u=compareSmemoized[i][ii]
if(u=="no")continue



result[ii][i]+=u[4]

}}
return arrayToSparse(result)
}

function lowerJ(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)

return arrayToSparse(plus(sparseToArray(lowerL(r)),sparseToArray(lowerS(r))))


}

function raiseJ(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)

return arrayToSparse( plus(sparseToArray(raiseL(r)),sparseToArray(raiseS(r))))
}

function casimirJ(r){
var a=sparseTimes(raiseJ(r),lowerJ(r))
var b=sparseTimes(lowerJ(r),raiseJ(r))
var w=minus(a,b)
var v=arrayToSparse(w)
var c=sparseTimes(v,v)

var f=plus(a,b)
for(var i=0;i<f.length;i++){for(var j=0;j<f[i].length;j++){f[i][j]=2*f[i][j]}}
return plus(f,c)
}


function casimirL(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
var a=sparseTimes(raiseL(r),lowerL(r))
var b=sparseTimes(lowerL(r),raiseL(r))
var w=minus(a,b)
var v=arrayToSparse(w)
var c=sparseTimes(v,v)

var f=plus(a,b)
for(var i=0;i<f.length;i++){for(var j=0;j<f[i].length;j++){f[i][j]=2*f[i][j]}}
return plus(f,c)
}


function casimirS(r){

if(typeof(r)=="string")r=term2array(r)
if(typeof(r[0][0])!="object")r=configsfaster(r)
var a=sparseTimes(raiseS(r),lowerS(r))
var b=sparseTimes(lowerS(r),raiseS(r))
var w=minus(a,b)
var v=arrayToSparse(w)
var c=sparseTimes(v,v)
var f=plus(a,b)
for(var i=0;i<f.length;i++){for(var j=0;j<f[i].length;j++){f[i][j]=2*f[i][j]}}
return plus(f,c)
}




function basisJ(K,e){


if(typeof(K)=="string")K=term2array(K)
if(typeof(K[0][0])!="object"){var x=configsfaster3(K)}else{var x=K}




var c=casimirJ(x)
for(var i=0;i<c.length;i++){c[i][i]=c[i][i]-e*(e+2)}
return intkernel(c)

}



function compareL(x,y){ //checks that x and y don't differ except one component of x[1] is one larger than corresp of y[1],
                             // and for this j return x[0][j], ..., x[3][j]
  
   var a=x.slice(0)
   var b=y.slice(0)
a.splice(1,1)
b.splice(1,1)
if(!a.equals(b))return "no" // checking differ except in l entry

for(var j=0;j<x[1].length;j++){
var a=x[1].slice(0)
var b=y[1].slice(0)
a.splice(j,1)
b.splice(j,1)

if(a.equals(b)&&x[1][j]-1==y[1][j]){return [x[0][j],x[1][j],x[2][j],x[3][j]]}
}
return "no"}










function compareS(x,y){      

// First check that x and y do not differ except  in [1] and [3] place

var a=x.slice(0)
var b=y.slice(0)

a.splice(3,1)

a.splice(1,1)

b.splice(3,1)
b.splice(1,1)
if(!a.equals(b))return "no"




//Next check that x[3] has just one extra 1 and otherwise equals y[3]

if(x[3].length!=y[3].length)return "no"



var cc=0
var save=-1
for(var i=0;i<x[3].length;i++){if(x[3][i]<y[3][i])return "no"
if(x[3][i]>y[3][i]){save=i;cc++}
if(cc>1)return "no"}
if(cc==0)return "no"


//save is the index of the extra entry in x[3]


//Now  find the index "savex" of the new entry in x[1] indexed by 1 in x[3]
//and the index "savey" of the new entry in y[1] indexed by 0 in y[3]

//First find left and rightmost difference (according to indexing only) bet x[1] and y[1]
var saveleft="nothing"
var saveright="nothing"
for(var i=0;i<x[1].length;i++){if(x[1][i]!=y[1][i]){saveleft=i;break}}
for(var i=x[1].length-1;i>-1;i--){if(x[1][i]!=y[1][i]){saveright=i;break}}
if(saveleft=="nothing"){savex=savey=save}else
{

var savex="nothing"
var savey="nothing"

if(x[3][saveleft]==1&&y[3][saveright]==0){savex=saveleft;savey=saveright}
if(x[3][saveright]==1&&y[3][saveleft]==0){;savex=saveright;savey=saveleft}

//still to need check not doing both? Probably already checked only one change

}


//Have to check that x[1] and y[1] agree except savex,savey positions switched
// and x[2][savex]=y[1][savey] etc ie that other locations are OK after the switch


var q=x[1].slice(0)
var qq=x[3].slice(0)
q.splice(savex,1)
qq.splice(savex,1)

var r=y[1].slice(0)
var rr=y[3].slice(0)
r.splice(savey,1)
rr.splice(savey,1)
if(x[1][savex]!=y[1][savey])return "no"
if(x[2][savex]!=y[2][savey])return "no"
if(x[0][savex]!=y[0][savey])return "no"
if((!q.equals(r))||!(qq.equals(rr)))return "no"




var aacount=0
for(var i=0;i<y[3].length;i++){aacount+=y[3][i]}
return [x[0][savex],x[1][savex],x[2][savex],x[3][savex],Math.pow(-1,savex-savey-0*aacount)]


}












function basisLS(t,eL,eS){
if(typeof(t)=="string")t=term2array(t)
if(typeof(t[0][0])!="object"){
if(useSlow){var x=configs(t)}else{var x=configsfaster(t)}

}else{var x=t}
var cs=casimirS(x)
var cl=casimirL(x)
for(var i=0;i<cs.length;i++){
for(var j=0;j<cs.length;j++){
cs[i][j]=3*cs[i][j]}}
var u=plus(cs,cl)
for(var i=0;i<u.length;i++){u[i][i]=u[i][i]-3*eS*(eS+2)-eL*(eL+2)}
return intkernel(u)}



// Can probably speed this up a lot by initially just projecting onto sublattice with basis being entries of configsfaster where mJ takes the right value.
// by an indexer, taking that is a minor of cs,cl,cj

/*

function basisLSJmJ(t,eL,eS,eJ,mJ){
if(typeof(t)=="string")t=term2array(t)
if(typeof(t[0][0])!="object"){var x=configsfaster(t)}else{var x=t}


if(csmemoized.length>0){var cs=matrixCopy(csmemoized)}else{var cs=casimirS(x);csmemoized=matrixCopy(cs)}
if(clmemoized.length>0){var cl=matrixCopy(clmemoized)}else{var cl=casimirL(x);clmemoized=matrixCopy(cl)}
if(cjmemoized.length>0){var cj=matrixCopy(cjmemoized)}else{var cj=casimirJ(x);cjmemoized=matrixCopy(cj)}


var mj=[]
for(var i=0;i<x.length;i++){mj[i]=[]
for(var j=0;j<x.length;j++){mj[i][j]=0}
for(var w=0;w<x[i][0].length;w++){mj[i][i]+=2*(x[i][1][w]+x[i][3][w])-1} // 2(a)+(2s-1)}
}
for(var i=0;i<cs.length;i++){cs[i][i]=cs[i][i]-eS*(eS+2)}
for(var i=0;i<cl.length;i++){cl[i][i]=cl[i][i]-eL*(eL+2)}
for(var i=0;i<cj.length;i++){cj[i][i]=cj[i][i]-eJ*(eJ+2)}
for(var i=0;i<mj.length;i++){mj[i][i]=mj[i][i]-mJ}


var u=[]
for(var i=0;i<cs.length;i++){u.push(cs[i])}
for(var i=0;i<cl.length;i++){u.push(cl[i])}
for(var i=0;i<cj.length;i++){u.push(cj[i])}
for(var i=0;i<mj.length;i++){u.push(mj[i])}




return intkernel(u)

}

*/

//This is a faster version of the function commented out above:

function basisLSJmJ(t,eL,eS,eJ,mJ){
if(typeof(t)=="string")t=term2array(t)
if(typeof(t[0][0])!="object"){var x=configsfaster(t)}else{var x=t}


if(csmemoized.length>0){var cs=matrixCopy(csmemoized)}else{var cs=casimirS(x);csmemoized=matrixCopy(cs)} // use memoized Casimirs if available
if(clmemoized.length>0){var cl=matrixCopy(clmemoized)}else{var cl=casimirL(x);clmemoized=matrixCopy(cl)}
if(cjmemoized.length>0){var cj=matrixCopy(cjmemoized)}else{var cj=casimirJ(x);cjmemoized=matrixCopy(cj)}


for(var i=0;i<cs.length;i++){cs[i][i]=cs[i][i]-eS*(eS+2)}
for(var i=0;i<cl.length;i++){cl[i][i]=cl[i][i]-eL*(eL+2)}
for(var i=0;i<cj.length;i++){cj[i][i]=cj[i][i]-eJ*(eJ+2)}

var cst=transpose(cs)
var clt=transpose(cl)
var cjt=transpose(cj)
var cs2=[],cl2=[],cj2=[]


var ind=[]
var u=[]
for(var i=0;i<x.length;i++){
 var ct=0

//in this faster version, only put in columns indexed by basis elements with m=m_J

 for(var w=0;w<x[i][0].length;w++){ct+=2*(x[i][1][w]+x[i][3][w])-1}
 if(ct==mJ){
   ind.push(i)
   cs2.push(cst[i])
   cl2.push(clt[i])
   cj2.push(cjt[i])
 }
}
var cs2t=transpose(cs2)
var cl2t=transpose(cl2)
var cj2t=transpose(cj2)

for(var i=0;i<cs2t.length;i++){u.push(cs2t[i])}
for(var i=0;i<cl2t.length;i++){u.push(cl2t[i])}
for(var i=0;i<cj2t.length;i++){u.push(cj2t[i])}


var ww=intkernel(u)
if(ww.length==0)return []

// and then re-insert zero in the appropriate rows of the result

var res=[]
for(var i=0;i<x.length;i++){res[i]=[];for(var j=0;j<ww[0].length;j++){res[i][j]=0}}
for(var i=0;i<ind.length;i++){        for(var j=0;j<ww[0].length;j++){res[ind[i]][j]=ww[i][j]}}
return res
}



function matrixCopy(a){
var b=[];for(var i=0;i<a.length;i++){b[i]=[];for(var j=0;j<a[i].length;j++){b[i][j]=a[i][j]}}
return b
}

function basisLJ(t,eL,eJ){

if(typeof(t)=="string")t=term2array(t)
if(typeof(t[0][0])!="object"){var x=configsfaster(t)}else{var x=t}

var c=casimirJ(x)
var d=casimirL(x)
for(var i=0;i<d.length;i++){
for (var j=0;j<d.length;j++){
d[i][j]=11*d[i][j]}}
var u=plus(c,d)
for(var i=0;i<u.length;i++){u[i][i]=u[i][i]-eJ*(eJ+2)-11*eL*(eL+2)}
return intkernel(u)

}

function basisL(t,eL){

if(typeof(t)=="string")t=term2array(t)
if(typeof(t[0][0])!="object"){var x=configsfaster(t)}else{var x=t}

var c=casimirL(x)


for(var i=0;i<c.length;i++){c[i][i]=c[i][i]-eL*(eL+2)}

return intkernel(c)

}

function basisS(t,eS){

if(typeof(t)=="string")t=term2array(t)
if(typeof(t[0][0])!="object"){var x=configsfaster(t)}else{var x=t}

var c=casimirS(x)


for(var i=0;i<c.length;i++){c[i][i]=c[i][i]-eS*(eS+2)}
return intkernel(c)

}






// This is the value of the integral of the s'th Legendre polynomial
// in the multipole expansion times the product of the homogeneous harmonic part
// of the Hydrogen solution (with proton charge replaced by k)
// corresponding to li,ai,ei, evaluated over the first coordinate
// two sphere for i=1,2 and the second coordinate two sphere. 
// The number e_i is the power of the imaginary unit that occurs.
// so when e_i=0 it means the real part, when e_i=1 it means the
// imaginary part.

var ZZ={}
function Z(s,l1,a1,e1,l2,a2,e2,l3,a3,e3,l4,a4,e4){


//console.log("Z called with "+s+" "+l1+" "+a1+" "+e1+" "+l2+" "+a2+" "+e2+" "+l3+" "+a3+" "+e3+" "+l4+" "+a4+" "+e4)

if((e1==1&&a1==0)||(e2==1&&a2==0)||(e3==1&&a3==0)||(e4==1&&a4==0)){
//console.log(0+"!!!");
return 0}
if(ZZ[s]===undefined)                            ZZ[s]={}
if(ZZ[s][l1]===undefined)                        ZZ[s][l1]={}
if(ZZ[s][l1][a1]===undefined)                    ZZ[s][l1][a1]={}
if(ZZ[s][l1][a1][e1]===undefined)                ZZ[s][l1][a1][e1]={}
if(ZZ[s][l1][a1][e1][l2]===undefined)            ZZ[s][l1][a1][e1][l2]={}
if(ZZ[s][l1][a1][e1][l2][a2]===undefined)        ZZ[s][l1][a1][e1][l2][a2]={}
if(ZZ[s][l1][a1][e1][l2][a2][e2]===undefined)    ZZ[s][l1][a1][e1][l2][a2][e2]={}
if(ZZ[s][l1][a1][e1][l2][a2][e2][l3]===undefined)ZZ[s][l1][a1][e1][l2][a2][e2][l3]={}
if(ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3]===undefined)            ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3]={}
if(ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3]===undefined)        ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3]={}
if(ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3][l4]===undefined)    ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3][l4]={}
if(ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3][l4][a4]===undefined)ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3][l4][a4]={}


if(ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3][l4][a4][e4]!==undefined)

{ 
return    ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3][l4][a4][e4]

}

var ss=0
for(var i1=0;i1<=(a1-e1)/2;i1++){
for(var i2=0;i2<=(a2-e2)/2;i2++){
for(var i3=0;i3<=(a3-e3)/2;i3++){
for(var i4=0;i4<=(a4-e4)/2;i4++){
for(var j1=0;j1<=(l1-a1)/2;j1++){
for(var j2=0;j2<=(l2-a2)/2;j2++){
for(var j3=0;j3<=(l3-a3)/2;j3++){
for(var j4=0;j4<=(l4-a4)/2;j4++){
for(var w=0;w<=s/2;w++){
for(var q=0;q<=s-2*w;q++){
for(var v=0;v<=s-2*w-q;v++){











ss=ss
+
Math.pow(-1,i1+i2+i3+i4+j1+j2+j3+j4+w)
*bbinomial[a1][2*i1+e1]
*bbinomial[a2][2*i2+e2]
*bbinomial[a3][2*i3+e3]
*bbinomial[a4][2*i4+e4]
*bbinomial[s][w]
*ffactorial[2*l1-2*j1]
/ffactorial[l1-2*j1-a1]
*ffactorial[2*l2-2*j2]
/ffactorial[l2-2*j2-a2]
*ffactorial[2*l3-2*j3]
/ffactorial[l3-2*j3-a3]
*ffactorial[2*l4-2*j4]
/ffactorial[l4-2*j4-a4]
*ffactorial[2*s-2*w]

/*

/ffactorial[s-2*w]
*ffactorial[s-2*w]     these cancel!

*/

*bbinomial[l1][j1]
*bbinomial[l2][j2]
*bbinomial[l3][j3]
*bbinomial[l4][j4]

*1/(ffactorial[q]*ffactorial[v]*ffactorial[s-2*w-q-v])
*zeroOdd(a1+e1+a2+e2+q,e1+e2+v,a1+a2+l1+l2+s-q-v)
*2
*gammaOfHalf[a1-2*i1-e1+a2-2*i2-e2+q+1]
*gammaOfHalf[2*i1+e1+2*i2+e2+v+1]
*gammaOfHalf[l1-2*j1-a1+l2-2*j2-a2+(s-2*w-q-v)+1]
/gammaOfHalf[a1-2*i1-e1+a2-2*i2-e2+q+1
+2*i1+e1+2*i2+e2+v+1
+l1-2*j1-a1+l2-2*j2-a2+(s-2*w-q-v)+1]
*zeroOdd(a3+e3+a4+e4+q,e3+e4+v,a3+a4+l3+l4+s-q-v)
*2
*gammaOfHalf[a3-2*i3-e3+a4-2*i4-e4+q+1]
*gammaOfHalf[2*i3+e3+2*i4+e4+v+1]
*gammaOfHalf[l3-2*j3-a3+l4-2*j4-a4+(s-2*w-q-v)+1]
/gammaOfHalf[a3-2*i3-e3+a4-2*i4-e4+q+1
+2*i3+e3+2*i4+e4+v+1
+l3-2*j3-a3+l4-2*j4-a4+(s-2*w-q-v)+1]
}}}}}}}}}}}


ZZ[s][l1][a1][e1][l2][a2][e2][l3][a3][e3][l4][a4][e4]=ss

//console.log("returning "+ss)
return ss
}




var ZZ2={}

function Z2(s,i1,i2,i3,j1,j2,j3){ //integrate monomial in 6 vbls times P_{s,s} over S^2 x S^2 --- not yet used
if(ZZ2[s]===undefined)ZZ2[s]={}
if(ZZ2[s][i1]===undefined)ZZ2[s][i1]={}
if(ZZ2[s][i1][i2]===undefined)ZZ2[s][i1][i2]={}
if(ZZ2[s][i1][i2][i3]===undefined)ZZ2[s][i1][i2][i3]={}
if(ZZ2[s][i1][i2][i3][j1]===undefined)ZZ2[s][i1][i2][i3][j1]={}
if(ZZ2[s][i1][i2][i3][j1][j2]===undefined)ZZ2[s][i1][i2][i3][j1][j2]={}


if(ZZ2[s][i1][i2][i3][j1][j2][j3]!==undefined)return ZZ2[s][i1][i2][i3][j1][j2][j3]






var ss=0


for(var w=0;w<=s/2;w++){
for(var q=0;q<=s-2*w;q++){
for(var v=0;v<=s-2*w-q;v++){


ss=ss
+
Math.pow(-1,w)
*bbinomial[s][w]
*ffactorial[2*s-2*w]

/*

/ffactorial[s-2*w]
*ffactorial[s-2*w]     these cancel!

*/


*1/(ffactorial[q]*ffactorial[v]*ffactorial[s-2*w-q-v])
*zeroOdd(i1+q,i2+v,i3+s-q-v)
*2
*gammaOfHalf[i1+q+1]
*gammaOfHalf[i2+v+1]
*gammaOfHalf[i3+(s-2*w-q-v)+1]
/gammaOfHalf[i1+q+1
+i2+v+1
+i3+(s-2*w-q-v)+1]
*zeroOdd(j1+q,j2+v,j3+s-2*w-q-v)
*2
*gammaOfHalf[j1+q+1]
*gammaOfHalf[j2+v+1]
*gammaOfHalf[j3+(s-2*w-q-v)+1]
/gammaOfHalf[j1+q+1
+j2+v+1
+j3+(s-2*w-q-v)+1]
}}}


ZZ2[s][i1][i2][i3][j1][j2][j3]=ss

return ss
}








function toEnergy(k,n){
var result=0
for(var i=0;i<n.length;i++){
result+=2*k*m*Math.pow(e,4)/(Math.pow(n[i],2)*Math.pow(h,3)*Math.pow(4*eps,2))
}
return result}







//The function below integrates e^{k\beta r_1(1/(2n_1)+1/(2n_2))+k\beta (1/(2n_3)+1/(2n_4))}
// times r_1^a r_2^b  from zero to infinity in r^2 and 0 to r_2 in r_1.
// There are two cases depending on whether b is negative or positive.
// If b is positive it is an integration by parts
// If b is negative, another function is called


function intermediate(k,a,b,n1,n2,n3,n4){

if(b<0){
return I2(-k*beta*(1/(2*n1)+1/(2*n2)),
-k*beta*(1/(2*n3)+1/(2*n4)),a,-b)}  
else{


var ss=Math.pow(-1,a+1+b+1)
*1/Math.pow(k*beta*(1/(2*n1)+1/(2*n2)),a+1)
*ffactorial[b]
*1/Math.pow(k*beta*(1/(2*n3)+1/(2*n4)),b+1)
*ffactorial[a] //starting value

for(var j=0;j<a+1;j++){
ss=ss
+Math.pow(-1,a+b+1)
*1/Math.pow(k*beta*(1/(2*n1)+1/(2*n2)),j+1)
*ffactorial[a]
/ffactorial[a-j]
*ffactorial[a+b-j]
*1/Math.pow(k*beta*(1/(2*n1)+1/(2*n2)+1/(2*n3)+1/(2*n4)),a+b-j+1)


}
return ss
}
}




// This is (a power of beta which does not matter) times \int_0^\infty \int_0^{r_2} 
// of f_{k,n_1,l_1}(r_1)f_{k,n_2,l_2}(r_1)f_{k,n_3,l_3}(r_2)f_{k,n_4,l_4}(r_2)r_1^ar_2^b dr_1 dr_2


function Y(k,a,b,n1,l1,n2,l2,n3,l3,n4,l4){



//console.log("Y called with "+k+" "+a+" "+b+" "+n1+" "+l1+" "+n2+" "+l2+" "+n3+" "+l3+" "+n4+" "+l4)



// We don't say var since these are global definitions



if(YY===undefined)                       YY={}
if(YY[k]===undefined)                    YY[k]={}
if(YY[k][a]===undefined)                 YY[k][a]={}
if(YY[k][a][b]===undefined)              YY[k][a][b]={}
if(YY[k][a][b][n1]===undefined)          YY[k][a][b][n1]={}
if(YY[k][a][b][n1][l1]===undefined)      YY[k][a][b][n1][l1]={}
if(YY[k][a][b][n1][l1][n2]===undefined)                YY[k][a][b][n1][l1][n2]={}
if(YY[k][a][b][n1][l1][n2][l2]===undefined)            YY[k][a][b][n1][l1][n2][l2]={}
if(YY[k][a][b][n1][l1][n2][l2][n3]===undefined)        YY[k][a][b][n1][l1][n2][l2][n3]={}
if(YY[k][a][b][n1][l1][n2][l2][n3][l3]===undefined)    YY[k][a][b][n1][l1][n2][l2][n3][l3]={}
if(YY[k][a][b][n1][l1][n2][l2][n3][l3][n4]===undefined)YY[k][a][b][n1][l1][n2][l2][n3][l3][n4]={}
if(YY[k][a][b][n1][l1][n2][l2][n3][l3][n4][l4]!==undefined)

{
//console.log(YY[k][a][b][n1][l1][n2][l2][n3][l3][n4][l4])
return YY[k][a][b][n1][l1][n2][l2][n3][l3][n4][l4]

}


var ss=0
for(var i1=0;i1<n1-l1;i1++){
for(var i2=0;i2<n2-l2;i2++){
for(var i3=0;i3<n3-l3;i3++){
for(var i4=0;i4<n4-l4;i4++){
var coef=
bbinomial[n1+l1][n1-l1-1-i1]
*bbinomial[n2+l2][n2-l2-1-i2]
*bbinomial[n3+l3][n3-l3-1-i3]
*bbinomial[n4+l4][n4-l4-1-i4]
*Math.pow(k*beta/n1,i1)/ffactorial[i1]
*Math.pow(k*beta/n2,i2)/ffactorial[i2]
*Math.pow(k*beta/n3,i3)/ffactorial[i3]
*Math.pow(k*beta/n4,i4)/ffactorial[i4]
ss=ss+coef
*intermediate(k,a+i1+i2,b+i3+i4,n1,n2,n3,n4)

}}}}


YY[k][a][b][n1][l1][n2][l2][n3][l3][n4][l4]=ss*Math.pow(beta,a+b+2)

return ss*Math.pow(beta,a+b+2)
}







// This can be thought of as the diagonal entries of the perturbation matrix XX,
// used to construct the various characters



function X(k,y,deg,pole){ //deg is degree of multipole approximation, l,a,n are arrays (the a is magnetic q num)
                                     //sp is spin

var l=y[0]
var a1=y[1]
var n=y[2]
var sp=y[3]
if(deg===undefined)deg=4
if(pole===undefined)pole=1
var a=[]
for(var i=0;i<a1.length;i++){a[i]=Math.abs(a1[i])}
var u=l.length
var ss=0


for(var i=0;i<u-1;i++){
for(var j=i+1;j<u;j++){

for(var s=0;s<deg+1;s++){

//if(s%2==1)continue

var sgn=1
if(a1[i]*a1[j]<0)sgn=-1

if(s==0){

}

var num=
1/(ffactorial[s]*Math.pow(2,s))
*(
Y(k,2*l[i]+s+2,2*l[j]-s+2-pole,n[i],l[i],n[i],l[i],n[j],l[j],n[j],l[j])
+Y(k,2*l[j]+s+2,2*l[i]-s+2-pole,n[j],l[j],n[j],l[j],n[i],l[i],n[i],l[i])
)
*
(
Z(s,l[i],a[i],0,l[i],a[i],0,l[j],a[j],0,l[j],a[j],0)
 +Z(s,l[i],a[i],0,l[i],a[i],0,l[j],a[j],1,l[j],a[j],1)
 +Z(s,l[i],a[i],1,l[i],a[i],1,l[j],a[j],0,l[j],a[j],0)
 +Z(s,l[i],a[i],1,l[i],a[i],1,l[j],a[j],1,l[j],a[j],1)
)




if(sp[i]==sp[j]){



num=num-1/(ffactorial[s]*Math.pow(2,s))
*2*Y(k,l[i]+l[j]+s+2,l[i]+l[j]-s+2-pole,n[i],l[i],n[j],l[j],n[i],l[i],n[j],l[j])
*(Z(s,l[i],a[i],0,l[j],a[j],0,l[i],a[i],0,l[j],a[j],0)
+Z(s,l[i],a[i],1,l[j],a[j],1,l[i],a[i],1,l[j],a[j],1)
+sgn*Z(s,l[i],a[i],1,l[j],a[j],1,l[i],a[i],0,l[j],a[j],0)
+Z(s,l[i],a[i],1,l[j],a[j],0,l[i],a[i],1,l[j],a[j],0)
-sgn*Z(s,l[i],a[i],0,l[j],a[j],1,l[i],a[i],1,l[j],a[j],0)
+Z(s,l[i],a[i],0,l[j],a[j],1,l[i],a[i],0,l[j],a[j],1)
+sgn*Z(s,l[i],a[i],0,l[j],a[j],0,l[i],a[i],1,l[j],a[j],1)
-sgn*Z(s,l[i],a[i],1,l[j],a[j],0,l[i],a[i],0,l[j],a[j],1)
)




}



if(s==0){

/*
var denom=
(Y(k,2*l[i]+2,2*l[j]+2,n[i],l[i],n[i],l[i],n[j],l[j],n[j],l[j])
+Y(k,2*l[j]+2,2*l[i]+2,n[j],l[j],n[j],l[j],n[i],l[i],n[i],l[i]))
*(Z(0,l[i],a[i],0,l[i],a[i],0,l[j],a[j],0,l[j],a[j],0)
 +Z(0,l[i],a[i],0,l[i],a[i],0,l[j],a[j],1,l[j],a[j],1)
 +Z(0,l[i],a[i],1,l[i],a[i],1,l[j],a[j],0,l[j],a[j],0)
 +Z(0,l[i],a[i],1,l[i],a[i],1,l[j],a[j],1,l[j],a[j],1)
)
*/

var denom=mag(k,n[j],l[j],a[j])*mag(k,n[i],l[i],a[i]) // equal to commented out text
}









if(denom!=0){ss+=num/denom}



}//s loop
}//j loop
}//i loop





return ss*correction//    l.length/(l.length-1)*2
}


function symmetricPoly(m,n){     //m is degree, n is number of variables, this does not get used
if(m==0){return 1}
if(n==0){return 0}
return plus(polyTimes(symmetricPoly(m,n-1),One(n)),times(symmetricPoly(m-1,n-1),lastVar(n)))
}




function lastVar(n){  // the last variable for how I encode polynomials
var a=0
var b=1
for(var i=1;i<n;i++){b=[b,a];a=[a,a]}
return[a,b]
}

function One(n){   // the number 1 as a polynomial of degree n
var result=1
for(var i=0;i<n;i++){result=[result]}
return result
}


function parts(n,t){  //ordered partitions
if(t==0&&n>0)return 0
if(t==0)return 1
var result=0
for(var i=0;i<=n;i++){
result+=parts(i,t-1)
}
return result
}



var pparts=[]                     //array version so it is faster
for(var i=0;i<10;i++){pparts[i]=[]
for(var j=0;j<10;j++){pparts[i][j]=parts(i,j)}}


function I1(q,m){  // integral zero to infinity of e^{-qx}x^m
if(m==0)return 1/q

return (m/q)*I1(q,m-1)

}


/*
int 0 to infinity of x e^{-ax} int bx to infinity e^{-y}/y dy dx
is 

1/a^2 [ln(1+a/b) + a/(a+b)]

*/

function I2(q,w,a,b){ // integral zero to infinity dx of x to infinity dy e^{-qx-wy}x^a/y^b
if(b>1)return -1/(1-b)*I1(q+w,a+1-b)+w/(1-b)*I2(q,w,a,b-1)
if(b==1&&a>1)return (a/q)*I2(q,w,a-1,b)-(1/q)*I1(w+q,a-b)
if(b==1&&a==1)return 1/(q*q)*(Math.log(1+q/w)-q/(w+q))
}

function phi(q,w,u,v,t,depth){  //expresses integral as series in gamma functions
if(depth==0)return 0
if(t==0)return Gamma(u+1)*Gamma(v+1)/(Math.pow(q,u+1)*Math.pow(w,v+1))
var result=0
for(var i=0;i<u;i++){
for(var n=0;n<5;n++){
result+=bbinomial[u][i]*pparts[n][t]*Math.pow(-1,n)*phi(q+w,q,i+v,u-i,n,depth-1)
}
}
for(var i=0;i<v;i++){
for(var n=0;n<5-t;n++){
result+=bbinomial[v][i]*pparts[n][t]*Math.pow(-1,n)*phi(q+w,w,i+u,v-i,n+t,depth-1)
}
}
return result
}









function getCharacters(K,k){ //this k is the k_p


var monomialcharacter=0
var dummymonomialcharacter=0


if(typeof(K)=="string")K=term2array(K)
if(typeof(K[0][0])!="object"){var a=configsfaster(K)}else{var a=K}



if(k===undefined){k=a[0][0].length}

for(var cc=0;cc<a.length;cc++){


var phi=0
for(var i=0;i<a[cc][3].length;i++){phi=phi+2*a[cc][3][i]-1}

var psi=0
for(var i=0;i<a[cc][1].length;i++){
psi=psi+2*a[cc][1][i]}



var angularMonomial=[]
for(var j=0;j<psi;j++){angularMonomial.push(0)}
for(var j=psi;j<psi+1;j++){angularMonomial.push(1)}

var zeroPoly=minus(angularMonomial,angularMonomial)
var monomial=[]

for(var j=0;j<phi;j++){monomial.push(zeroPoly)}
for(var j=phi;j<phi+1;j++){monomial.push(angularMonomial)}


if(phi>-1&&psi>-1){

//if(document.getElementById("docalc").checked)  changed for worker
if(docalc)
{var xx=X(k,a[cc],multipole,1)}else{xx=0}
monomialcharacter=plus(monomialcharacter,polyTimes(monomial,xx))
dummymonomialcharacter=plus(dummymonomialcharacter,polyTimes(monomial,1))
}




}


return [monomialcharacter,dummymonomialcharacter]
}







function between(a,b,d){ // all arrays between a and b which are non-increasing in ranges when d is constant
var output=[[]]
var output2=[]
for(var i=0;i<a.length;i++){

  for(var j=0;j<output.length;j++){



    var max
    if(i==0||d[i]!=d[i-1]){max=b[i]}else{max=output[j][i-1];if(max>b[i])max=b[i]}

    for(var k=a[i];k<=max;k++){

var t=output[j].slice(0)
t[i]=k
output2.push(t)}//end k loop


   }//end j loop

output=output2
output2=[]

}
return output
}




//There are three versions that are functionally equivalent except the order of the 
// returned list. These are configs, configsfast, and configsfaster.
//The one configs is really slow. The configsfaster actually calls
//configsfast but only for individual orbitals and memoizes
// them and assembles the results rather than calculating
// all the whole configurations.






var configsmemo={}

function configsfaster(K){ 
if(typeof(K)=="string")K=term2array(K)

// memoization 

var KK=[]
for(var i=0;i<K[0].length;i++){KK[i]=[]
for(var j=0;j<K.length;j++){
KK[i][j]=K[j][i]  //  combinatorial transpose
}}

var t=[]
for(var i=0;i<KK.length;i++){
if(configsmemo[KK[i][0]]===undefined)configsmemo[KK[i][0]]={}
if(configsmemo[KK[i][0]][KK[i][1]]===undefined)configsmemo[KK[i][0]][KK[i][1]]={}
if(configsmemo[KK[i][0]][KK[i][1]][KK[i][2]]!==undefined) { 
t[i]=configsmemo[KK[i][0]][KK[i][1]][KK[i][2]]
}
else
{

t[i]=configsfast([[KK[i][0]],[KK[i][1]],[KK[i][2]]])
}
}

//We're going to call 'between' but do not want it to use third variable so put in the required
//dummy variable u along with lower and upper limits

var u=[], lower=[],upper=[]
for(var i=0;i<t.length;i++){lower.push(0); upper.push(t[i].length-1);u.push(i)}

var tt=between(lower,upper,u)

var res=[]
for(var i=0;i<tt.length;i++){
//start with empty config
var c=[ [],[],[],[] ]
for(var j=0;j<tt[i].length;j++){
for(var k=0;k<t[j][tt[i][j]][0].length;k++){
c[0].push(t[j][tt[i][j]][0][k]);c[1].push(t[j][tt[i][j]][1][k]);c[2].push(t[j][tt[i][j]][2][k]);c[3].push(t[j][tt[i][j]][3][k])
}}
res.push(c)
}



return res

}




// Despite the name, the input of this is a single electron
// configuration, as an array or string, and the output
// is an array indexing a basis of the corresponding
// exterior power of the space of Hydrogen solutions

function configsfast(K){ 
if(typeof(K)=="string")K=term2array(K)
var res=[]

var aa=configs4(K)


var partition=K[0]

var monomialcharacter=0
var dummymonomialcharacter=0

for(var is=0;is<aa.length;is++){

var iii=aa[is][3]
var jjj=aa[is][4]




var sp=[]
for(var j=0;j<iii.length;j++){
for(var s=0;s<iii[j];s++){sp.push(0)}
for(var s=0;s<jjj[j];s++){sp.push(1)}
}

var partitionwidget=[]  //useful bec partitionwidget[a]=partitionwidget[b] if and only if
                          // same spin and l etc
var dummyvar=0
for(var j=0;j<iii.length;j++){
for(var s=0;s<iii[j];s++){partitionwidget.push(dummyvar)}
dummyvar++
for(var s=0;s<jjj[j];s++){partitionwidget.push(dummyvar)}
dummyvar++
}


var adjust=[]
  var dummyvar=0
for(var j=0;j<iii.length;j++){
for(var s=0;s<iii[j];s++){adjust.push(dummyvar);dummyvar++}

for(var s=0;s<jjj[j];s++){adjust.push(dummyvar);dummyvar++}

}


var ls=[],ns=[]
for(var j=0;j<aa[is][0].length;j++){
for(var s=0;s<aa[is][0][j];s++){ls.push(aa[is][2][j]);ns.push(aa[is][1][j])}}


var lowerlim=[]
var upperlim=[]
for(var j=0;j<ls.length;j++){lowerlim[j]=-ls[j]+adjust[j]}
for(var j=0;j<ls.length;j++){upperlim[j]=ls[j]+adjust[j]}
var allA=between(lowerlim,upperlim,partitionwidget)

for(var j=0;j<allA.length;j++){for(var k=0;k<allA[j].length;k++){allA[j][k]=allA[j][k]-adjust[k]}}



for(var j=0;j<allA.length;j++){res.push([ls.slice(0),allA[j].slice(0),ns.slice(0),sp.slice(0)])}






}


return res

}




function configs(K){ //This does the same thing as configsfast but it leaves the basis in an 
                     //order where the Euclid algorithm overflows

if(typeof(K)=="string")K=term2array(K)
var res=[]

var aa=configs4(K)


var partition=K[0]

var monomialcharacter=0
var dummymonomialcharacter=0

for(var is=0;is<aa.length;is++){

var iii=aa[is][3]
var jjj=aa[is][4]




var sp=[]
for(var j=0;j<iii.length;j++){
for(var s=0;s<iii[j];s++){sp.push(0)}
for(var s=0;s<jjj[j];s++){sp.push(1)}
}

var partitionwidget=[]
var dummyvar=0
for(var j=0;j<iii.length;j++){
for(var s=0;s<iii[j];s++){partitionwidget.push(dummyvar)}
dummyvar++
for(var s=0;s<jjj[j];s++){partitionwidget.push(dummyvar)}
dummyvar++
}





var ls=[],ns=[]
for(var j=0;j<aa[is][0].length;j++){
for(var s=0;s<aa[is][0][j];s++){ls.push(aa[is][2][j]);ns.push(aa[is][1][j])}}









//loop through all values of a
var a=[]
for(var j=0;j<ls.length;j++){a[j]=-ls[j]}
var DONE=false
while(!DONE){



//We will interpret a values indexed by subscripts in iii part versus jjj part differently


//Next part is weird, we need to rule out reduplications only in the a values of same sub-parts
//





var PAULI=true
for(var tt=0;tt<a.length;tt++){
for(var uu=tt+1;uu<a.length;uu++){
if(partitionwidget[uu]==partitionwidget[tt]&&a[uu]>=a[tt])PAULI=false
}
}


if(PAULI){
res.push([ls.slice(0),a.slice(0),ns.slice(0),sp.slice(0)])
}

DONE=true
for(var j=0;j<ls.length;j++){if(a[j]<ls[j]){DONE=false;break}}
for(var j=0;j<ls.length;j++){if(a[j]==ls[j]){a[j]=-ls[j]}else{a[j]++;break}}
}// a loop
}

return res

}

















function configs4(K){ // inputs a,n,l and makes list with all iii and jjj  appended   
var a=K[0];
var n=K[1];
var l=K[2]
var cons=[]





//loop through values of iii from all zeroes to same as a



var jjj=[]
var iii=[]
for(var j=0;j<l.length;j++){iii[j]=0;jjj[j]=a[j]}
var DONE4=false
while(!DONE4){





//have partition a and also n,l,iii,jjj





var a2=a.slice(0)
var n2=n.slice(0)
var l2=l.slice(0)
var iii2=iii.slice(0)
var jjj2=jjj.slice(0)

cons.push([a2,n2,l2,iii2,jjj2])




//increment iii
DONE4=true
for(var j=0;j<iii.length;j++){if(iii[j]<a[j]){DONE4=false;break}}
for(var j=0;j<iii.length;j++){if(iii[j]==a[j]){iii[j]=0;jjj[j]=a[j]}else{iii[j]++;jjj[j]--;break}}
}// iii loop






return cons


}




function terms4(K){ // inputs a,n,l and makes list with all iii and jjj  appended    
var a=K[0];
var n=K[1];
var l=K[2]
var cons=[]





//loop through values of iii from all zeroes to same as a



var jjj=[]
var iii=[]
for(var j=0;j<l.length;j++){iii[j]=0;jjj[j]=a[j]}





var a2=a.slice(0)
var n2=n.slice(0)
var l2=l.slice(0)
var iii2=iii.slice(0)
var jjj2=jjj.slice(0)

cons.push([a2,n2,l2,iii2,jjj2])

return cons


var DONE4=false
while(!DONE4){





//all code goes here: have partition a and also n,l,iii,jjj





var a2=a.slice(0)
var n2=n.slice(0)
var l2=l.slice(0)
var iii2=iii.slice(0)
var jjj2=jjj.slice(0)

cons.push([a2,n2,l2,iii2,jjj2])




//increment iii
DONE4=true
for(var j=0;j<iii.length;j++){if(iii[j]<a[j]){DONE4=false;break}}
for(var j=0;j<iii.length;j++){if(iii[j]==a[j]){iii[j]=0;jjj[j]=a[j]}else{iii[j]++;jjj[j]--;break}}
}// iii loop






return cons


}




function term(K){        // gets electron config string from the array K=[a,n,l]
var p=[]
for(var i=0;i<K[0].length;i++){p[i]=[]
for(var j=0;j<3;j++){
p[i][j]=K[j][i]
}
}
p=p.sort(function(x,y){return (x[1]+x[2]-y[1]-y[2])+10000*(x[1]-y[1])}) //sort orbitals
for(var i=0;i<3;i++){
for(var j=0;j<p.length;j++){
K[i][j]=p[j][i]
}
}

var a=K[0];
var n=K[1];
var l=K[2]
var stringy=""
for(var j=0;j<l.length;j++){
stringy=stringy+
n[j].toString()
+terms[l[j]]
+"\<sup\>"
+a[j].toString()
+"\</sup\>"

}
return stringy
}




var bigterms=["S","NOTHING","P","NOTHING","D","NOTHING","F","NOTHING","G","NOTHING","H","NOTHING","I","NOTHING","J","NOTHING","K","NOTHING","L","NOTHING","M","NOTHING","N","NOTHING",
"O","NOTHING","P","NOTHING","Q","NOTHING","R","NOTHING","S","NOTHING","T","NOTHING"]


// This just turns the output of an eigenvector/eigenvalue calculation into a form
// where each eigenvalue is listed once, and the multiplicities are reported as
// another array entry separately

function getMults(e){
//get average value of e
var sum=0
for(var i=0;i<e.length;i++){sum+=e[i]}
sum=sum/e.length

var es=[]
var mults=[]
for(var i=0;i<e.length;i++){
var found=false
for(var j=0;j<es.length;j++){
if(Math.abs((e[i]-es[j]))<.0000001*sum){
mults[j]++;found=true;break
}}
if(!found){es.push(e[i]);mults.push(1)}
}
return [es,mults]
}


//This calculates the action of a matrix M on the subspace or submodule
//with basis B, in that basis. If the span of the elements of B is
// not preserved by the  M action it will give the best least squares
// approximation (i.e. use the projection) 


function restrict(B,M){
var u=times(transpose(B),B)
var uinv=numeric.inv(u)
var w=times(M,B)
var ww=times(transpose(B),w)
return times(uinv,ww)

}



var latin=["","bis", "ter", "quater", "quinquies","sexies","septies", "octies", "novies", "decies"]

var overflow
var fineCorrect=false

var Weyl=false




//This is the main routine that goes all the way from an electron configuration
// to an array called resultt, it appends to resultt one new array for each
// energy level found, containing information to be used to display or analyze
// the levels. In most cases this is  a character calculation but sometimes
// (and if do mults is checked) it uses the basisLSJmJ function and the restrict
// linear algebra and calculates an actual intersection of four sublattices, if 
// necessary.

var logging=false

var saveK=[]
var savek=0
var XXmemoized={}
var csmemoized=[]
var clmemoized=[]
var cjmemoized=[]
var compareSmemoized=[]
var compareLmemoized=[]

function showEnergies(K,k){


if(typeof(K)=="string")K=term2array(K)
if(typeof(K[0][0])=="object")alert("wrong type of object in showEnergies")
compareLmemoized=[];compareSmemoized=[]
enumerate(K)
compareLmemoized=[];compareSmemoized=[]
if(typeof(K[0][0])!="object"){
a=configsfaster(K)
}else{var a=K} //second case should never occur

if(![savek,saveK].equals([k,K]))XXmemoized={}                  //this line and the next clear memoization if the situation changes
if(!saveK.equals(K)){csmemoized=[];clmemoized=[];cjmemoized=[]}

savek=k
saveK=K

if(k===undefined){k=a[0][0].length}



var qq=getCharacters(a,k)
var monomialchar=qq[0]
var dummymonomialchar=qq[1]
var char=highestWeight(monomialchar)
var dummychar=highestWeight(dummymonomialchar)






// get ns

var ns=[]
for(var i=0;i<K[0].length;i++){
for(var j=0;j<K[0][i];j++){
ns.push(K[1][i])
}}





// make parity symbol


var parity=0
for(var i=0;i<K[2].length;i++){parity=(parity+K[0][i]*K[2][i])%2}
var sym="&#176;"
if(parity==0)sym=""


var energies=[]

for(var i=0;i<char.length;i++){
for(var j=0;j<char[i].length;j++){
var zer=false
if(Math.floor(dummychar[i][j]+.5)==0)zer=true
if(!zer)
{


if(logging){
console.log("\<div style=\"display:inline;font-size:18px\"\>\<sup\>"+(i+1).toString()
+"\</sup\>"+bigterms[j]+"\</div\>"+sym+" has multiplicity "+dummychar[i][j])
}



//if(document.getElementById("dofine").checked||(dummychar[i][j]>1&&document.getElementById("domults").checked)){  changed for worker

if(dofine||(dummychar[i][j]>1&&domults)){



//multiplicity occurs or need better calc for the fine structure



var savlev=[]
var startJ=i+j

// if(document.getElementById("dofine").checked){endJ=Math.abs(i-j)}else{endJ=i+j}  changed for worker


if(dofine){endJ=Math.abs(i-j)}else{endJ=i+j} 



for(var J=i+j;J>endJ-1;J=J-2){
overflow=false
if(logging){
console.log("l: "+j/2+"  s: "+i+"/2  J: "+J)
}

var B=basisLSJmJ(a,j,i,J,J)

if(logging){
console.log("found: "+B[0].length)
}

if(B[0].length<dummychar[i][j])overflow=true  //probably integer overflow in intkernel!

if(logging&&!overflow){
console.log("(all found)")
}

if(logging&&overflow){
console.log("Did not find "+dummychar[i][j]+" elements")
}

if(overflow){
E=[]
for(var uu=0;uu<dummychar[i][j];uu++){E.push(char[i][j])}
var Enofine=[]
for(var ii=0;ii<E.length;ii++){Enofine[ii]=E[ii]}
warnoverflow=true
}else{

var indexer2=[]

for(var ii=0;ii<B.length;ii++){
   var allzero=true

   for(var jj=0;jj<B[ii].length;jj++){if(B[ii][jj]!=0){allzero=false;break}}
if(!allzero)indexer2.push(ii)}


var BB=[]
for(var ii=0;ii<indexer2.length;ii++){BB[ii]=B[indexer2[ii]]



if(Weyl){

var cnst=1
var lt=a[indexer2[ii]][0]
var at=a[indexer2[ii]][1]
for(var jj=0;jj<a[0][0].length;jj++){
cnst=cnst*Math.pow(
ffactorial[lt[jj]+at[jj]]*ffactorial[lt[jj]-at[jj]]
,1/2)
}


for(var jj=0;jj<BB[ii].length;jj++){

BB[ii][jj]=BB[ii][jj]*cnst
}


}

}



var M=[]
fmultuse=fmult
for(var ii=0;ii<indexer2.length;ii++){
 postMessage("progress="+(ii/(indexer2.length-1)).toString())
 M[ii]=[]
 for(var jj=0;jj<indexer2.length;jj++){


if(XXmemoized[indexer2[ii]]===undefined)XXmemoized[indexer2[ii]]={}                 //this line and the next two memoize X
if(XXmemoized[indexer2[ii]][indexer2[jj]]!==undefined){XXpossiblymemoized=XXmemoized[indexer2[ii]][indexer2[jj]]}
else{XXpossiblymemoized=XX(k,a[indexer2[ii]],a[indexer2[jj]]);XXmemoized[indexer2[ii]][indexer2[jj]]=XXpossiblymemoized}

M[ii][jj]=YY(k, a[indexer2[ii]],a[indexer2[jj]])+XXpossiblymemoized
 }
}

if(fineCorrect&&dofine){
var Mnofine=[]
fmultuse=0
for(var ii=0;ii<indexer2.length;ii++){Mnofine[ii]=[]
for(var jj=0;jj<indexer2.length;jj++){Mnofine[ii][jj]=YY(k, a[indexer2[ii]],a[indexer2[jj]])+XXmemoized[indexer2[ii]][indexer2[jj]]
}}
}

var R=restrict(BB,M)
var E=getMults(numeric.eig(R).lambda.x)[0]
E.sort(function(a, b){return a-b})


if(fineCorrect&&dofine){
var Rnofine=restrict(BB,Mnofine)
var Enofine=getMults(numeric.eig(Rnofine).lambda.x)[0]
//note that the choice of [0] above is arbitrary as we have disassociated coarse and fine
Enofine.sort(function(a, b){return a-b})
}




if(J==i+j){

if(fineCorrect&&dofine){
if(Enofine.length>1){savlev=Enofine}else{savlev=[char[i][j]]}
}


}
}   

var res=[]

if(fineCorrect&&dofine){
for(var ii=0;ii<E.length;ii++){res[ii]=E[ii]-Enofine[ii]+savlev[ii]}
}
else
{
for(var ii=0;ii<E.length;ii++){res[ii]=E[ii]}
}



if(overflow){overflowsym="\<sup\>\<i\>overflow\</i\>\</sup\>"}else{overflowsym=""}
for(var ii=0;ii<E.length;ii++){





var latinsymb="&nbsp;\<sup\>\<i\>"+latin[ii]+"\</i\>\</sup\>"


if((J%2)==0)var rsSubScript=(parseInt(J)/2).toString()
if((J%2)==1)var rsSubScript=(J).toString()+"/2"
rs3="\<div style=\"display:inline;padding:5px;border-style:solid;border-width:1px;background:#eeeeee\"\>"+rsSubScript+"\</div\>"








energies.push([
(elts[aNumber-0+ionn-1][2])+"&nbsp;"+ions[ionn-1]+"&nbsp;&nbsp;"+term(K)
+"&nbsp;&nbsp; \<div style=\"display:inline;font-size:18px\"\>\<sup\>"+(i+1).toString()
+"\</sup\>"+bigterms[j]+"\</div\>"+sym+latinsymb+overflowsym,
Math.floor(res[ii]-toEnergy(k,ns)),//not used
(res[ii]-toEnergy(k,ns))/lightspeed,//not used
char.slice(0),
dummychar.slice(0),
monomialchar.slice(0),
dummymonomialchar.slice(0),
i,
j,
rs3,
Math.floor(-toEnergy(k,ns))
,res[ii]
,K
])


}


}





}else{
var sym2=""
var charij=char[i][j]
if(dummychar[i][j]>1)
{
warnmults=true
charij=Infinity
sym2="&nbsp;\<sup\>\<i\>(multiplicity "+dummychar[i][j].toString()+")\</sup\>"}






jj=i+j
if((jj%2)==0)var rsSubScript=(parseInt(jj)/2).toString()
if((jj%2)==1)var rsSubScript=(jj).toString()+"/2"
rs3="\<div style=\"display:inline;padding:5px;border-style:solid;border-width:1px;background:#eeeeee\"\>"+rsSubScript+"\</div\>"









energies.push([
(elts[aNumber-0+ionn-1][2])+"&nbsp;"+ions[ionn-1]+"&nbsp;&nbsp;"+term(K)
+"&nbsp;&nbsp; \<div style=\"display:inline;font-size:18px\"\>\<sup\>"+(i+1).toString()
+"\</sup\>"+bigterms[j]+"\</div\>"+sym+sym2,
Math.floor(charij-toEnergy(k,ns)),
(charij-toEnergy(k,ns))/lightspeed,
char.slice(0),
dummychar.slice(0),
monomialchar.slice(0),
dummymonomialchar.slice(0),
i,
j,
rs3,
Math.floor(-toEnergy(k,ns))
,charij
,K
])


}
}

}

}
return energies.slice(0)

}



var ions=["I","II","III","IV","V","VI","VII","XIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII"]
for(var i=18;i<200;i++){ions.push(i)}









Array.prototype.equals = function (array) {
    // if the other array is a false y value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}


// This is the full perturbation matrix!

function XX(k,y,yy,deg,pole){
var l=y[0]
var a1=y[1]
var n=y[2]
var sp=y[3]
var ll=yy[0]
var aa1=yy[1]
var nn=yy[2]
var ssp=yy[3]








if(deg===undefined)deg=4
if(pole===undefined)pole=1


var a=[]
for(var i=0;i<a1.length;i++){a[i]=Math.abs(a1[i])}

var aa=[]
for(var i=0;i<aa1.length;i++){aa[i]=Math.abs(aa1[i])}

var ss=0

/*

var u=l.length




for(var i=0;i<u-1;i++){  // break if any besides i'th and j'th are different.
for(var j=i+1;j<u;j++){


for(var i2=0;i2<u-1;i2++){
for(var j2=i2+1;j2<u;j2++){

*/

for(var s=0;s<deg+1;s++){


//This strange block of code below is just to save looping through values of i,j,i2,j2 which could would be slow
// so it indices all of the good ones by a single index ct

var test1=[[]]
var test2=[[]]
for(var i=0;i<l.length;i++){test1.push([l[i],a1[i],n[i],sp[i]]);test2.push([ll[i],aa1[i],nn[i],ssp[i]])}
test1.push([])
test2.push([])
var indices=pth(equals2(test1,test2),0,0,2,2)
for (var ct=0;ct<indices.length;ct++){
var i=indices[ct][0][1]-1
var j=indices[ct][0][0]-1
var i2=indices[ct][1][1]-1
var j2=indices[ct][1][0]-1



/*


var lcopy=l.slice(0)
var a1copy=a1.slice(0)
var ncopy=n.slice(0)
var spcopy=sp.slice(0)

var llcopy=ll.slice(0)
var aa1copy=aa1.slice(0)
var nncopy=nn.slice(0)
var sspcopy=ssp.slice(0)

lcopy.splice(j,1)
a1copy.splice(j,1)
ncopy.splice(j,1)
spcopy.splice(j,1)
lcopy.splice(i,1)
a1copy.splice(i,1)
ncopy.splice(i,1)
spcopy.splice(i,1)

llcopy.splice(j2,1)
aa1copy.splice(j2,1)
nncopy.splice(j2,1)
sspcopy.splice(j2,1)
llcopy.splice(i2,1)
aa1copy.splice(i2,1)
nncopy.splice(i2,1)
sspcopy.splice(i2,1)


if(
!lcopy.equals(llcopy)
||!a1copy.equals(aa1copy)
||!ncopy.equals(nncopy)
||!spcopy.equals(sspcopy)
)continue


*/

var totalsign=Math.pow(-1,Math.abs(i-i2+j-j2))



var sgni2=1
var sgnj2=1
var sgni=1
var sgnj=1

if(a1[i]<0)sgni=-1
if(a1[j]<0)sgnj=-1
if(aa1[i2]<0)sgni2=-1
if(aa1[j2]<0)sgnj2=-1







var num=0
var denom=0


if(sp[i]==ssp[i2]&&sp[j]==ssp[j2]){ 




num=

totalsign/(ffactorial[s]*Math.pow(2,s))*
(
Y(k,l[i]+ll[i2]+s+2,l[j]+ll[j2]-s+2-pole,n[i],l[i],nn[i2],ll[i2],n[j],l[j],nn[j2],ll[j2])
+Y(k,l[j]+ll[j2]+s+2,l[i]+ll[i2]-s+2-pole,n[j],l[j],nn[j2],ll[j2],n[i],l[i],nn[i2],ll[i2])
)
*(

 Z(s,l[i],a[i],0,ll[i2],aa[i2],0,l[j],a[j],0,ll[j2],aa[j2],0)
-Z(s,l[i],a[i],0,ll[i2],aa[i2],1,l[j],a[j],0,ll[j2],aa[j2],1)*sgni2*sgnj2
+Z(s,l[i],a[i],0,ll[i2],aa[i2],0,l[j],a[j],1,ll[j2],aa[j2],1)*sgnj*sgnj2
+Z(s,l[i],a[i],0,ll[i2],aa[i2],1,l[j],a[j],1,ll[j2],aa[j2],0)*sgnj*sgni2
+Z(s,l[i],a[i],1,ll[i2],aa[i2],0,l[j],a[j],0,ll[j2],aa[j2],1)*sgni*sgnj2
+Z(s,l[i],a[i],1,ll[i2],aa[i2],1,l[j],a[j],0,ll[j2],aa[j2],0)*sgni*sgni2
-Z(s,l[i],a[i],1,ll[i2],aa[i2],0,l[j],a[j],1,ll[j2],aa[j2],0)*sgni*sgnj
+Z(s,l[i],a[i],1,ll[i2],aa[i2],1,l[j],a[j],1,ll[j2],aa[j2],1)*sgni*sgnj*sgni2*sgnj2

)


}
if(   sp[i]==ssp[j2]&&sp[j]==ssp[i2]  ){





num=num
-totalsign/(ffactorial[s]*Math.pow(2,s))
*(
Y(k,l[i]+ll[j2]+s+2,l[j]+ll[i2]-s+2-pole,n[i],l[i],nn[j2],ll[j2],n[j],l[j],nn[i2],ll[i2])
+
Y(k,l[j]+ll[i2]+s+2,l[i]+ll[j2]-s+2-pole,n[j],l[j],nn[i2],ll[i2],n[i],l[i],nn[j2],ll[j2])
)*
(
 Z(s,l[i],a[i],0,ll[j2],aa[j2],0,l[j],a[j],0,ll[i2],aa[i2],0)
-Z(s,l[i],a[i],0,ll[j2],aa[j2],1,l[j],a[j],0,ll[i2],aa[i2],1)*sgni2*sgnj2
+Z(s,l[i],a[i],0,ll[j2],aa[j2],1,l[j],a[j],1,ll[i2],aa[i2],0)*sgnj*sgnj2
+Z(s,l[i],a[i],0,ll[j2],aa[j2],0,l[j],a[j],1,ll[i2],aa[i2],1)*sgnj*sgni2
+Z(s,l[i],a[i],1,ll[j2],aa[j2],1,l[j],a[j],0,ll[i2],aa[i2],0)*sgni*sgnj2
+Z(s,l[i],a[i],1,ll[j2],aa[j2],0,l[j],a[j],0,ll[i2],aa[i2],1)*sgni*sgni2
-Z(s,l[i],a[i],1,ll[j2],aa[j2],0,l[j],a[j],1,ll[i2],aa[i2],0)*sgni*sgnj
+Z(s,l[i],a[i],1,ll[j2],aa[j2],1,l[j],a[j],1,ll[i2],aa[i2],1)*sgni*sgnj*sgni2*sgnj2
)


}



if(denom==0&&num!=0){


var denom1= // can save this from one s value to the next to make it faster. Already commented out cancelling terms

/*
(
Y(k,l[i]+l[i]+2,l[j]+l[j]+2,n[i],l[i],n[i],l[i],n[j],l[j],n[j],l[j])
+Y(k,l[j]+l[j]+2,l[i]+l[i]+2,n[j],l[j],n[j],l[j],n[i],l[i],n[i],l[i])
)
*
(
 Z(0,l[i],a[i],0,l[i],a[i],0,l[j],a[j],0,l[j],a[j],0)
//-Z(0,l[i],a[i],0,l[i],a[i],1,l[j],a[j],0,l[j],a[j],1)*sgni*sgnj
+Z(0,l[i],a[i],0,l[i],a[i],0,l[j],a[j],1,l[j],a[j],1)*sgnj*sgnj
//+Z(0,l[i],a[i],0,l[i],a[i],1,l[j],a[j],1,l[j],a[j],0)*sgnj*sgni
//+Z(0,l[i],a[i],1,l[i],a[i],0,l[j],a[j],0,l[j],a[j],1)*sgni*sgnj
+Z(0,l[i],a[i],1,l[i],a[i],1,l[j],a[j],0,l[j],a[j],0)*sgni*sgni
//-Z(0,l[i],a[i],1,l[i],a[i],0,l[j],a[j],1,l[j],a[j],0)*sgni*sgnj
+Z(0,l[i],a[i],1,l[i],a[i],1,l[j],a[j],1,l[j],a[j],1)*sgni*sgnj*sgni*sgnj
)
*/
mag(k,n[i],l[i],a[i])*mag(k,n[j],l[j],a[j]) //this line gives same value as commented out code above





var denom2=

/*
(
Y(k,ll[i2]+ll[i2]+2,ll[j2]+ll[j2]+2,nn[i2],ll[i2],nn[i2],ll[i2],nn[j2],ll[j2],nn[j2],ll[j2])
+Y(k,ll[j2]+ll[j2]+2,ll[i2]+ll[i2]+2,nn[j2],ll[j2],nn[j2],ll[j2],nn[i2],ll[i2],nn[i2],ll[i2])
)
*
(
 Z(0,ll[i2],aa[i2],0,ll[i2],aa[i2],0,ll[j2],aa[j2],0,ll[j2],aa[j2],0)
//-Z(0,ll[i2],aa[i2],0,ll[i2],aa[i2],1,ll[j2],aa[j2],0,ll[j2],aa[j2],1)*sgni2*sgnj2
+Z(0,ll[i2],aa[i2],0,ll[i2],aa[i2],0,ll[j2],aa[j2],1,ll[j2],aa[j2],1)*sgnj2*sgnj2
//+Z(0,ll[i2],aa[i2],0,ll[i2],aa[i2],1,ll[j2],aa[j2],1,ll[j2],aa[j2],0)*sgnj2*sgni2
//+Z(0,ll[i2],aa[i2],1,ll[i2],aa[i2],0,ll[j2],aa[j2],0,ll[j2],aa[j2],1)*sgni2*sgnj2
+Z(0,ll[i2],aa[i2],1,ll[i2],aa[i2],1,ll[j2],aa[j2],0,ll[j2],aa[j2],0)*sgni2*sgni2
//-Z(0,ll[i2],aa[i2],1,ll[i2],aa[i2],0,ll[j2],aa[j2],1,ll[j2],aa[j2],0)*sgni2*sgnj2
+Z(0,ll[i2],aa[i2],1,ll[i2],aa[i2],1,ll[j2],aa[j2],1,ll[j2],aa[j2],1)*sgni2*sgnj2*sgni2*sgnj2
)
*/

mag(k,nn[i2],ll[i2],aa[i2])*mag(k,nn[j2],ll[j2],aa[j2]) //this line gives same value as commented out code above

denom=Math.sqrt(denom1*denom2)


}




if(denom!=0){






ss=ss-0+num/denom


}


/*
} //j2 loop
} // i2 loop
}// j loop
}// i loop

*/

} // s loop



} // ct loop





return ss*correction
}




var globalpole=1





/* 

NOTE:

An internal check of W and Y is this identity: that for all k, n1,l1,n2,l2 it holds that 

W(k,n2,l2,n2,l2,-l2-l2)*W(k,n1,l1,n1,l1,-l1-l1)
=Y(k,2*l2+2,2*l1+2,n2,l2,n2,l2,n1,l1,n1,l1)+Y(k,2*l1+2,2*l2+2,n1,l1,n1,l1,n2,l2,n2,l2)





Another internal check of Z is that

(Z(0,l1,a1,0,l1,a1,0,0,0,0,0,0,0)+Z(0,l1,a1,1,l1,a1,1,0,0,0,0,0,0))
*
(Z(0,l2,a2,0,l2,a2,0,0,0,0,0,0,0)+Z(0,l2,a2,1,l2,a2,1,0,0,0,0,0,0))

=4*Math.PI*4*Math.PI

*(
Z(0,l1,a1,0,l1,a1,0,l2,a2,0,l2,a2,0)
+Z(0,l1,a1,0,l1,a1,0,l2,a2,1,l2,a2,1)
+Z(0,l1,a1,1,l1,a1,1,l2,a2,0,l2,a2,0)
+Z(0,l1,a1,1,l1,a1,1,l2,a2,1,l2,a2,1)
)



Note also that the magnitude of f_{k,n,l}(h_{a,0}+ih_{a,1})P_{l,l+a}(z,r)  is 

W(k,n,l,n,l,-l-l)*(Z(0,l,a,0,l,a,0,0,0,0,0,0,0)+Z(0,l,a,1,l,a,1,0,0,0,0,0,0))/(4*Math.PI)

*/

var magMemoize={}

function mag(k,n,l,a){
if(magMemoize[k]===undefined)magMemoize[k]={}
if(magMemoize[k][n]===undefined)magMemoize[k][n]={}
if(magMemoize[k][n][l]===undefined)magMemoize[k][n][l]={}
if(magMemoize[k][n][l][a]!==undefined){return magMemoize[k][n][l][a]}
else{

var s= W(k,n,l,n,l,-l-l)*(Z(0,l,a,0,l,a,0,0,0,0,0,0,0)+Z(0,l,a,1,l,a,1,0,0,0,0,0,0))/(4*Math.PI)


magMemoize[k][n][l][a]=s
return s

}}



//Not used, can be used to go from an electron config to the whole matrix

function getMatrix(K,k){
enumerate(K)
if(typeof(K)=="string")K=term2array(K)
if(typeof(K[0][0])!="object"){var a=configs(K)}else{var a=K}
if(k===undefined){k=a[0][0].length}


var mat=[]
for(var i=0;i<a.length;i++){
mat[i]=[]
for(var j=i;j<a.length;j++){
mat[i][j]=XX(k,a[i],a[j],multipole,globalpole)+YY(k,a[i],a[j])



}

}
for(var i=0;i<a.length;i++){for(var j=i+1;j<a.length;j++){mat[j][i]=mat[i][j]}}
return mat
}


//Not used, analagous to above gets fine part only


function getFine(K,k){
enumerate(K)
if(typeof(K)=="string")K=term2array(K)
if(typeof(K[0][0])!="object"){var a=configs(K)}else{var a=K}
if(k===undefined){k=a[0][0].length}


var mat=[]
for(var i=0;i<a.length;i++){
mat[i]=[]
for(var j=i;j<a.length;j++){
mat[i][j]=YY(k,a[i],a[j])



}

}
for(var i=0;i<a.length;i++){for(var j=i+1;j<a.length;j++){mat[j][i]=mat[i][j]}}
return mat
}


//Not used, analagous to above, gets electrostatic part only


function getElectro(K,k){

if(typeof(K)=="string")K=term2array(K)
if(typeof(K[0][0])!="object"){var a=configs(K)}else{var a=K}
if(k===undefined){k=a[0][0].length}


var mat=[]
for(var i=0;i<a.length;i++){
mat[i]=[]
for(var j=i;j<a.length;j++){
mat[i][j]=XX(k,a[i],a[j],multipole,globalpole)



}

}
for(var i=0;i<a.length;i++){for(var j=i+1;j<a.length;j++){mat[j][i]=mat[i][j]}}
return mat
}


//This converts a string representing an electron configuration to an array representing the same thing


function term2array(config){





config=repairterm(config)



info=[]
var splitpt=config.substring(2,config.length).search(/[0-9][spdfghijk]/)+2
var ww=config.charAt(splitpt-3) // will be s,p,d,f.... if following string is 2 digit number
var tt=terms.indexOf(ww)
var os=2*(2*tt+1) // size of that orbital or -2
if(os>0&&os<parseInt(config.substring(splitpt-2,splitpt))) splitpt-- //must refer to a 1 digit number then
while(splitpt>1){

info.push(config.substring(0,splitpt))
config=config.substring(splitpt,config.length)
splitpt=config.substring(2,config.length).search(/[0-9][spdfghijk]/)+2
var ww=config.charAt(splitpt-3) // will be s,p,d,f.... if following string is 2 digit number
var tt=terms.indexOf(ww)
var os=2*(2*tt+1) // size of that orbital or -2
if(os>0&&os<parseInt(config.substring(splitpt-2,splitpt))) splitpt-- //must refer to a 1 digit number then
}
info.push(config)



var n=[],l=[],a=[]
for(var i=0;i<info.length;i++){
var pt=info[i].search(/[spdfgh]/)
n.push(parseInt(info[i].substring(0,pt)))
var error=true
j=terms.indexOf(info[i].charAt(pt))
if(j>-1){error=false;l.push(j)}else{error=true}
if(error){alert("error: "+config);return}
a.push(parseInt(info[i].substring(pt+1,info[i].length)))
}
if(l.length!=n.length||n.length!=a.length){alert("error");return}



var K=[a,n,l]
return K

}












function W(k,n1,l1,n2,l2,a){ // integral of r^{2-a}f_{k,n_1,l_1}f_{k,n_2,l_2} from 0 to infty
var ss=0
for(var i1=0;i1<=n1-l1-1;i1++){
for(var i2=0;i2<=n2-l2-1;i2++){
ss=ss
+Math.pow(k*beta,a-3)
*ffactorial[i1+i2+2-a]
*Math.pow(-1,i1+i2+2-a)
*bbinomial[n1+l1][n1-l1-1-i1]
*bbinomial[n2+l2][n2-l2-1-i2]
*1/Math.pow(1/(2*n1)+1/(2*n2),i1+i2+2-a+1)
*1/ffactorial[i1]
*1/ffactorial[i2]
*Math.pow(n1,-i1)
*Math.pow(n2,-i2)
}}
return ss*Math.pow(beta,3-a)
}







function getRS(K,k){



//return minus(casimirJ(K),plus(casimirL(K),casimirS(K)))

return minus(casimirJ(K),casimirL(K))
}


var RS
var indexer

var useSlow=false


// This is used to enumerate rows/columns of a submatrix, something technical here


function enumerate(K){

if(typeof(K)=="string")K=term2array(K)
if(typeof(K[0][0])!="object"){var a=configsfaster(K)}else{var a=K}



var lmax=0,nmax=0


for(var i=0;i<a.length;i++){for(var j=0;j<a[i][0].length;j++){
if(lmax<a[i][0][j])lmax=a[i][0][j];if(nmax<a[i][2][j])
nmax=a[i][2][j]}}



//create a basis for the relevant first exterior power

var firstExta=[]
indexer=[]
var counter=0
for(var l=0;l<=lmax;l++){indexer[l]=[]
for(var a1=-l;a1<l+1;a1++){indexer[l][a1-0+l]=[]
for(var n=l+1;n<=nmax;n++){indexer[l][a1-0+l][n]=[]
for(var sp=0;sp<2;sp++){indexer[l][a1-0+l][n][sp]=counter

firstExta.push([[l],[a1],[n],[sp]])
counter++
}}}}



 RS=getRS(firstExta) // we will use indexer to find particular entries



}


//This is the perturbation matrix for the fine structure


function YY(k,x,y){ //need to enumerate before calling this
var l=x[0]
var a1=x[1]
var n=x[2]
var sp=x[3]
var ll=y[0]
var aa1=y[1]
var nn=y[2]
var ssp=y[3]




var ss=0



var u=l.length

/*
for(var i=0;i<u;i++){  // break if any besides i'th  are different.
for(var i2=0;i2<u;i2++){ 

*/


//This strange block of code below is just to save looping through values of i,i2 which would be slow
// so it indices all of the good ones by a single index ct

var test1=[[]]
var test2=[[]]
for(var i=0;i<u;i++){test1.push([l[i],a1[i],n[i],sp[i]]);test2.push([ll[i],aa1[i],nn[i],ssp[i]])}
test1.push([])
test2.push([])
var indices=pth1(equals1(test1,test2),0,0,1,1)
for (var ct=0;ct<indices.length;ct++){
var i=indices[ct][0]-1
var i2=indices[ct][1]-1


/*




var lcopy=l.slice(0)
var a1copy=a1.slice(0)
var ncopy=n.slice(0)
var spcopy=sp.slice(0)

var llcopy=ll.slice(0)
var aa1copy=aa1.slice(0)
var nncopy=nn.slice(0)
var sspcopy=ssp.slice(0)


lcopy.splice(i,1)
a1copy.splice(i,1)
ncopy.splice(i,1)
spcopy.splice(i,1)


llcopy.splice(i2,1)
aa1copy.splice(i2,1)
nncopy.splice(i2,1)
sspcopy.splice(i2,1)


if(
!lcopy.equals(llcopy)
||!a1copy.equals(aa1copy)
||!ncopy.equals(nncopy)
||!spcopy.equals(sspcopy)
)continue


*/

var totalsign=Math.pow(-1,Math.abs(i-i2))



var num=0
var denom=0




num=totalsign*W(k,n[i],l[i],nn[i2],ll[i2],3-l[i]-ll[i2])*RS[indexer  [l[i]][a1[i]-0+l[i]][n[i]][sp[i]] ][indexer[ll[i2]][aa1[i2]-0+ll[i2]][nn[i2]] [ssp[i2]] ]


if(denom==0&&num!=0){
var denom1= // can save this from one s value to the next to make it faster. Already commented out cancelling terms
W(k,n[i],l[i],n[i],l[i],-2*l[i])

var denom2=
W(k,nn[i2],ll[i2],nn[i2],ll[i2],-2*ll[i2])


denom=Math.sqrt(denom1*denom2)
}


if(denom!=0){
ss=ss-0+num/denom
}


/*                For speed, these have been combined into a single index ct using function pth in inde.js to rule out extraneous cases earlier
} // i loop
}// i2 loop
*/

} //ct loop


return ss

/*
*2 // coefficient from the 2l(l+1) term in the Laplacian no longer used
*/


*Math.pow(h/(2*Math.PI),2)*1/(2*m) // reciprocal of the constant alpha/E = beta/e^2 in Schroedinger eq
*1/h // convert energy to frequency Note this all multiplies out to 2/(alpha h)
*correction // this is e^2/(4 pi eps )^2 times 1/h
*fmultuse



}