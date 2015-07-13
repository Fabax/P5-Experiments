var s = function( p ) {

  var w = 600;
  var h = 400;
  var points;

  p.setup = function() {
    var myCanvas = p.createCanvas(w, h);
    myCanvas.parent('myContainer');
    points = [
      [200, 200],
      [50, 250],
      [400, 100] /* , ... */
    ];
  };

  p.draw = function() {
    p.background(51);
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      p.ellipse(point[0],point[1],10,10);
    }

    var triangles = Delaunay.triangulate(points);

    for (var i = 0; i < triangles.length - 2; i++) {

       var t1 = [points[triangles[i]][0], points[triangles[i]][1]];
       var t2 = [points[triangles[i+1]][0], points[triangles[i+1]][1]];
       var t3 = [points[triangles[i+2]][0], points[triangles[i+2]][1]];

       p.triangle(t1[0],t1[1],t2[0],t2[1],t3[0],t3[1]);
    }
  };

  p.mouseClicked = function(){
    points.push([p.mouseX,p.mouseY]);
  };

};

$( document ).ready(function() {
  var myp5 = new p5(s);
});
