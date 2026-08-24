// This function returns just one number, but it is used for something drastic when 
// either the user presses 'apply correction' or the checkbox 'autocorrect' is checked.
// 
// It outputs the number emult which is used to multiply the proton charge
// calculated in the function toEnergy, the one that calculates the sum
// of reciprocal squares. Typically this multiplier is as large as 3 or 4
// and yet it seems to be necessary, in that the proton attraction effects
// on electron configs with differing sums of reciprocal squares seems
// to have been hit by the perturbation correction, and this needs to
// be undone. 
// 
// The value that is returned is the one which minimizes the second 
// differences of sequences of constant l quantum numbers. 
// In order to make sense of second differences we have to hypothesize
// an ordering on the levels, initially this is taken to be lex 
// with respect to the sum of reciprocal squares and the perturbation
// effect, though this does not matter, as the calculation is re-run
// a few times and the ordering allowed to all into actual natural
// ordering. So there is not really any difficulty with the notion
// that the returned value both affects and is affected by a permutation
// of the levels.
//
// The rationale is that these second differences were created by
// an artificial distortion affecting all configurations with the
// same underlying sum of reciprocal squares in the same way -- 
// because of an artificial understanding of the role of the sums
// of reciprocal squares in the first place in the formulation
// of perturbation analysis. 


// Examples:  getRW()  -- get emult using all values of resultt
//            getRW(2,10) -- get emult using values from 2 to 10
//            getRW(2, Infinity) -- get emult using all values from 2 onwards

function getRW(ss,tt){

//ss and tt are starting and ending indices

var ss2,tt2
ss2=ss;tt2=tt
if(ss==undefined||ss<0)ss2=0
if(tt==undefined||typeof(tt)!="number"||tt>resultt.length)tt2=resultt.length


// res contains then e, p, K, i, j, ii

var res=[]
for(var i=0;i<resultt.length;i++){
//for(var i=ss2;i<tt2;i++){
res.push([resultt[i][10],resultt[i][11],resultt[i][12],resultt[i][7],resultt[i][8]])
}

var em=100 // first set em to a high number

for(var uv=0;uv<100;uv++){ // do it a few times in case ordering is wrong at first


res.sort(function(a,b){return em*a[0]+pmult*a[1]-em*b[0]-pmult*b[1]})




var storea=[]
var storeb=[]
var done=false

//Find out if value of sequence of l values in config has already occurred, call its index "found" if so

for(var i=ss2;i<tt2;i++){
var found=-1
for(var j=0;j<storea.length;j++){
if(getLS(res[i][2]).equals(getLS(storea[j][2]))){
found=j;break}}

// If not already there, put it into storea, set found to index it, and start the storeb array

if(found==-1){storea.push(res[i]);found=storea.length-1;storeb[found]=[]}


// Check if already have the config and the term symbol the same

var alreadyhave=false
for(var j=0;j<storeb[found].length;j++){
if(getNS(res[i][2]).equals(getNS(storeb[found][j][2]))&&res[i][3]==storeb[found][j][3] && res[i][4]==storeb[found][j][4]    )
{alreadyhave=true;break}}


if(!alreadyhave)storeb[found].push(res[i])
}




var dip=[],die=[],ind=[]

for(var i=0;i<storea.length;i++){
for(var j=0;j<storeb[i].length;j++){
dip.push(pmult*storeb[i][j][1])
die.push(storeb[i][j][0])
ind.push(i)   // indexes l value sequence by a number
}}


// save successive differences which have constant l value sequence


var difp=[],dife=[],infd=[]
for(var i=1;i<dip.length;i++){
if(ind[i]==ind[i-1]){
difp.push(dip[i]-dip[i-1])
dife.push(die[i]-die[i-1])
infd.push(ind[i])
}}



var diffp=[],diffe=[]
for(var i=1;i<difp.length;i++){
if(infd[i]==infd[i-1]){
diffp.push(difp[i]-difp[i-1])
diffe.push(dife[i]-dife[i-1])
}}


//console.log(diffp)
//console.log(diffe)

var break1=[diffp],break0=[diffe]



if(break0[0].length==0||times(break0,transpose(break0))[0][0]==0){return 1}

var alpha=-times(break1,transpose(break0))[0][0]
/
times(break0,transpose(break0))[0][0]

em=alpha


}


return alpha //reciprocal of permult

}


// not used

var correcting=false
function correct(){
var e1=emult
emult=100;sort();
var e2=getRW(Math.floor(resultt.length/3),Infinity);sort();sort();graphColors()
if(e2==1||getRW(Math.floor(3*resultt.length/5),Infinity)==1){alert("correction does not work well for too few configurations.\n\nPress 'Next Config' again first.");return}
if(e1==e2){return}
if(correcting){alert("still displaying earlier correction, wait a few seconds");return}
correcting=true
document.getElementById("gif").innerHTML="wait..."
setTimeout("correcting=false;while(document.getElementById(\"gif\").firstChild)document.getElementById(\"gif\").removeChild(document.getElementById(\"gif\").firstChild)",17000)

for(var i=0;i<321;i++){
setTimeout("emult="+(e1+(e2-e1)*i/320).toString()+";showLevels(pmult*resultt[0][11]+emult*resultt[0][10]);graphColors()",i*50)
}
}


function getLS(K){

var K2=[]
K2[0]=K[0].slice(0)
K2[1]=K[2].slice(0)
return K2
}


function getNS(K){

var ns=[]
for(var i=0;i<K[0].length;i++){
for(var j=0;j<K[0][i];j++){
ns.push(K[1][i])
}}
return ns
}