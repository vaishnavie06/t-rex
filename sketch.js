
var trex ,trex_running,trex_collided;
var ground,groundimage1,groundimage2;
var invground,gameoverimage
var cloud,cloudimage,obstacle,obstace1image,obstace2image,obstace3image,
    obstace4image,obstace5image,obstace6image,score=0,cactusgroup,cloudgroup;
var PLAY=1,END=0;
var gameState=PLAY;
var gameOver,restart,restartimage;
var jumpsound,diesound,checkpointsound;
var flag=1;
//loadAnimation & loadImage

function preload()
{ 

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided= loadImage("trex_collided.png");
  groundimage1 = loadImage("ground1.png");
  groundimage2=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1image=loadImage("obstacle1.png");
  obstacle2image=loadImage("obstacle2.png");
  obstacle3image=loadImage("obstacle3.png");
  obstacle4image=loadImage("obstacle4.png");
  obstacle5image=loadImage("obstacle5.png");
  obstacle6image=loadImage("obstacle6.png");
  gameoverimage=loadImage('gameOver.png');
  restartimage=loadImage('restart.png');
  diesound=loadSound('die.mp3');
  jumpsound=loadSound("jump.mp3");

}

function setup()
{
  createCanvas(600,400);
  
  //create a trex sprite
  trex = createSprite(50,320,20,50);
  trex.addAnimation("running", trex_running); //setAnimation
  trex.addAnimation("collided",trex_collided);
  trex.scale= 0.7;
  //trex.debug=true
  //create a ground
  ground=createSprite(300,380,600,20);
  ground.addImage('ground',groundimage2);
  //creat an invisible ground
  invground=createSprite(300,395,600,10);
  invground.visible=false 
  cloudgroup=new Group();
  cactusGroup=new Group();
  
  gameOver=createSprite(300,200);
        gameOver.addImage(gameoverimage);
        gameOver.scale=0.7;
  restart=createSprite(300,250,20,20);
  restart.addImage(restartimage);//private variable
  restart.scale=0.7; 
  gameOver.visible=false;
  restart.visible=false;
    
  
}

function draw()
{
   background(180);
    
  //String Concatenation -- Adding strings (text)
  var firstname='Vaishnavie'; //string variable
  //console.log(firstname + " Jetta");
  
    //Stop trex from falling off
   trex.collide(invground);
  
 
  if(gameState===PLAY)
    {
      if(frameCount%4===0) // For all multiples of 50 
    {
      score++
    }
  
  textSize(15);
  text("score "+score,300,20);
      
      //trex to jump
   if (keyDown("space") && trex.y>150)
   {         
     trex.velocityY = -15;
     jumpsound.play();
   }
      
  
  //Add gravity 
   trex.velocityY = trex. velocityY+ 1; 
      
      //Move the ground
   ground.velocityX=-8;
  
  //Reset the ground
  if(ground.x<0)
    {
      ground.x=600;
    }
  createClouds();
  createCactus();
    }
  else
    if(gameState===END)
      {
        trex.velocityY=0;
        ground.velocityX=0;
        trex.changeAnimation("collided",trex_collided);
        cloudgroup.setVelocityXEach(0);
        cactusGroup.setVelocityXEach(0);
        cactusGroup.setLifetimeEach(-1);
        cloudgroup.setLifetimeEach(-1);
        gameOver.visible=true;
  restart.visible=true;
        
      }
  
  //Mouseclicking event
  
  if(mousePressedOver(restart)  )
    {
      gameState=PLAY;
      cactusGroup.destroyEach();
      cloudgroup.destroyEach();
         gameOver.visible=false;
  restart.visible=false;
      score=0;
      trex.changeAnimation("running",trex_running);
      flag=1;
      
    }
  
  if(trex.isTouching(cactusGroup))
    {
      gameState=END;
      if(flag==1)
        {
      diesound.play();
          flag=2;
        }
    }
   drawSprites();

}

//  Modulus function ---> gives the remainder 100%10 --> 0 100/10 -->10

function createClouds()
{
  if(frameCount%70===0) // For all multiples of 50 
    {
  cloud=createSprite(600,Math.round(random(150,300)));
  cloud.addImage(cloudimage);
  cloud.velocityX=-6;
      // for the trex to not go throught the clouds 
      trex.depth=cloud.depth+1;
      cloud.scale=0.7;
      cloudgroup.add(cloud)
      cloud.lifetime=100;
    }
}

//Create Cactus
function createCactus()
{
  if(frameCount%100===0) // For all multiples of 50 
    {
  obstacle=createSprite(600,360);
      obstacle.scale=0.7;
      switch(Math.round(random(1,6)))
        {
          case 1:obstacle.addImage(obstacle1image); break;
          case 2:obstacle.addImage(obstacle2image); break;
          case 3:obstacle.addImage(obstacle3image); break;
          case 4:obstacle.addImage(obstacle4image); break;
          case 5:obstacle.addImage(obstacle5image); break;
          case 6:obstacle.addImage(obstacle6image); break;
          default:break;
        }
  obstacle.velocityX=-8;
      obstacle.lifetime=75;
      cactusGroup.add(obstacle)
      
    }
}