var s = function( p ) {

  /*
  Mitchell's Best Candidate is an algorithm that can be used to visualize how the human eye samples light to percieve image. Each dot is photoreceptive sample with recieves light. Mitehll's best candidate is meant to produce an even distribution of dots, despite being random.

  Mitchell's algorithm works through a simple and elegant process. Every dot, on the screen is considered a sample. After the first dot is created randomly, 10 (an arbitrary number) other dots, called candidates, run for election to become the next sample.The best candidate is considered to be the dot that is farthest away from all the other samples on the screen.This can be done by getting the distance between every candidate and their closest samples, and seeing which candidate has the largest distance. This best-candidate becomes the new sample, and the process begins again.

  The top half of the screen contains the Mitchell's Best Candidate algorithm, while the lower half simply contains uniform random sampling (just calls the Math.random() function for each dot).

  Source: http://bost.ocks.org/mike/algorithms/?utm_source=pocket&utm_medium=email&utm_campaign=pockethits
  */

  var dotLimit = 1000; //change this to increase number of dots
  var speed = 50; //change this to make dots appear faster or slower (max speed is 255)

  var a = 255; //alpha value
  var w = 600;
  var h = 500;
  //current candidates
  var currentCandidateX;
  var currentCandidateY;

  //list of samples in Mitchell's algorithm(black dots)
  var samples = [];

  var numberOfPoints = 0;

  var randomWidth = function(){ //generates random width for dot
      return Math.random(0,1) * w;
  };

  var randomHeight = function(){ //generates random height for dot (upper half)
      return Math.random(0,1) * (h/2 + -5);
  };

  var randomHeight2 = function(){ //generates random height for dot (lower half)
      return (h/2 + 5) + randomHeight();
  };

  var currentX = randomWidth();
  var currentY = randomHeight();

  var currentRandomX = randomWidth();
  var currentRandomY = randomHeight2();

  p.setup = function(){
      var myCanvas = p.createCanvas(w, h);
      myCanvas.parent('myContainer');
      p.strokeWeight(3);
      p.smooth();
  };

  p.draw = function() {

      p.stroke(a, a, a);
      p.strokeWeight(5);

      p.point(currentX,currentY);
      p.point(currentRandomX,currentRandomY);

      samples.push([currentX,currentY]);

      numberOfPoints++;

          if(a > 0){
            a -= speed; //dots fade in
          } else{
              a = 255;
              currentRandomX = randomWidth();
              currentRandomY = randomHeight2();

              var largest = null; //largest distance for all candidates

              for(var i = 0; i < 10; i++){ /*generates candidates and finds one farthest                                             from surrounding samples */

                  currentCandidateX = randomWidth();
                  currentCandidateY = randomHeight();

                  var distance = findClosest();

                  if(largest === null || distance > largest){
                      largest = distance;
                      currentX = currentCandidateX;
                      currentY = currentCandidateY;

                  }
              }
          }



          if(numberOfPoints > dotLimit){
              p.noLoop();
          }
  };



  var findClosest = function(){ /*searches through list of points and finds point closest to current candidate*/
      var smallest = null;
      var index = 0;
      for(var i = 0; i < samples.length; i++){
          //distance formula, separated into different variables for readability
          var one = Math.pow(currentCandidateX - samples[i][0],2);
          var two = Math.pow(currentCandidateY - samples[i][1],2);
          var distance = Math.sqrt(one + two);
          if(smallest === null || distance < smallest){
              smallest = distance;
              index = i;
          }
      }
      return smallest;
  };

  var drawScreen = function(){
      for(var i = 0; i < samples.length; i++){
          point(samples[i][0], samples[i][1]);
      }
  };








};

$( document ).ready(function() {
  var myp5 = new p5(s);
});
