var i=0;
var video=new Array();
video[0]="one.mp4";
video[1]="two.ogg";
var videoimagesrc=new Array();
videoimagesrc[0]="images/one.jpg";
videoimagesrc[1]="images/two.jpg";
var vd=document.getElementById("videoimage");
var changesrc=function()
{
  vd.src=videoimagesrc[i];
  i++;
  i=i%(videoimagesrc.length);
};
var timer=window.setInterval(changesrc, 2000);