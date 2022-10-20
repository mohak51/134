song="";
status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}

function preload(){
    song = loadSound("Alert.mp3");
}

function draw(){
    image(video, 0, 0, 380, 380);

    if (status != ""){
        objectDetector.detect(video, gotResult);

        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0; i<objects.length; i++){
            if(status == "person"){
            song.stop();
            document.getElementById("status").innerHTML = "Status: Baby Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects are: " + objects.length;
            fill(r, g, b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            } else{
                document.getElementById("status").innerHTML = "Status: Baby Detected";
                song.play();
            }
        }
    } 
}

function modelLoaded(){
    console.log("ModelLoaded");
    
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    } else{
        console.log(results);
        objects=results;
    }
}