img="";
status="";
object= [];
function setup(){
 canvas= createCanvas(380,380);
 canvas.center();
 video= createCapture(VIDEO);
 video.size(380,380);
 video.hide();
}

function start(){
  objectDetector= ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML= "Status :- Detecting objects";
}

function preload(){
    img= loadImage("dog_cat.jpg"); 
}

function draw(){
    image(video, 0,0, 380,380); 
   
    if(status != "")
    {
      r=random(255);
      g=random(255);
      b=random(255);
      objectDetector.detect(video, gotResult);
      for(i =0; i< object.length; i++)
      {
        document.getElementById('status').innerHTML= "Object is detected";
        document.getElementById('number_of_objects').innerHTML= "Number of objects detected are " + objects.length;
        fill(r,g,b);
        percent= floor(object[i].confidence*100);
        text(object[i].label + "    " + percent + "%", object[i].x, object[i].y - 5);
        noFill();
        stroke(r,g,b);
        rect(object[i].x , object[i].y, object[i].width, object[i].height);
      }
    }
}

function modelLoaded(){
console.log('Model Loaded');
status= true;
objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
  if(error){
    console.log(error);
  }
  else{
  console.log(results);
  object= results;
  }
}