var bullet,zombie,zombie1,zombie2,zombie3,zombieImage,thickness,shotgun,shotgunImage;
var speed,weight,wall1,wall2; 
var score=0;
var health=100;

var gameState=0;
var gameOver,restart,gameOverImg,resetImg;
function preload(){
shotgunImage=loadImage("shotgun.png");
zombieImage=loadImage("zombie.png");
gameOverImg=loadImage("gameover.png");
resetImg=loadImage("reset.png");
}
function setup() {
 
 createCanvas(1800,800);




 shotgun=createSprite(150,300,50,50)
 shotgun.addImage(shotgunImage)
 weight=random(30,52);
 gameOver=createSprite(900,400)
 gameOver.addImage(gameOverImg)
 gameOver.scale=2.0;
 restart=createSprite(900,600);
 
 restart.addImage(resetImg)
 restart.visible=false;
  gameOver.visible=false;
 wall1=createSprite(1100,400,1700,20)
 wall2=createSprite(1100,600,1700,20)
 zombieGroup1=new Group()
 zombieGroup2=new Group()
 zombieGroup3=new Group()
 bulletGroup=new Group()
 thickness=random(22,83);
}

function draw() {
  background(255,255,255);  
  if (gameState===0){
    console.log("work")
    if(keyDown("space")){
     gameState=1
    }
  }
 if (gameState===1){
   
  fill("red")
  textSize(30)
  text("score:"+score,1600,100)
  text("health:"+health,1400,100)
  shotgun.y=mouseY;
  
  //shotgun.depth=bullet.depth;
  //shotgun.depth=shotgun.depth+1;s
  reload();
 spawnZombie();
 shoot();
 if(zombieGroup1.isTouching(bulletGroup)){
  zombieGroup1.destroyEach()
  bulletGroup.destroyEach()
  score=score+10;
  
}
if(zombieGroup2.isTouching(bulletGroup)){
  zombieGroup2.destroyEach()
  bulletGroup.destroyEach()
  score=score+10;  
}
if(zombieGroup3.isTouching(bulletGroup)){
  zombieGroup3.destroyEach()
  bulletGroup.destroyEach()
  score=score+10;
  
}
if (shotgun.isTouching(zombieGroup1)||shotgun.isTouching(zombieGroup2)||shotgun.isTouching(zombieGroup3)){
  health=health-1;

}

 if (health===0){
   gameState=2;
 }
}
else if(gameState===2){
  restart.visible=true;
  gameOver.visible=true;
  zombieGroup1.setVelocityXEach(0);
  zombieGroup2.setVelocityXEach(0);
  zombieGroup3.setVelocityXEach(0);
  if(mousePressedOver(restart)){
    reset();
  }
}
drawSprites();
if (gameState===0){
fill("red")
textSize(25)
text("Welcome to Zombie Strike.This is a shooting game where you have to fight endless wavess of zombies .Hold the highest score to win",150,200)
text("press E to shoot the gun and move your mouse to aim",250,250)
text("Press Space to start",300,300)

}
  }
 
 function spawnZombie(){
   if(frameCount%60===0){
  
   var a=Math.round(random(1,3));
   switch (a) {
     case 1:
      zombie1=createSprite(1800,300,80,80)
      zombie1.addImage(zombieImage)
       break;
      case 2:
      zombie2=createSprite(1800,500,80,80)
      zombie2.addImage(zombieImage)
      
       break;
      case 3:
      zombie3=createSprite(1800,700,80,80)
      zombie3.addImage(zombieImage)   
       break;
    
      
   }
  gameOver.depth=wall1.depth;
  gameOver.depth=gameOver.depth+1;
 
 
 
  
 
  wall1.depth=restart.depth-1;
  wall2.depth=restart.depth-1;
  if(zombie1){
     zombie1.velocityX=-4;
     zombie1.scale=0.5
     
     zombieGroup1.add(zombie1)
     gameOver.depth=zombie1.depth;
     gameOver.depth=gameOver.depth+1;
     restart.depth=zombie1.depth;
     restart.depth=restart.depth+1;
     zombie1.lifetime=380;
  }
  if(zombie2){
     zombie2.velocityX=-4;
     zombie2.scale=0.5
    
     zombieGroup2.add(zombie2)
    gameOver.depth=zombie2.depth;
    gameOver.depth=gameOver.depth+1;
    restart.depth=zombie2.depth;
    restart.depth=restart.depth+1;
    zombie2.lifetime=380;
  }
  if(zombie3){
     zombie3.velocityX=-4;
     zombie3.scale=0.5
     
     zombieGroup3.add(zombie3)
     gameOver.depth=zombie3.depth;
     gameOver.depth=gameOver.depth+1;
     restart.depth=zombie3.depth;
     restart.depth=restart.depth+1;
     zombie3.lifetime=380;
  }
    
     
    
   }
 }

 function shoot(){
   if(keyDown("e")){
     bullet.velocityX=600;
     bullet.visible=true;
   }
  
 }

 function reload(){
  if(frameCount%60===0){
  bullet=createSprite(50,200,50,5);
  bullet.visible=false;
  bullet.y=mouseY;
  
  bulletGroup.add(bullet)
  }
 }
function reset(){
  gameState=PLAY;
  bulletGroup.destroyEach()
  zombieGroup1.destroyEach()
  zombieGroup2.destroyEach()
  zombieGroup3.destroyEach()
  score=0;
  health=100;
}