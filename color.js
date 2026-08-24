


// conversion to rgb written by Dan Bruton. The optional variable h just darkens lines from higher up in the spectrum
function freq2RGB(f,h){
if(typeof(h)=="undefined")h=1
var w=299792458/f*Math.pow(10,9) 

   var R = 0,
        G = 0,
        B = 0

    // colour
    if (w >= 380 && w < 440){
        R = -(w - 440.) / (440. - 350.)
        G = 0.0
        B = 1.0}
    if( w >= 440 && w < 490){
        R = 0.0
        G = (w - 440.) / (490. - 440.)
        B = 1.0}
    if( w >= 490 && w < 510){
        R = 0.0
        G = 1.0
        B = -(w - 510.) / (510. - 490.)}
    if( w >= 510 && w < 580){
        R = (w - 510.) / (580. - 510.)
        G = 1.0
        B = 0.0}
    if( w >= 580 && w < 645){
        R = 1.0
        G = -(w - 645.) / (645. - 580.)
        B = 0.0}
    if( w >= 645 && w <= 780){
        R = 1.0
        G = 0.0
        B = 0.0}
    
        var SSS=0

    //intensity correction
    if (w >= 380 && w < 420)
        SSS = 0.3 + 0.7*(w - 350) / (420 - 350)
    if( w >= 420 && w <= 700)
        SSS = 1.0
    if( w > 700 && w <= 780)
        SSS = 0.3 + 0.7*(780 - w) / (780 - 700)
    
    SSS = 255*SSS*Math.pow(h,2/3)

return "rgb("+Math.floor(SSS*R)+","+Math.floor(SSS*G)+","+Math.floor(SSS*B)+")"
}

