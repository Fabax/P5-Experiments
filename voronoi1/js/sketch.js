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
    console.log(diagram.cells);
  };

  p.draw = function() {
    p.background(51);
    drawVoronoi2();

  };

  p.mouseClicked = function(){
    addPoint();
  };

  var addPoint = function(){
    sites.push({x : p.mouseX, y : p.mouseY});
    diagram = voronoi.compute(sites, bbox);
  console.log(diagram.cells);
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

  var drawVoronoi2 = function(){
    //draw center point
    for (var i = 0; i < diagram.cells.length; i++) {
      p.push();
      p.noStroke();
      p.randomSeed(i*100);
      p.fill(176,100,28,p.random(0,255));
      p.beginShape();
      var cell = diagram.cells[i];

      if(cell){

        var halfedges = cell.halfedges;
        var nHalfedges = halfedges.length;

        for (var j = 0; j < nHalfedges; j++) {
          var v = halfedges[j].getEndpoint();
          p.vertex(v.x,v.y);
        }

      }

      p.endShape(p.CLOSE);
      p.pop();
    }
  };


};

$( document ).ready(function() {
  var myp5 = new p5(s);
});


		// if (cell) {
		// 	var halfedges = cell.halfedges,
		// 		nHalfedges = halfedges.length;
		// 	if (nHalfedges > 2) {
		// 		// v = halfedges[0].getStartpoint();
		// 		// ctx.beginPath();
		// 		ctx.moveTo(v.x,v.y);
		// 		for (var iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
		// 			v = halfedges[iHalfedge].getEndpoint();
		// 			ctx.lineTo(v.x,v.y);
		// 			}
		// 		ctx.fillStyle = '#faa';
		// 		ctx.fill();
		// 		}
		// 	}
		// // draw sites
		// var site;
		// ctx.beginPath();
		// ctx.fillStyle = '#44f';
		// while (nSites--) {
		// 	site = sites[nSites];
		// 	ctx.rect(site.x-2/3,site.y-2/3,2,2);
		// 	}
		// ctx.fill();
		// },
