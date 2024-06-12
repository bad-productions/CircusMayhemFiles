let launcher={GameStarted:false}
let Notifier;
let testDude;
let Icons={};
let testLevel;
function setup(){
    createCanvas(windowWidth,windowHeight)
    background(0)
    Notifier=new Notification(Icons.Notifiy.Alert,"I'm lazy af","don't try using this program :)")
    launcher.GameStarted=true;
    gameSetup(1)


}
function preload(){
    gamePreload()
    Icons.Notifiy={}
    testLevel=loadJSON("testLevel.json")
    Icons.Notifiy.Alert=loadImage("Notifiy.png")
    Icons.Notifiy.Trophy=loadImage("achivement.png")
}
function windowResized() {
  resizeCanvas(windowWidth-16, windowHeight-16);
  background(0)
}
function draw(){
    background(0)
    if (launcher.GameStarted){
        gameDraw()
    }
  Notifier.display()
  image(Notifier.Canvas,width-200,height-50,200,50);
}
function mousePressed(){
    if (launcher.GameStarted){
        gameMousePressed()
    }
}
function keyPressed(){
    if (launcher.GameStarted){
        gameKeyPressed()
    }
}
