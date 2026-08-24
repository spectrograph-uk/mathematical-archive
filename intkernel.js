//This calculates the kernel of an integer matrix using Euclid's algorithm




function intkernel(m2) {
//get rid of rows of zero
var m=[]
var n=m2[0].length
var zer=[];for(var i=0;i<n;i++){zer.push(0)}
for(var i=0;i<m2.length;i++){if(!zer.equals(m2[i]))m.push(m2[i])}

//console.log("intkernel input:\n"+JSON.stringify(m).replace(/\]/g,"]\n"))

    var nn = m.length
    var msave=matrixCopy(m)

      //pad rows of identity matrix

    for (var i = 0; i < n; i++) {
        var u = []
        for (var j = 0; j < n; j++) {
            u[j] = 0
        }
        u[i] = 1
        m.push(u)
    }



    var start2=-1
    for (var start = 0; start < n; start++) {start2++
        
//console.log("we are considering column "+start+" now")




            //Find smallest entry at or left of [start2,start], if it's just zero increment start2, if all are zero return, 
            //switch cols to put it to the left and subtract

var done=false
while(!done){
            var min=Infinity,ss=0
            //console.log("starting min loop")
             while(min==Infinity){
             for (var j = start; j < n; j++) {
                if (min > Math.abs(m[start2][j])&&m[start2][j]!=0){ min = Math.abs(m[start2][j]);ss=j}
            }
//console.log("min nonzero entry in row "+start2+" has size "+min+" and is in position "+ss)

            if(min==Infinity)start2++
            if(start2>=nn){ //console.log("we are at the end so returning")
                var result = []
                for (var i = 0; i < n; i++) {
                    result[i] = [];
                    for (var j = 0; j < n - start; j++) {
                        result[i][j] = m[i + nn][j + start]
                    }
                }
//console.log(JSON.stringify(result))
//console.log("integrity check:\n\n"+JSON.stringify(times(msave,result)))
//console.log("------------")

return result
            } 
//console.log("end of min loop")

}//end min loop


//console.log("switching cols "+ss+" and "+start)

                for (var i = start; i < nn+n; i++) {
                var buffer = m[i][start];
                m[i][start] = m[i][ss];
                m[i][ss] = buffer
            }


//console.log("\n\n"+JSON.stringify(m).replace(/\]/g,"]\n")+"\n\n")
 
            //column op to subtr
            
            var con=m[start2][start]
            for(var j=1+start;j<n;j++){
            var con2=m[start2][j]
//console.log("con, con2 are "+con+","+con2)
            var sgn=1;if(con*con2<0)sgn=-1
            var rat=Math.floor(Math.abs(con2/con))*sgn
//console.log("subtracting "+rat+" times column "+start+" from col "+j)

            for(var i=start2;i<nn+n;i++){
            m[i][j]-=rat*m[i][start]
            }}


//console.log("\n\n"+JSON.stringify(m).replace(/\]/g,"]\n")+"\n\n")
done=true
for(var j=1+start;j<n;j++){if(m[start2][j]!=0){done=false;break}}
//console.log("done is "+done)
 
}//end of done loop

}//end start loop

//console.log("returning cols "+start+" to end")
                var result = []
                for (var i = 0; i < n; i++) {
                    result[i] = [];
                    for (var j = 0; j < n - start; j++) {
                        result[i][j] = m[i + nn][j + start]
                    }
                }
//console.log(JSON.stringify(result))
//console.log("integrity check:\n\n"+JSON.stringify(times(msave,result)))
//console.log("------------")
return result
}