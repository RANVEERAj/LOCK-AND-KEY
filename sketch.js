var gameState = "Select";
var form;
var mouse
var mapCounter = 0
var maptxt
var flag


function preload(){
  heart = loadImage("Images/heart.png")
  bgimg=loadImage("Images/backyard.jpg")
  level1Img=loadImage("Images/level1.jpg")
  lockimg=loadImage("Images/lock.png")
  backyardimg=loadImage("Images/r3.png")

  key1img=loadImage("Images/key1.png")
  key2img=loadImage("Images/KEY2.png")
  key3img=loadImage("Images/KEY3.png")
  key4img=loadImage("Images/key0.png")

  map1Img=loadImage("Images/map.png")
  map2Img=loadImage("Images/map2.png")
  map3Img=loadImage("Images/map3.png")
  
  fourImg=loadImage("Images/4.png")
  oneImg=loadImage("Images/1.png")
  hatimg=loadImage("Images/hat.png")
  threeImg=loadImage("Images/3.png")
  lockop=loadImage("Images/lockop.png")

  header = loadImage("Images/header.png")
  key5=loadImage("Images/key5.png")
  
  bckscore = loadSound("Sounds/background_music.wav")
  countdown = loadSound("Sounds/Traditional_ticktok.wav")
}


function setup(){
  //create Canvas
  var canvas = createCanvas(displayWidth,displayHeight);
  
  
  //create a game 
  
  form = new Form()
  
  
  header1 = createSprite(width/2,220)
  header1.addImage(header)
  header1.visible = false
  
  spy=createSprite(400,height-200,50,50)
  spy.visible=false
   
  mapGroup = createGroup()
  mapSprite1=createSprite(displayWidth-767,height/1.3)
  mapSprite1.addImage(map1Img)
  mapSprite1.scale=0.1
  mapSprite1.visible=false
  mapSprite1.mirrorX=1

  mapSprite2=createSprite(displayWidth-436,displayHeight-565)
  mapSprite2.addImage(map2Img)
  mapSprite2.scale=0.04
  mapSprite2.visible=false

  mapSprite3=createSprite(displayWidth-112,displayHeight/2 -46)
  mapSprite3.addImage(map3Img)
  mapSprite3.scale=0.09
  mapSprite3.visible=false
  
  
  mapGroup.add(mapSprite1) 
  mapGroup.add(mapSprite2) 
  mapGroup.add(mapSprite3) 
  
  braic=createSprite(width-100,50)
  braic.addImage(lockop)
  braic.scale=0.6
  braic.visible=false
  
  key=createSprite(width-1338,height-50)
  key.addImage(key5)
  key.scale=0.24
  key.visible=false
  

  key2=createSprite(width-147,height-60)
  key2.addImage(key2img)
  key2.scale=0.05
  key2.visible=false

  key3=createSprite(displayWidth-590,height-100)
  key3.addImage(key3img)
  key3.scale=0.1
  key3.visible=false

  key4=createSprite(width-829,height-250)
  key4.addImage(key4img)
  key4.scale=0.17
  key4.visible=false
  
  keyGroup = createGroup()
  keyGroup.add(key)
  keyGroup.add(key2)
  keyGroup.add(key3)
  keyGroup.add(key4)
  
  hat=createSprite(width-1420,height-50)
  hat.addImage(hatimg)
  hat.scale=0.13
  hat.visible=false
  hat.rotation=360
  
  hatGroup = createGroup()
  hatGroup.add(hat)
  
  life1=  createSprite(width-50,100,100,100)
  life1.visible = false
  life1.addImage(heart)
  life1.scale = 0.1

  life2=  createSprite(width-100,100,100,100)
  life2.visible = false
  life2.addImage(heart)
  life2.scale = 0.1
  
  lock=createSprite(width-199,height-412,40,40)
  lock.addImage(lockimg)
  lock.scale=0.2;
  lock.visible = false
  
  bckscore.loop()
  
  sbbutton2 = createButton('Stop Sound');
  sbbutton2.position(20,height-100)
  sbbutton2.size(60,40)
  sbbutton2.mousePressed(stopSound)
  
}

