var s = function( p ) {

  var w = 600;
  var h = 400;

  //Voronoi
  var diagram;
  var voronoi;
  var bbox;
  var sites;


  p.setup = function() {
    var myCanvas = p.createCanvas(w, h);
    myCanvas.parent('myContainer');
    setUpVoronoi();
  };

  p.draw = function() {
    p.background(51);
    drawVoronoi();

  };

  p.mouseClicked = function(){
    addPoint();
  };

  var addPoint = function(){
    sites.push({x : p.mouseX, y : p.mouseY});
    diagram = voronoi.compute(sites, bbox);
  };

  var setUpVoronoi = function(){
    voronoi = new Voronoi();
    bbox = {xl: 0, xr: w, yt: 0, yb: h};
    sites = [
      {x: 200, y: 200},
      {x: 50, y: 250},
      {x: 400, y: 100} /* , ... */
    ];

    diagram = voronoi.compute(sites, bbox);
  };

  var drawVoronoi = function(){
    //draw center point
    for (var i = 0; i < sites.length; i++) {
      p.fill(255);
      p.ellipse(sites[i].x,sites[i].y,2,2);
    }

    //draw lines
    for (var i = 0; i < diagram.edges.length; i++) {
      p.fill(255,100,100);
      p.stroke(255);
      p.strokeWeight(0.2);
      p.line(diagram.edges[i].va.x,diagram.edges[i].va.y,diagram.edges[i].vb.x,diagram.edges[i].vb.y);
    }
  };

};

$( document ).ready(function() {
  var myp5 = new p5(s);
});
