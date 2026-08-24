
var stretchfactor=.89

function showImage(n){

var showdiv=document.createElement("div")
showdiv.style.overflow="hidden"
showdiv.style.width="200px" 
showdiv.style.height="20px"
showdiv.style.position="relative"
showdiv.style.left="194px"
showdiv.style.top="10px"
showdiv.style.border="solid"
showdiv.style.borderWidth="1px"
showdiv.style.borderColor="#444444"
document.getElementById("sgraph").appendChild(showdiv)

n=n-1
var im=document.createElement("img")
im.src="spectr.png"
im.style.width=(1228*stretchfactor).toString()+"px"
im.style.height="2048px"
im.style.position="absolute"
im.style.top=(-10-(25-(n%26))*40*240/120).toString()+"px"
im.style.left=(-1228*stretchfactor+206+(n-(n%26))/26*150*240/120*stretchfactor).toString()+"px"

showdiv.appendChild(im)
var exdiv=document.createElement("div")
exdiv.style.width="80px"
exdiv.style.height="30px"
exdiv.style.color="#999999"
exdiv.innerHTML="( observed:"
exdiv.style.position="absolute"
exdiv.style.left="105px"
exdiv.style.top="10px"
document.getElementById("sgraph").appendChild(exdiv)

var exdiv=document.createElement("div")
exdiv.style.width="8px"
exdiv.style.height="30px"
exdiv.style.color="#999999"
exdiv.innerHTML=")"
exdiv.style.position="absolute"
exdiv.style.left="404px"
exdiv.style.top="10px"
document.getElementById("sgraph").appendChild(exdiv)
}


