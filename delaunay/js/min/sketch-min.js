var s=function(n){var a=600,e=400,r;n.setup=function(){var t=n.createCanvas(a,e);t.parent("myContainer"),r=[[200,200],[50,250],[400,100]]},n.draw=function(){n.background(51);for(var a=0;a<r.length;a++){var e=r[a];n.ellipse(e[0],e[1],10,10)}for(var t=Delaunay.triangulate(r),a=0;a<t.length-2;a++){var u=[r[t[a]][0],r[t[a]][1]],o=[r[t[a+1]][0],r[t[a+1]][1]],i=[r[t[a+2]][0],r[t[a+2]][1]];n.triangle(u[0],u[1],o[0],o[1],i[0],i[1])}},n.mouseClicked=function(){r.push([n.mouseX,n.mouseY])}};$(document).ready(function(){var n=new p5(s)});