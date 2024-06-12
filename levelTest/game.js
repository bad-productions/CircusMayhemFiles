document.addEventListener('contextmenu', event => event.preventDefault());
let tiles=[]
let collison=[]
let customColl={};
let pwidth=30;
let pheight=60;
let plx=0;
let ply=0;
let player;
let ope=true;
let textures={};
let game;
let levelSelected=0;
let tileSize=40*sizeScale;
let canvasScale;
let canvasScaling={scaledWidth:0,scaledHeight:0,offsetX:0,offsetY:0}
let mousePos={x:0,y:0}
let charactorsSpawned=false;
let players=[];
let Classes=[];
let startPoint=[0,0]
let textureSelect;
let Funcs=["Air","Solid","Hit","End"]
function gamePreload(){
    textures.Air=createImage(1,1)
    textures.Crate=loadImage("Crate.png")
    textures.Spike=loadImage("spike.gif")
    textures.ShinyCrate=loadImage("ShinyCrate.gif")
    
}
function gameSetup(playerCount) {
//  for(let i=0;i<10;i++){
//  Classes.push(new Bug(200,200))}
    
  if (config.MaxFrameRate){
      frameRate(config.MaxFrameRate)
      console.log("Max frame rate set")
  }
//  checkbox = createCheckbox('white');
//  checkbox.position(0, 100);
  
  game=createGraphics(600*sizeScale,400*sizeScale)
//  Notifier=new Notification(Icons.Notifiy.Alert,"Loading options","loading...",0,1)
  Notifier.StayUp=0
  console.log(Object.keys(textures))
  game.background(40)
  for (i=0;i<15*10;i++){
        tiles.push(0)
        collison.push(0)
  }
  loadTheFuckingLevel()
  for (i=0;i<playerCount;i++){players.push(new Player([1,1,1,1],startPoint))}

}

function checkColl(x,y,w,h){
    let output=[]
    for (i=0;i<collison.length;i++){
        if (collison[i]==1){
            px=((i%15)*(40*sizeScale))+(20*sizeScale)
            py=(Math.floor(i/15)*(40*sizeScale))+(20*sizeScale)
            if (Math.abs(px-x)<(20*sizeScale)+(w/2)&&Math.abs(py-y)<(20*sizeScale)+(h/2)){
                output.push(i)
        }}
        
}
    return output
}
function gameKeyPressed(){
    if (key==" "&players[0].canJump){
        players[0].canJump=false
        players[0].velocity.y=-11
    }
}
function gameDraw() {
    Classes=levelLoader.classes[levelSelected]
    tiles=levelLoader.tileMaps[levelSelected]
    collison=levelLoader.collMaps[levelSelected]
    deltaTime=60/frameRate()
    mousePos.x=(mouseX-canvasScaling.offsetX)/(canvasScaling.scaledWidth/game.width)
    mousePos.y=(mouseY-canvasScaling.offsetY)/(canvasScaling.scaledHeight/game.height)
    if (deltaTime>10){
        deltaTime=1
    }
    game.clear()
    game.background(40)
//    print(Classes[0].constructor.name)
    game.fill(255)
    game.rectMode(CORNER)
    if (config.showGrid){
    for (i=0;i<15;i++){
        game.line(i*40*sizeScale,0,i*40*sizeScale,game.height)
    }
    for (i=0;i<10;i++){
        game.line(0,i*40*sizeScale,game.width,i*40*sizeScale)
    }
    }
    renderTiles()
    game.rectMode(CENTER)
    game.fill(255,0,0)
    if (ope){
    for (i=0;i<players.length;i++) players[i].frameUpdate();
    for (i=0;i<levelLoader.classes[levelSelected].length;i++) levelLoader.classes[levelSelected][i].display(false);
    }
    else{
         for (i=0;i<Classes.length;i++) Classes[i].display();
    }
    plx=mouseX
    ply=mouseY
    if (config.animationTester){
    if (animationLoaded){
        if (frameCount%(60/10)==0){
        game.image(testAnimation.UpdateFrame(),0,0)
        }
        else{
            game.image(testAnimation.GetFrame(),0,0)
        }
    }
        }
    
//    image(game,0,0)
    if (config.ShowFps){
      game.textAlign(RIGHT)
      game.textSize(10*sizeScale)
      game.fill(255)
      game.text('FPS:'+Math.round(frameRate()),game.width, 10*sizeScale);
    }
    
    if (config.ShowDeltaTime){
      game.textAlign(RIGHT)
      game.textSize(10*sizeScale)
      game.fill(255)
      game.text('DeltaTime:'+Math.round(deltaTime*100)/100,game.width, 20*sizeScale);
        
    }
    resizeAndDraw()

    }
function resizeAndDraw(){
  let canvasAspect = width / height;
  let gameAspect = game.width / game.height;

  // Calculate the scaled width and height while maintaining aspect ratio
  if (canvasAspect > gameAspect) {
    canvasScaling.scaledHeight = height;
    canvasScaling.scaledWidth = game.width * (height / game.height);
  } else {
    canvasScaling.scaledWidth = width;
    canvasScaling.scaledHeight = game.height * (width / game.width);
  }

  // Center the game graphics on the canvas
  canvasScaling.offsetX = (width - canvasScaling.scaledWidth) / 2;
  canvasScaling.offsetY = (height - canvasScaling.scaledHeight) / 2;

  // Draw the game graphics on the canvas with the calculated size
  image(game, canvasScaling.offsetX, canvasScaling.offsetY, canvasScaling.scaledWidth, canvasScaling.scaledHeight);

}
function renderTiles(){
    for (ix=0;ix<15;ix++) {
        for (iy=0;iy<10;iy++) {
            tileid=(iy*15)+ix
            if (0<tiles[tileid]){
                game.image(textures[Object.keys(textures)[tiles[tileid]]],ix*40*sizeScale,iy*40*sizeScale,40*sizeScale,40*sizeScale)
            }
        }
    }
}
function getPosition(x,y){
    return {x:Math.round((x-(20*sizeScale))/(40*sizeScale))*(40*sizeScale),y:Math.round((y-(20*sizeScale))/(40*sizeScale))*(40*sizeScale)}
}
function getPositionTile(x,y){
    return {x:Math.round((x-(20*sizeScale))/(40*sizeScale)),y:Math.round((y-(20*sizeScale))/(40*sizeScale))}
}
function getIndexOfTile(x,y){
    return(getPositionTile(x,y).y*15)+getPositionTile(x,y).x
}
function gameMousePressed(){
    
}