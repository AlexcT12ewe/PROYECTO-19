var estrellasImg, estrellas;
var planetaImg, planeta, planetasGroup;
var meteoritoImg, meteorito, meteoritosGroup;
var nave1Img, nave1;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score;
var gameOverImg, restartImg;
var gameOver, restart;


function preload(){
 estrellasImg = loadImage("estrellas.jpg");
 planetaImg = loadImage("planeta.png");
 nave1Img = loadImage("nave1.png");
 meteoritoImg = loadImage("pngwing.png");

 
 restartImg = loadImage("reset.png");
 gameOverImg = loadImage("GameOver.png");
}

function setup() {
 createCanvas(500, 612);

 estrellas = createSprite(300,300);
 estrellas.addImage("estrellas",estrellasImg);
 estrellas.velocityY = 1;

 //crear las naves 
 nave1 = createSprite(200,400,50,50);
 nave1.addImage("nave1",nave1Img);
 nave1.scale = 0.1;

 nave1.setCollider("rectangle",0,0,700,700);
 nave1.debug = true

// logo de fin de juego 
 gameOver = createSprite(200,250);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.6;


 restart = createSprite(200,390);
 restart.addImage(restartImg);
 restart.scale = 0.1;
 

 //creacion del grupo 
 planetasGroup = new Group();
 meteoritosGroup = new Group();


 score = 0;
}

function draw() {
 background(200);
 drawSprites();

 text("Puntuación: "+ score, 10,30)

 if(gameState===PLAY){

    spawnPlanetas();
    spawnMeteoritos();

    restart.visible = false;
    gameOver.visible = false;

    planetasGroup.velocityY = -(4 +3* score/100)
    score = score + Math.round(getFrameRate()/60);

    if(score>0 && score%100 === 0){

    }

     //se reinicia el fondo
    if (estrellas.y > 360){
        estrellas.y = 261;
    }

    if(keyDown("right_arrow")){
        nave1.x = nave1.x + 3;
      }
      if(keyDown("left_arrow")){
        nave1.x = nave1.x - 3;
      }
    if (keyDown("UP_arrow")){
        nave1.y = nave1.y -3;
    }
    if (keyDown("Down_arrow")){
        nave1.y = nave1.y + 3;
    }

    if (planetasGroup.isTouching(nave1)){
        gameState = END;
      }

    if (meteoritosGroup.isTouching(nave1)){
        gameState = END;
      }
 }
 else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;

    nave1.depth = restart.depth;
    nave1.depth -= 1; 

    nave1.depth = gameOver.depth;
    nave1.depth -= 1; 

    estrellas.velocityY = 0;
    nave1.velocityY = 0;

    planetasGroup.setLifetimeEach(-1);
    meteoritosGroup.setLifetimeEach(-1);

    planetasGroup.setLifetimeEach(0);
    meteoritosGroup.setLifetimeEach(0);
 
    if(mousePressedOver(restart)) {
        reset();
      }
    
  }
   
}


function spawnPlanetas(){
    if (frameCount % 100 === 0){
        planeta = createSprite (200,-70);
        planeta.addImage ("planeta",planetaImg);
        planeta.scale = 0.2
        planeta.velocityY = 4;
        planeta.x = Math.round(random(120,400));
        planeta.lifetime = 650;
        planetasGroup.add(planeta)

        nave1.depth = planeta.depth;
        nave1.depth += 1;
    }
}
function spawnMeteoritos(){
    if (frameCount % 140 === 0){
        meteorito = createSprite (200,-70);
        meteorito.addImage ("meteorito",meteoritoImg);
        meteorito.scale = 0.1
        meteorito.velocityY = 4;
        meteorito.x = Math.round (random(140.400));
        meteorito.lifetime = 650;
        meteoritosGroup.add(meteorito)

        nave1.depth = meteorito.depth;
        nave1.depth += 1;
    }
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    planetasGroup.destroyEach();
    meteoritosGroup.destroyEach();

    nave1.y = 400;
    nave1.x = 200;

    estrellas.velocityY = 1;
    
    score = 0
   }