var s = function( p ) {
  var w = 600;
  var h = 400;
  var l;
  var pds;
  var inc = 0;

  p.setup = function(){
      var myCanvas = p.createCanvas(w, h);
      myCanvas.parent('myContainer');
      pds = new PoissonDiskSampler();
      setSampler();

      pds.createPoints();
      l = pds.pointList.length;
      console.log(l);


  };

  p.draw = function() {
    p.background(51);

      for (var i = 0; i < inc; i++) {
        var point = pds.pointList[i];
        p.ellipse(point.x,point.y,point.r, point.r);
      }

      inc++;
      if(inc >= l){
        inc = 0;
      }
  };

  var setSampler = function(){
    pds.pointList = [];
    pds.maxPoints = 1000;
    pds.radiusMin = 2;
    pds.radiusMax = 20;
    pds.maxFails = 500;
    pds.pi2 = Math.PI * 2;
    pds.w = w;
    pds.h = h;
    pds.distanceMap = null;
    pds.excludeMap = null;
    pds.excludeThreshold = 0;
  };


};

$( document ).ready(function() {
  var myp5 = new p5(s);
});
