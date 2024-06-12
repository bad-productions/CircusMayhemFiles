class Bug {
    constructor(x, y,facing=Math.round(Math.random()),speed=Math.round(Math.random()*100)/100+0.2) {
        this.x = x;
        this.y = y;
        if (facing==1){
            this.facing=1;
        }
        else{
            this.facing=-1;
        }
        
        this.diameter=30
        this.speed=speed
        this.collideData={width:30,height:30,trigger:"Hit"}
    }

    display(Freeze=true) {
        if (!Freeze){
        if (this.checkColl(this.x,this.y+5,this.diameter*sizeScale,this.diameter*sizeScale).Solids.length==0){
            this.y+=5
        }
        if (this.checkColl(this.x+this.facing*this.speed,this.y,this.diameter*sizeScale,this.diameter*sizeScale).Solids.length==0){
            this.x+=this.facing*this.speed
        }
        else {
            this.facing*=-1
        }
        }
        game.push()
        game.fill(255,0,0)
        game.square(this.x*sizeScale, this.y*sizeScale, this.diameter*sizeScale,)
        game.pop()
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
            for (let i=startInd;i<endInd;i++){
                if (collison[i]==1){
                    px=((i%15)*(40*sizeScale))+(20*sizeScale)
                    py=(Math.floor(i/15)*(40*sizeScale))+(20*sizeScale)
                    if (Math.abs(px-x)<(20*sizeScale)+(w/2)&&Math.abs(py-y)<(20*sizeScale)+(h/2)){
                        output.push(i)
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
        if (x+(w/2)>600){
            output.push(0)
        }
        if (x-(w/2)<0){
            output.push(0)
        }
        return {Solids:output,Other:output2}
    }
}