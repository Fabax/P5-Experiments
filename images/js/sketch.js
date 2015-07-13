var s = function( p ) {

  var w = 286*2;
  var h = 176*2;

  //image
  var img;
  var threshold = 80;

  //delaunay
  var points;
  var pixelPosition;

  p.preload = function(){
    img = p.loadImage('images/dog.jpg');
  };

  p.setup = function() {
    var myCanvas = p.createCanvas(w, h);
    myCanvas.parent('myContainer');
    points = new Array();
    pixelPosition = new Array();
  };

  p.draw = function() {
     p.image(img, 0, 0,w,h);
     imageManipulation();
     p.noLoop();
  };


  var imageManipulation = function(){

    for (var i = 0; i < w; i++) {
      for (var j = 0; j < h; j++) {
        pixelPosition.push([i,j]);
      }
    }

    var inc = 15;

    for (var i = 0; i < pixelPosition.length-inc; i+=inc) {
      var c = img.get(pixelPosition[i][0],pixelPosition[i][1]);
      p.fill(c);
      var brightness = p.brightness(c);
      //  console.log(brightness);
      if(brightness <= threshold){
        p.noStroke();
        // p.ellipse(pixelPosition[i][0]*2,pixelPosition[i][1]*2,2,2);
        var r = parseInt(p.random(0,3));
        if(r === 0){
          points.push([pixelPosition[i][0]*2,pixelPosition[i][1]*2]);
        }

      }
    }

    if(points != null){
        triangles = Delaunay.triangulate(points);


        for (var i = 0; i < triangles.length - 2; i++) {

           var t1 = p.createVector(points[triangles[i]][0], points[triangles[i]][1],0); i++;
           var t2 = p.createVector(points[triangles[i]][0], points[triangles[i]][1],0); i++;
           var t3 = p.createVector(points[triangles[i]][0], points[triangles[i]][1],0);

           var c = img.get(points[triangles[i]][0]/2,points[triangles[i]][1]/2);


           var d1 = p.dist(t1.x,t1.y,t2.x,t2.y);
           var d2 = p.dist(t2.x,t2.y,t3.x,t3.y);
           var d3 = p.dist(t1.x,t1.y,t3.x,t3.y);

           p.fill(c);
           p.noStroke();

           if(d1 <=50 && d2 <=50 && d3 <=50){
             p.triangle(t1.x,t1.y,t2.x,t2.y,t3.x,t3.y);
           }


        }
    }

  };

};

$( document ).ready(function() {
  var myp5 = new p5(s);
});
