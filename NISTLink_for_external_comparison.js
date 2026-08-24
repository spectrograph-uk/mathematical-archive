// Here are the names of the atoms, not used now as we use z= notation

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

var win
function getNIST(i,j){

if(win)win.close()

var w="500"
var h="500"


var jj=ions[j-1]
var ii=i.toString()  // if this does not work, use elts[i][1] and delete the z= in the next line

/*

This is commented out because NIST site is down

win=window.open("http://physics.nist.gov/cgi-bin/ASD/energy1.pl?encodedlist=XXT2&spectrum=z="
+ii
+"+"
+jj
+"&submit=Retrieve+Data&units=0&format=0&output=0&page_size=15&multiplet_ordered=0&conf_out=on&term_out=on&level_out=on&j_out=on&lande_out=on&perc_out=on&biblio=on&temp="
,"_blank","width="+w+",height="+h+",left=650,location=0,menubar=0,resizable=0,scrollbars=1,status=0,titlebar=0")
*/

win=window.open("NIST_COPIES/NIST_COPIES/data"+i.toString()+"_"+(j-1).toString()+".html","_blank","width="+w+",height="+h+",left=650,location=0,menubar=0,resizable=0,scrollbars=1,status=0,titlebar=0")

if(win)win.onload=function(){win.document.documentElement.scrollTop=win.document.getElementsByTagName("table")[3].offsetTop-80
if(win)win.document.body.scrollTop=win.document.getElementsByTagName("table")[3].offsetTop-80}

}

window.onunload=function(){if(win)win.close()}