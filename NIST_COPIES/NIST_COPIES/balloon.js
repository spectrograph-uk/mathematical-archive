/****************************************************************
 * Balloons in JavaScript. 
 *   
 * Balloon000515
 * by Christiaan Hofman, May 2000
 *   
 * This code is based upon the code by Michelle Wyner, provided by 
 * by Netscape Communications Corporation, copyright 1998. 
 *   
 * You may use or modify this code provided that this copyright notice
 * appears on all copies.
 *   
 *  First load this file using a SCRIPT tag. 
 *  Then create balloons using (either in head section or at the end):
 *   
 *    makeBalloon( "id", width, "text" );
 *   
 *  Link to a balloon in the text using (within SCRIPT tags): 
 *   
 *    linkBalloon( "id", "text" [, "status", "href"] );
 *      
 *  The "status" is the text in the statusline. The default is given by 
 *  var balloonStatus = "Tip". 
 *  Special values: "id", for the id, and "href" for the link URL. 
 *  Setting the "href" argument makes it a clickable link. 
 *   
 *  You can change the styles of the balloons (DIV.balloon) and the 
 *  links to the balloons (A.tip and A.linktip) using the STYLE tag. 
 *  This must be done after loading the 'balloon.js' file. 
 *   
 *===============================================================
 *  Example: 
 *---------------------------------------------------------------
 *   
 *  <HTML>
 *  <HEAD>
 *
 *  <SCRIPT SRC="http://www.rci.rutgers.edu/~hofman/js/balloon.js"></SCRIPT>
 *  <STYLE><!--
 *  DIV.balloon { background-color:ffffcc; layer-background-color:ffffcc; }
 *  --></STYLE>
 *  <SCRIPT> 
 *    function setupTips() { 
 *        makeBalloon('ex1',100,'This is the first Balloon');
 *        makeBalloon('ex2',100,'This is the second Balloon');
 *        ...
 *    }   
 *  </SCRIPT> 
 *
 *  </HEAD> 
 *  <BODY> 
 *
 *  Some HTML and text, ...  
 *   
 *  ... when hovering the 
 *  <SCRIPT>linkBalloon('ex1','first balloon')</SCRIPT>, 
 *  a balloon shows up ... 
 *   
 *  ... when clicking the 
 *  <SCRIPT>linkBalloon('ex2','second balloon','href','http://www.rci.rutgers.edu/~hofman')</SCRIPT>, 
 *  it works also as a link ... 
 *   
 *  ... and some more HTML.  
 *   
 *  <SCRIPT> 
 *    setupTips()
 *  </SCRIPT> 
 *   
 *  </BODY>
 *  </HTML>
 *   
 ****************************************************************
 */

//  Sets the styles for the Balloons and links to the balloons. Always needed. 

//  Creates a new Balloon.
function makeBalloon( id, width, message ) {
    if (width) document.writeln('<STYLE TYPE="text/css"><!-- #'+id+' {width:'+width+'} --></STYLE>');
    document.writeln('<DIV CLASS="balloon" ID="'+id+'">'+message+'</DIV>');
}

//  Creates a link to a Balloon.
function linkBalloon( id, text, status, href ) {
    status = status || balloonStatus;
    if (href) {
        var cls = 'linktip';
        if (status == 'href')  status = null;
    } else {
        var cls = 'tip';
        href = 'javascript:void(toggleBalloon(\''+id+'\'))';        
        if (status == 'href')  status = '';
    }
    if (status == 'id')  status = id;
    var outstatus = (typeof(status) == 'string')? 'self.status=\'\';return true' : '';
    status = (typeof(status) == 'string')? 'self.status=\''+status+'\';return true' : '';
    document.write('<A HREF="'+href+'" CLASS="'+cls+'"'+
       ' onMouseOver="showBalloon(\''+id+'\',event);'+status+'"'+
       ' onMouseOut="hideBalloon(\''+id+'\',event);'+outstatus+'">'+
       text +'</A>');
}

