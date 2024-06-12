
class Player {
    constructor(Stats,startPoint=[0,0],controllerMap={jump:32,walk_left:65,walk_right:68}) {
        this.px = startPoint[0]*sizeScale;
        this.py = startPoint[1]*sizeScale;
        this.velocity={x:0,y:0}
        this.canJump=false
        this.canWallJump=false;
        this.isHit=false
        this.hitHandler={stun:0,safe:0}
        this.controller=controllerMap
        this.Stats={spd:Stats[0],mas:Stats[1],jmp:Stats[2],str:Stats[3]}
        this.AniDat={facing:1,walking:0,falling:0,jumping:0,punching:0}
    }
getPositionTile(x,y){
    return {x:Math.round((x-(20*sizeScale))/(40*sizeScale)),y:Math.round((y-(20*sizeScale))/(40*sizeScale))}
}
getIndexOfTile(x,y){
    return (getPositionTile(x,y).y*15)+getPositionTile(x,y).x
}
    checkColl(inx,iny,w=30*sizeScale,h=60*sizeScale){
    let output=[]
    let output2=[]
    let x=inx*sizeScale
    let y=iny*sizeScale
    let px;
    let py;
    if (config.OptimizeCollisions){
    let startInd=getIndexOfTile(x-(80*sizeScale),y-(80*sizeScale))
    let endInd=getIndexOfTile(x+(80*sizeScale),y+(80*sizeScale))
    thingX=startInd
    thingY=endInd
    for (i=startInd;i<endInd;i++){
        if (collison[i]==1){
            px=((i%15)*(40*sizeScale))+(20*sizeScale)
            py=(Math.floor(i/15)*(40*sizeScale))+(20*sizeScale)
            if (Math.abs(px-x)<(20*sizeScale)+(w/2)&&Math.abs(py-y)<(20*sizeScale)+(h/2)){
                output.push(i)
            }
        }
        else if(0<collison[i]){
            px=((i%15)*(40*sizeScale))+(20*sizeScale)
            py=(Math.floor(i/15)*(40*sizeScale))+(20*sizeScale)
            if (Math.abs(px-x)<(20*sizeScale)+(w/2)&&Math.abs(py-y)<(20*sizeScale)+(h/2)){
                output2.push(Funcs[collison[i]])
            }
        }
        
}
}
else{
        for (i=0;i<collison.length;i++){
        if (collison[i]==1){
            px=((i%15)*(40*sizeScale))+(20*sizeScale)
            py=(Math.floor(i/15)*(40*sizeScale))+(20*sizeScale)
            if (Math.abs(px-x)<(20*sizeScale)+(w/2)&&Math.abs(py-y)<(20*sizeScale)+(h/2)){
                output.push(i)
        }
        }
        else if(0<collison[i]){
            px=((i%15)*(40*sizeScale))+(20*sizeScale)
            py=(Math.floor(i/15)*(40*sizeScale))+(20*sizeScale)
            if (Math.abs(px-x)<(20*sizeScale)+(w/2)&&Math.abs(py-y)<(20*sizeScale)+(h/2)){
                output2.push(collison[i])
        }
        }
        
}
}
    for (let i=0;i<Classes.length;i++){
        
        if (Classes[i].collideData.trigger=="Solid"){
            px=Classes[i].x
            py=Classes[i].y
            let tarW=Classes[i].collideData.width/2
            let tarH=Classes[i].collideData.height/2
            if (Math.abs(px-x)<(tarW*sizeScale)+(w/2)&&Math.abs(py-y)<(tarH*sizeScale)+(h/2)){
                output.push(Classes[i])
            }
        }
        else{
            px=Classes[i].x
            py=Classes[i].y
            let tarW=Classes[i].collideData.width/2
            let tarH=Classes[i].collideData.height/2
            if (Math.abs(px-x)<(tarW*sizeScale)+(w/2)&&Math.abs(py-y)<(tarH*sizeScale)+(h/2)){
                output2.push(Classes[i].collideData.trigger)
            }
        }
    }
        if (!this.checkLevelMove(x,y)){
            output.push(0)
        }
//    if (<x<)
    return {Solids:output,Other:output2}
}
    checkLevelMove(inx,iny){
        if(inx<0){
            console.log("problem")
            if (levelLoader.levelMap[levelSelected].w){            console.log("test:"+levelLoader.levelMap[levelSelected].w)
            levelSelected=levelLoader.levelIds[levelLoader.levelMap[levelSelected].w]
            this.px=sizeScale*600-inx}else{return false};
            
        }
        else if(inx>sizeScale*600){
            console.log("problem1")
            if (levelLoader.levelMap[levelSelected].e){            console.log("test:"+levelLoader.levelMap[levelSelected].e)
            levelSelected=levelLoader.levelIds[levelLoader.levelMap[levelSelected].e]
            this.px=inx-sizeScale*600}else{return false};

            
        }
        else if(iny<0){
            console.log("problem2")
            if (levelLoader.levelMap[levelSelected].n){            console.log("test:"+levelLoader.levelMap[levelSelected].n)
            levelSelected=levelLoader.levelIds[levelLoader.levelMap[levelSelected].n]
            this.py=sizeScale*400-iny}else{return false};
            
        }
        else if(iny>sizeScale*400){
            console.log("problem3")
            if (levelLoader.levelMap[levelSelected].s){            console.log("test:"+levelLoader.levelMap[levelSelected].s)
            levelSelected=levelLoader.levelIds[levelLoader.levelMap[levelSelected].s]
            this.py=iny-sizeScale*400}else{return false};
            
        }
        return true
    }
    renderMe(){
        game.rect(this.px*sizeScale,this.py*sizeScale,30*sizeScale,60*sizeScale)
    }
    frameUpdate() {
        let frameCheck=frameCount
        
        if (this.checkColl(this.px,this.py).Other.length>0){
            if(!this.isHit){
                this.isHit=true
                this.stun=millis()+1000
                print(millis()+1000)
                this.velocity.x=Math.random()*10
                this.velocity.y=Math.random()*10-5
                Notifier.Reset(Icons.Notifiy.Alert,"Ouch","that kinda hurt i guess",0,true)
            }
        }
        else{
            Notifier.StayUp=false
            this.isHit=false
        }
        if (this.hitHandler.stun-millis()<0.1){
        for (let U=0;U<Math.round(deltaTime);U++){
        if (!keyIsDown(this.controller.jump)){
            this.canWallJump=true
        }
        if (this.checkColl(this.px,this.py+(this.velocity.y)).Solids.length==0){
            this.py+=this.velocity.y

            if (this.velocity.y<10){
            this.velocity.y+=1}
            
        }
        else{
            
            if (this.velocity.y>0){
                this.canJump=true
            }
            this.velocity.y=0
        }
        if (this.checkColl(this.px+(this.velocity.x),this.py).Solids.length==0){
            this.px+=this.velocity.x
            
        }
        else{
            this.velocity.y=0.5;
            this.velocity.x=0;
            if (keyIsDown(this.controller.jump)&&this.canWallJump){
                this.canWallJump=false
                if (this.checkColl(this.px-10,this.py).Solids.length==0){
                    this.velocity.y=-15
                    this.velocity.x=-15
                }
                else{
                    this.velocity.y=-15
                    this.velocity.x=15
                }
            }
        }
        
        
        if (this.canJump){
                    if (keyIsDown(this.controller.walk_right)&&Math.abs(this.velocity.x)<10){
            this.velocity.x+=1
        }
        else if (keyIsDown(this.controller.walk_left)&&Math.abs(this.velocity.x)<10){
            this.velocity.x-=1
        }
        else{
            this.velocity.x*=0.85
        }
        }
        else{
        if (keyIsDown(this.controller.walk_right)&&Math.abs(this.velocity.x)<10){
            this.velocity.x+=0.2
        }
        else if (keyIsDown(this.controller.walk_left)&&Math.abs(this.velocity.x)<10){
            this.velocity.x-=0.2
        }
        else{
            this.velocity.x*=0.9
        }
        }

        
    }
        }
    this.renderMe()
    }
}