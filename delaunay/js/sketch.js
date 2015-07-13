var s = function( p ) {

  var w = 600;
  var h = 400;
  var points;
  var triangles;

  // noise
  var yoff = 0.0;
  var xoff = 0;
  var cols = 10;
  var rows = 10;

  var colStep = w/cols;
  var rowStep = h/rows;


  p.setup = function() {
    var myCanvas = p.createCanvas(w, h);
    myCanvas.parent('myContainer');
    points = new Array();
    drawGrid();
  };

  p.draw = function() {
    p.background(200);
    if(points != null){
        triangles = Delaunay.triangulate(points);
        var j = 0;
        for (var i = 0; i < triangles.length - 2; i++) {

           var t1 = [points[triangles[i]][0], points[triangles[i]][1]]; i++;
           var t2 = [points[triangles[i]][0], points[triangles[i]][1]]; i++;
           var t3 = [points[triangles[i]][0], points[triangles[i]][1]];

           var alphaStep = 255/triangles.length;
           p.fill(23,72,alphaStep*j,100);
           p.stroke(23,72,alphaStep*j,255);
           j++;
           p.triangle(t1[0],t1[1],t2[0],t2[1],t3[0],t3[1]);
        }
    }

  };

  p.mouseClicked = function(){
    points.push([p.mouseX,p.mouseY]);
  };

  var drawGrid = function(){
    for (var i = 0; i <= cols; i++) {
      for (var j = 0; j <= rows; j++) {
        var x = (i*colStep);
        var y = (j*rowStep);
        points.push([x,y]);
      }
    }
  };






};

$( document ).ready(function() {
  var myp5 = new p5(s);
});
