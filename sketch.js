var backImage,backgr;
var player, player_running;
var ground,ground_img;

var cointouching
var rockjumping
var gamestart
var gameover
var spawnegg

var END =0;
var PLAY =1;
var gameState = PLAY;
var foodGroup
var score = 0
var rockGroup

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("manikanta11.PNG","manikanta12.PNG","manikanta13.PNG","manikanta14.PNG","manikanta15.PNG","manikanta16.PNG","manikanta16.PNG","manikanta17.PNG","manikanta18.PNG","manikanta19.PNG","manikanta20.PNG","manikanta21.PNG")
  player2_running = loadAnimation("sai1.png","sai2.png","sai3.png","sai4.png","sai5.png","sai6.png","sai7.png")
eggImage=loadImage("manikanta26.png")
food1Image=loadImage("manikanta24.png")
wheatImage=loadImage("manikanta35.png")
stoneImage = loadImage("stone.png")
player_died = loadAnimation("sai8.png")

cointouching = loadSound("coin touching.wav")
rockjumping = loadSound("rock jumping.wav")
gamestart= loadSound("game start.wav")
gameover = loadSound("game over.wav")
spawnegg = loadSound("spawn egg.wav")

}

function setup() {
  createCanvas(800,400);
  gamestart.play()
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
 
  player = createSprite(100,300,5,30);
  player.addAnimation("Running",player_running);
  player.scale = 2
  
  player2 = createSprite(300,340,20,50)
player2.addAnimation("Running",player2_running)
player2.addAnimation("died",player_died)
player2.changeAnimation("Running")


  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  foodGroup=new Group()
  rockGroup = new Group()
}




function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      rockjumping.play()
      player2.velocityY = -12;

    }
    player2.velocityY = player2.velocityY + 0.8;
  
    player2.collide(ground);
   

    spawnStones()
    spawnFoods()
    if(player2.isTouching(foodGroup))
    cointouching.play()
    {
      foodGroup.destroyEach()
      score=score+1
    }
    if(player2.isTouching(rockGroup))
    {
      gameState = END
      gameover.play()
    }
  }
  if(
    gameState === END
  )
{
  player2.changeAnimation("died");
  player2.velocityX = 0
  player.visible = false
  foodGroup.setVelocityXEach(0)
  foodGroup.destroyEach()
  rockGroup.setVelocityXEach(0)
  rockGroup.destroyEach()
  backgr.velocityX = 0
}

  drawSprites();
  textSize(20)
  text("Score = "+score, 700,100)
}
function spawnStones(){
  if (frameCount % 200 === 0) {
    stone = createSprite(600,370,40,10);
   stone.y = Math.round(random(350,380));
   stone.addImage(stoneImage);
   stone.scale = 0.25;
   stone.velocityX = -3;
   
   rockGroup.add(stone)
   }


}
function spawnFoods(){
  if (frameCount % 140 === 0) {
    food = createSprite(600,300,40,10);
   food.y = Math.round(random(280,320));
   food.addImage(wheatImage);
   food.scale = 0.55;
   food.velocityX = -3;
   foodGroup.add(food)
   
   }


}

      
  
  

