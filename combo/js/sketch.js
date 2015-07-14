var s = function( p ) {
  var w = 900;
  var h = 900/1.5;
  var l;
  var pds;
  var inc = 0;
  var triangles;
  var points;
  var img;
  var inc= 0;
  var imageNumber = 12;
  var myCanvas;

  p.preload = function(){
    img = p.loadImage("images/v"+imageNumber+".jpg");
    img.resize(w,h);
  };

  p.setup = function(){
      myCanvas = p.createCanvas(w, h);
      myCanvas.parent('myContainer');
      pds = new PoissonDiskSampler();
      setSampler();
      triangles = new Array();
      points = new Array();
      pds.createPoints();

      l = pds.pointList.length;
      console.log(l);

      p.image(img,0,0);

      for (var i = 0; i <l; i++) {
        points[i] = [pds.pointList[i].x,pds.pointList[i].y];
        // p.ellipse(pds.pointList[i].x,pds.pointList[i].y,pds.pointList[i].r,pds.pointList[i].r);
      }

      points[0] = [0,0];
      points[1] = [w,0];
      points[2] = [0,h];
      points[3] = [w,h];

      points[4] = [w/2,0];
      points[5] = [w,h/2];
      points[6] = [w/2,h];
      points[7] = [0,h/2];


  };

  p.draw = function() {



      triangles = Delaunay.triangulate(points);


      if(points != null){
          triangles = Delaunay.triangulate(points);
          var j = 0;
          for (var i = 0; i < triangles.length - 2; i++) {

             var t1 = [points[triangles[i]][0], points[triangles[i]][1]]; i++;
             var t2 = [points[triangles[i]][0], points[triangles[i]][1]]; i++;
             var t3 = [points[triangles[i]][0], points[triangles[i]][1]];

             var alphaStep = 255/triangles.length;

            var centerX = parseInt((t1[0] + t2[0] + t3[0]) / 3);
            var centerY = parseInt((t1[1] + t2[1] + t3[1]) / 3);




             var c = img.get(centerX,centerY);
             p.fill(c,100);
             p.stroke(c,255);
             j++;
             p.triangle(t1[0],t1[1],t2[0],t2[1],t3[0],t3[1]);
          }
      }

      inc++;
      if(inc >= l){
        inc = 0;
      }

      p.noLoop();
  };

  var setSampler = function(){
    pds.pointList = [];
    pds.maxPoints = 10000;
    pds.radiusMin = 2;
    pds.radiusMax = 30;
    pds.maxFails = 500;
    pds.pi2 = Math.PI * 2;
    pds.w = w;
    pds.h = h;
    pds.distanceMap = null;
    pds.excludeMap = null;
    pds.excludeThreshold = 0;
  };

  p.mouseClicked = function(){
    // p.save('myCanvas.jpg');
  };


};

$( document ).ready(function() {
  var myp5 = new p5(s);
});
