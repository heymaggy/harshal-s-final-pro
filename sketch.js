var plane1Img;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var bullet_counter = 0;
var B = [];
var enemies;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){
bgImg = loadImage("bg.png")
commandoImg = loadAnimation("Commando.png")
enemy1= loadAnimation("v1.png")
enemy2= loadAnimation("v2.png")
enemy3= loadAnimation("v3.png")
bullets = loadAnimation("Bullet.png")
goImg = loadImage("go.png")
resetImg = loadImage("r.jpg")

}


function setup(){
  createCanvas(500,500);
//background  
  bg = createSprite(250,250,20,20);
  bg.addImage(bgImg);
  bg.scale = 0.9;
  
//player
  plane = createSprite(30,150,20,20);
  plane.addAnimation("plane",commandoImg);
  plane.scale = 0.3;
  plane.debug =true;
  plane.setCollider("rectangle",0,0,350,400)
  gameOver = createSprite(width/2,height/2-40,20,20);
  gameOver.addImage(goImg);
  gameOver.scale = 0.1;

  restart = createSprite(width/2,height/2+30,20,20);
  restart.addImage(resetImg);
  restart.scale = 0.1;
  
  enemies = new Group();
  score = 0;

}

function draw(){
  background(0);

if(gameState === PLAY) {
 
  //score = score + Math.round((frameCount/93));
  bg.velocityX = -1;
  gameOver.visible = false;
  restart.visible = false;

//infinite background
if (bg.x<0){
  bg.x = 300
}
//control for the player
plane.y = mouseY;

/*if (keyIsDown("space")){
  createBulletsinMotion();
}*/
//creating enemies
tealEnemy();
greenEnemy();
purpleEnemy();


if (bullet_counter>0){
enemies.collide(B[bullet_counter],explosion);
//score=score+1
}

if(enemies.isTouching(plane)){
  gameState = END;
}
if(gameState === END) {
  bg.velocityX = 0;
  enemies.setVelocityXEach(0);
  enemies.setLifetimeEach(-1);
  gameOver.visible = true;
  restart.visible = true;


}

}
drawSprites();
textSize(20);
fill("red");
textFont("Roboto");
stroke("red");
text ("Score: "+ score, width/2+150,30);

}

function reset(){
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  frameCount = 0;
  enemies.destroyEach();
}
function keyPressed(){
  if(gameState === PLAY) {
  if (keyCode === 32){
    createBulletsinMotion();
  }
 
  }
  if(gameState === PLAY) {
  if(keyCode === 72){
    reset();
  }
}
}
 
 function tealEnemy(){
   if (frameCount %120===0){
    e1 = createSprite(600,150,20,20);
    e1.addAnimation("enemy1",enemy1);
    e1.scale = 0.08;
    e1.velocityX = -5;
    e1.y = random(10, 400);
    e1.liftime = 600/4;
    enemies.add(e1);
   }
 }
 
 function purpleEnemy(){
  if (frameCount %100===0){
    e2 = createSprite(600,150,20,20);
    e2.addAnimation("enemy2",enemy2);
    e2.scale = 0.07;
   e2.velocityX = -4;
   e2.lifetime=600/4
   e2.y = random(10, 400);
enemies.add(e2);
  }
}

function greenEnemy(){
  if (frameCount %120===0){
    e3 = createSprite(600,150,20,20);
    e3.addAnimation("enemy3",enemy3);
    e3.scale = 0.06;  
   e3.velocityX = -4;
   e3.lifetime=600/4
   e3.y = random(10, 400);
  enemies.add(e3);
  }
}
function createBulletsinMotion() {
  bullet_counter++;
  B[bullet_counter]  = createSprite(plane.x+40,150,20,20);
  B[bullet_counter].addAnimation("b",bullets);
  B[bullet_counter].scale = 0.02;
  B[bullet_counter].velocityX = 10;
  B[bullet_counter].y = plane.y+20;
  B[bullet_counter].lifetime = 600/10;
}

function explosion(spriteA, spriteB){
spriteA.remove();
spriteB.remove();
score= score+1;
}