//  Standard call for a Balloon, called by the link at mouseover. 
function showBalloon( id, event ) {
    var x = 10, y = 10;
    if (event) {
        if (document.all) {
            x = document.body.scrollLeft + document.documentElement.scrollLeft + event.clientX + 10;
            y = document.body.scrollTop + document.documentElement.scrollTop + event.clientY + 10;
        } else if (document.layers || document.getElementById) {
            x = event.pageX + 10;
            y = event.pageY + 10;
        }
    }
    putBalloon(id, x, y);
    if (window.onBalloonCall)  window.onBalloonCall(id, event);             
}

//  Standard removal of a Balloon, called by the link at mouseout. 
function hideBalloon( id, event ) {
    removeBalloon(id);
    if (window.onBalloonHide)  window.onBalloonHide(id, event);
}

//  The event handlers onBalloonCall and onBalloonHide can be set to perform appropriate actions. 
//  When another Balloon is called or removed, use the following two functions (to avoid a loop). 
function putBalloon( id, x, y ) {
    var l;
    if (document.layers) {
        l = document.layers[id];
        l.left = Math.min(Math.max(x, window.pageXOffset), window.pageXOffset + window.innerWidth - l.clip.width);
        l.top = Math.min(Math.max(y, window.pageYOffset), window.pageYOffset + window.innerHeight - l.clip.height);
        l.visibility = "visible";
        l.zIndex = 100;
    } else if (document.all) {
        l = document.all[id];
        l.style.pixelLeft = Math.min(Math.max(x, document.body.scrollLeft + document.documentElement.scrollLeft), document.body.scrollLeft + document.documentElement.scrollLeft + document.body.clientWidth - l.offsetWidth);
        l.style.pixelTop = Math.min(Math.max(y, document.body.scrollTop + document.documentElement.scrollTop), document.body.scrollTop + document.documentElement.scrollTop + document.body.clientHeight - l.offsetHeight);
        l.style.visibility = "visible";
        l.style.zIndex = 100;
    } else if (document.getElementById) {
        l = document.getElementById(id);
        l.style.left = Math.min(Math.max(x, window.pageXOffset), window.pageXOffset + window.innerWidth - l.offsetWidth) +"px";
        l.style.top = Math.min(Math.max(y, window.pageYOffset), window.pageYOffset + window.innerHeight - l.offsetHeight) +"px";
        l.style.visibility = "visible";
        l.style.zIndex = 100;
    }
}

//  Removal of a Balloon. 
function removeBalloon( id ) {
    if (document.layers) {
        var l = document.layers[id];
    } else if (document.all) {
        var l = document.all[id].style; 
    } else if (document.getElementById) {
        var l = document.getElementById(id).style;
    }
    if (!l) return;
    if (!l.fixed)  l.visibility = "hidden";
}

//  Toggles the fixation of the Balloon.
function toggleBalloon( id ) {
    if (document.layers) {
        var l = document.layers[id];
    } else if (document.all) {
        var l = document.all[id].style; 
    } else if (document.getElementById) {
        var l = document.getElementById(id).style;
    }
    if (!l) return;
    if (l.fixed = !l.fixed)  l.zIndex = 1;
}

//  The default balloon status text. 
window.balloonStatus = "Help";

//  The default balloon and link styles. 
document.writeln( '<STYLE TYPE="text/css"><!--',
    'DIV.balloon {',
    ' position:absolute; visibility:hidden; display:block; width:250px; height:auto;',
    ' background-color:#bcecd0; layer-background-color:lightyellow;',
    ' color:#012012; font-family:arial; text-align:justify; font-size: 75\%; padding:5px;',
    ' border-style:solid; border-width:1px; border-color:black; } ',
    'A.tip:link { text-decoration:none; color:navy; cursor:help; } ',
    'A.tip:visited { text-decoration:none; color:navy; cursor:help; } ',
    'A.tip:active { text-decoration:none; color:navy; cursor:help; } ',
    'A.tip:link { text-decoration:none; color:navy; cursor:help; } ',
    'A.tip:hover { color:red; } ',
    'A.linktip:link { color:navy; } ',
    'A.linktip:visited { color:navy; } ',
    'A.linktip:active { color:navy; } ',
    'A.linktip:hover { color:red }',
    '--></STYLE>' );
