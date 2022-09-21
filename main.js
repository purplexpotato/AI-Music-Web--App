song1=""
song2=""

leftwristx=0
leftwristy=0

rightwristx=0
rightwristy=0

scoreleft=0
scoreright=0

play=""
play2=""
function preload() {
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}
function setup() {

    canvas= createCanvas(300,300)
    canvas.center()
    video=createCapture(VIDEO)
video.hide()
posenet=ml5.poseNet(video,modelloaded)
posenet.on("pose",gotposes)
}
function draw() {
    image(video,0,0,300,300)
    fill("red")
    stroke("black")
    play= song1.isPlaying()
    play2_status= song2.isPlaying()
    if (scoreleft>0.2) {
        circle(leftwristx,leftwristy,20)
        song2.stop()
        if (song1=false) {
            song1.play()
            document.getElementById("song").innerHTML="song+"+song1
        }
    }
    if (scoreright>0.2) {
        circle(rightwristx,rightwristy,20)
        song1.stop()
        if (song2=false) {
            song2.play()
            document.getElementById("song").innerHTML="song+"+song2
    } 
}   
}   
function modelloaded() {
    console.log("modelloaded")
}
function gotposes(result) {
    if (result.length>0) {
        console.log(result)
        rightwristx=result[0].pose.rightWrist.x
        rightwristy=result[0].pose.rightWrist.y
        leftwristx=result[0].pose.leftWrist.x
        leftwristy=result[0].pose.leftWrist.y
        console.log("rightwristx "+rightwristx+"rightwristy "+rightwristy)
        console.log("leftwristx "+leftwristx+"leftwristy "+leftwristy)
        scoreleft=result[0].pose.keypoints[9].score
        console.log("scoreleft="+scoreleft)
        scoreright=result[0].pose.keypoints[10].score
        console.log("scoreright="+scoreright)
    }
}