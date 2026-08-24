function showLevels(startingE){
resultt.sort(function(a,b){return pmult*a[11]+emult*a[10]-pmult*b[11]-emult*b[10]})
document.body.style.background="white"
document.getElementById("colorButton").value="visible colors"
document.getElementById("colorButton").onclick=showColors
showingColors=false
while(document.getElementById("terms").firstChild)document.getElementById("terms").removeChild(document.getElementById("terms").firstChild)



var st="\<table style=\"font-size:14px\" \>"
for(var i=0;i<resultt.length;i++){
st+="\<tr \>"
st+=displaystring(resultt[i],startingE)
st+="\</tr\>"
}
var st2=""

if(!document.getElementById("docalc").checked){
warnfine=false
st2+="\<br\>\<br\>\<span style=\"font-size:20px;color:#FFAAAA\"\>Warning: Recalculate with \'do calc\' checked to include the electrostatic effect.\</span\>"
}
if(warnmults)st2+="\<br\>\<span style=\"font-size:20px;color:#EE7777\"\>Warning: A repeated term has been detected! Press \'clear\' and recalculate with \'do mults\' checked to resolve multiplicity.\</span\>"
if(warnfine)st2+="\<br\>\<span style=\"font-size:20px;color:#FFAAAA\"\>Warning: Press \'clear\' and recalculate with \'do fine\' checked to see the fine structure.\</span\>"
if(warnoverflow)st2+="\<br\>\<span style=\"font-size:20px;color:#EE7777\"\>Warning: Integer overflow detected! Levels marked 'overflow' will have incorrect fine structure.\</span\>"
if(warntoofewforcorrect)st2+="\<br\>\<span style=\"font-size:20px;color:#FFAAAA\"\>Warning: coarse correction has not yet been applied, press 'next config' whenever it is flashing to include more configurations.\</span\>"

st2+="\<div style=\"height:30px\"\>\</div\>"

document.getElementById("terms").innerHTML=st+"\</table\>"+st2

}







function displaystring(v,sss){
if(typeof(sss)=="undefined"||typeof(sss)=="string")sss=0




var x="\<td  \>"
+v[0] +"&nbsp;"

+"\</td\>\<td \>"
+v[9].replace(/([\-0-9]+[\.][0-9]+)/g,function(a,b){return Math.floor(parseFloat(b)-sss/lightspeed+.5).toString()})
+"&nbsp;"
+"\</td\>\<td \>"
+lightUnits(pmult*v[11]+emult*v[10])

+"\</td\>\<td \>"
+"(unperturbed: "
+(Math.floor(v[10]/lightspeed)).toString()
+")"

+"\</td\>\<td \>"
+(Math.floor(1000*((pmult*v[11]+emult*v[10]-sss)/lightspeed))/1000).toString().replace(/([0-9][0-9][0-9])($|[\.])/," "+"$1$2")
+" cm\<sup\>-1\</sup\> "



if(document.getElementById("showchars").checked){x=

//Monomial Character (=not highest weights)

x+"\</td \>\<td \> &nbsp; perturbation character (positive terms): "
+poly2HTML(v[5],["S","L"]).replace(/\.[0-9]+/g,"").replace(/(^|[^0-9])([1])([LS])/g,"$1$3")
.replace(/\<sup\>1\<\/sup\>/g,"")
.replace(/\+/g," + ").replace(/\-/g," - ")
.replace(/([0-9])([LS])/g,"$1 $2")


//Dummy Monomial Character (not perturbation not highest weights)


+"\</td\>\<td \>&nbsp;based on: "
+poly2HTML(v[6],["S","L"]).replace(/\.[0-9]+/g,"").replace(/(^|[^0-9])([1])([LS])/g,"$1$3")
.replace(/\<sup\>1\<\/sup\>/g,"")
.replace(/\+/g," + ").replace(/\-/g," - ")
.replace(/([0-9])([LS])/g,"$1 $2")




//Dummy Character (Not perturbation yes highest weights )

+"\</td\>\<td\>&nbsp;Extract highest weights:   "
+poly2HTML(v[4],["S","L"]).replace(/\.[0-9]+/g,"").replace(/(^|[^0-9])([1])([LS])/g,"$1$3")
.replace(/\<sup\>1\<\/sup\>/g,"")
.replace(/\+/g," + ").replace(/\-/g," - ")
.replace(/([0-9])([LS])/g,"$1 $2")



//Reduced Character 

+"\</td\>\<td \> &nbsp; reduced char:  "
+poly2HTML(v[3],["S","L"])
.replace(/\.[0-9]+/g,"")
.replace(/(^|[^0-9])([1])([LS])/g,"$1$3")
.replace(/\<sup\>1\<\/sup\>/g,"")
.replace(/\+/g," + ").replace(/\-/g," - ")
.replace(/([0-9])([LS])/g,"$1 $2")


//RS  Character

var ww=[]
for(var i=0;i<v[3].length;i++){ww[i]=[]
for(var j=0;j<v[3][i].length;j++){
if(i>=v[4].length||j>v[4][i].length||v[4][i][j]==0){ww[i][j]=0}else{ww[i][j]=v[3][i][j]}
}}

x+="\</td\>\<td \> &nbsp; relevant terms:  "
+poly2HTML(ww,["S","L"])
.replace(/\.[0-9]+/g,"")
.replace(/(^|[^0-9])([1])([LS])/g,"$1$3")
.replace(/\<sup\>1\<\/sup\>/g,"")
.replace(/\+/g," + ").replace(/\-/g," - ")
.replace(/([0-9])([LS])/g,"$1 $2")


}

+"\</td\>"



return x
}