function draw(){
 
   if( gameState==="Select"){  
    image(bgimg,0,0,displayWidth,displayHeight) 
     
    form.display()
   }
  
   if( gameState==="level1"){
      background(level1Img)  
      textSize(20)
      fill ("yellow")
      text("TO UNLOCK THE DOOR ,CRACK THE CODE,Press the lock",200,200)
      lock.visible = true
      header1.visible = false
      if(mousePressedOver(lock)){
       lock.visible = false
       backyard()
       lock.destroy()
      }
     
      form.hide()
       //display the lock 
      
      
      if(keyDown("Right")){
          spy.x+=10
      }      
      if(keyDown("Left")){
          spy.x-=10
      }    
      if(keyDown("Up")){
          spy.y+=10
      }      
      if(keyDown("Down")){
          spy.y-=10
      }
    }
    else if(gameState==="backyard"){
      
      background(backyardimg)
      bckscore.stop()
      textSize(24)
      fill('#03a2e7');
      text('Find Object to Unlock code before the hearts pops',0,20)
      text(mouseX+","+mouseY,mouseX,mouseY) 
      
      if(mapGroup.length!== 0){
     
        textSize(24)
        fill('#03a2e7');
        text('Clue:Find Maps',0,70)
        findMaps()
        
      }
      if(mapGroup.length===0&&keyGroup.length){
        textSize(24)
        fill('#03a2e7');
        text('Clue:Find Keys',0,70)
         key.visible=true
         key2.visible=true
         key3.visible=true
         key4.visible=true
         findKeys()
      }
      if(mapGroup.length===0&&keyGroup.length===0&&hatGroup.length){
        textSize(24)
        fill('#03a2e7');
        text('Clue:Find Hats',0,70)
        hat.visible = true
        findHats()
      }
      if(hatGroup.length===0 && flag === "complete"){
        gameState = "Level2"
      }
      
      if(life1.lifetime===0 && life2.lifetime===0){
        countdown.stop()
        image(bgimg,0,0,displayWidth,displayHeight) 
       // background('#03a2e7')
        
        tryagain = createElement('h1', 'No lifes left ,Try Again')
        tryagain.style('color', '#03a2e7');
        tryagain.position(width/2,height/2);
      
        hatGroup.destroyEach()
        keyGroup.destroyEach()
        mapGroup.destroyEach()
        
      }
     
      if (gameState === "Level2"){
          countdown.stop()
          background(level1Img)
          button3 = createButton('Level 2');
          button3.position(width/2-60,height-130)
          button3.size(100,60)
          button3.style('backgroundColor', '#03a2e7'); 
          life1.lifetime = -1
          life2.lifetime = -1
          textSize(23)
          fill("yellow")
          text("CODE UNLOCKED,FIND HOSTAGE",width/2-100,100)
      }
  }
   drawSprites()
}

function backyard(){
  countdown.loop()
  gameState = "backyard"
  
  console.log("yes")
  life2.visible = true
  life1.visible = true
  mapSprite1.visible= true
  mapSprite2.visible=true
  mapSprite3.visible=true
  braic.visible = true
  life1.lifetime = 1000
  life2.lifetime = 2000
}
function findMaps(){
    
    if(mousePressedOver(mapSprite1)){
     
      mapSprite1.destroy()
    }
    if(mousePressedOver(mapSprite2)){
     
      mapSprite2.destroy()
    }
    if(mousePressedOver(mapSprite3)){
     
      mapSprite3.destroy()
      
    }
  
    if(mapGroup.length === 0){
      one=createSprite(width/2,height/2,20,20)
      one.x=width-160
      one.y=50
      one.scale=0.1
      one.addImage(threeImg)
    }
}

function findKeys(){
    if(mousePressedOver(key)){
       
        key.destroy()
    }
    if(mousePressedOver(key2)){
      
      key2.destroy()
    }
    if(mousePressedOver(key3)){
      
      key3.destroy()
    }
    if(mousePressedOver(key4)){
      
      key4.destroy()
    }
    if(keyGroup.length === 0){
      two=createSprite(width/2,height/2,20,20)
      two.x=width-95 
      two.y=50
      two.addImage(fourImg)
      two.scale=0.13
      }
}

function findHats(){
   
  if(mousePressedOver(hat)){
        flag = "complete"
        hat.destroy()
    }
  if(hatGroup.length===0){
     
      three=createSprite(width/2,height/2,10,10)
      three.x=width-40 
      three.y=50
      three.addImage(oneImg)
  }
}

function stopSound(){
  if(gameState === "Select"||gameState==="Level1"){
    bckscore.stop()
    
  }
  if(gameState==="backyard"){
    countdown.stop()
    
  }
}