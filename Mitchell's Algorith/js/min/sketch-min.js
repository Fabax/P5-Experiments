var s=function(n){var t=1e3,r=50,o=255,a=600,e=500,u,i,f=[],c=0,h=function(){return Math.random(0,1)*a},l=function(){return Math.random(0,1)*(e/2+-5)},s=function(){return e/2+5+l()},v=h(),p=l(),d=h(),m=s();n.setup=function(){var t=n.createCanvas(a,e);t.parent("myContainer"),n.strokeWeight(3),n.smooth()},n.draw=function(){if(n.stroke(o,o,o),n.strokeWeight(5),n.point(v,p),n.point(d,m),f.push([v,p]),c++,o>0)o-=r;else{o=255,d=h(),m=s();for(var a=null,e=0;10>e;e++){u=h(),i=l();var g=M();(null===a||g>a)&&(a=g,v=u,p=i)}}c>t&&n.noLoop()};var M=function(){for(var n=null,t=0,r=0;r<f.length;r++){var o=Math.pow(u-f[r][0],2),a=Math.pow(i-f[r][1],2),e=Math.sqrt(o+a);(null===n||n>e)&&(n=e,t=r)}return n},g=function(){for(var n=0;n<f.length;n++)point(f[n][0],f[n][1])}};$(document).ready(function(){var n=new p5(s)});