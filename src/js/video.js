


function changevideo(){
    var stringsrc=new Array();
    var so=document.getElementById("sr");
     var video1=document.getElementById("video1");
    stringsrc=(vd.src).split("/");
    
    if(stringsrc[stringsrc.length-1]=="one.jpg")
    {  
        console.log(stringsrc[stringsrc.length-1]);
        video1.src="one.mp4";
        video1.type="video/mp4";
    }
    if(stringsrc[stringsrc.length-1]=="two.jpg")
    {   
        console.log(stringsrc[stringsrc.length-1]);
        video1.src="two.ogg";
        video1.type="video/ogg";
    }
   
        video1.load();
        video1.play();
    
}
/*window.onload=function(){
vd.addEventListener("click",function(){
    var source=document.getElementById("sr");
    if(vd.src=="images/one.jpg")
    {
    source.type="video/mp4";
    source.src=video[0];
    }
    else
    {   
       source.type="video/ogg";
        source.src=video[1];
    }
    //consog.log(vd.src);
},flase);
}*/