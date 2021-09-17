var trex, trex_running, edges;
var groundImage;
var piso;
var pisofalso
var Nube;
var clow;
var captus1;
var captus2;
var captus3;
var captus4;
var captus5;
var captus6;
var score=0;
var grupoobs;
var gruponbs;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var trexchoca;
var gameOver;
var gameover1;
var restart;
var restart1;
var jump;
var die;
var checkPoint;
var ave;
var gruposaves
var ave2;
var moon;
var Luna2;
function preload(){

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexchoca=loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png")
  clow=loadImage("cloud.png");
  gameOver=loadImage("gameOver.png");
  restart=loadImage("restart.png");
  captus1=loadImage("obstacle1.png");
  captus2=loadImage("obstacle2.png");
  captus3=loadImage("obstacle3.png");
  captus4=loadImage("obstacle4.png");
  captus5=loadImage("obstacle5.png");
  captus6=loadImage("obstacle5.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkPoint=loadSound("checkPoint.mp3");
  ave2=loadImage("terodactilo.png");
  Luna2=loadImage("Luna2.png");
}

function setup()
{
  
  createCanvas(windowWidth,windowHeight);
  
  //crea el Trex
  trex = createSprite(50,windowHeight-120,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexchoca)
  edges = createEdgeSprites();
  piso=createSprite(300,windowHeight-100,600,10);
  piso.addImage(groundImage);
  pisofalso = createSprite(300,windowHeight-80,600,10);
  pisofalso.visible=false ;
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
 // var rand=Math.round(random(1,100));
  //console.log(rand);
  grupoobs=new Group();
  gruponbs=new Group();
  grupoaves=new Group();
  trex.setCollider("circle",0,0,50);
  
//  trex.debug=true;
  gameover1=createSprite(300,50);
  restart1=createSprite(300,110);
  restart1.addImage(restart);
  restart1.scale=0.5
  gameover1.addImage(gameOver);
  gameover1.scale=.5;
  gameover1.visible=false;
  restart1.visible=false;
}


function draw()
{
  //establece un color de fondo  
  background("white");
  console.log(windowHeight,)
  fill("purple");
  textSize(15)
  text("Made:Gina",20,20)
  if (gamestate==PLAY){
   score=score+Math.round(getFrameRate()/60);
    if (score%300==0&&score>0){
    checkPoint.play();
    } 
    piso.velocityX=-(5+score/100);
    if(keyDown("space")&&trex.y>windowHeight-130)
  {
    
    trex.velocityY = -10;
   jump.play();
  }
    
    if(piso.x<0)
  {
  piso.x=300; 
  }
    trex.velocityY = trex.velocityY + 0.5;
   nubes();
  captus();
  if            (grupoobs.isTouching(trex)||grupoaves.isTouching(trex)){
  gamestate=END;
  gameover1.visible=true;
  restart1.visible=true;
    
  trex.changeAnimation("collided",trexchoca);
    die.play();
  }
  if (score>100){
  Aves();
 }
  if (score>100){
  Luna();
  
 }    
    
    
    
  }
  else if (gamestate==END){
  piso.velocityX=0;
  grupoobs.setVelocityXEach(0);
  gruponbs.setVelocityXEach(0);
  grupoobs.setLifetimeEach(-1);
  gruponbs.setLifetimeEach(-1);
  trex.velocityY=0;
  if (mousePressedOver(restart1)){
 reinicio();     
      }
  }
    
  fill("black");
  textSize(15);
  text("Puntuacion: "+score,460,20);
  
 // console.log(trex.depth);
 
  //ingresa la posición y del Trex
 // console.log(trex.y) 
  
  
  //salta cuando se presiona la barra espaciadora
  
  
  
  //evita que el Trex caiga
  trex.collide(pisofalso)
  drawSprites();
}

function reinicio () 
{
 gamestate=PLAY; 
 restart1.visible=false;
 gameover1.visible=false;
 grupoobs.destroyEach();
 gruponbs.destroyEach();
  score=0;
 trex.changeAnimation("running",trex_running);

  
}
function Aves ()
{
  if (frameCount%180==0){
    
 ave=createSprite(580,50,30,20)
  //ave.addImage(clow) ;
  ave.addImage(ave2);
  ave.velocityX=-10;
 ave.y=Math.round(random(100,windowHeight-80));
 ave.depth=trex.depth;
 trex.depth=trex.depth+1;
    Nube.lifetime=42;
    grupoaves.add(ave);
    

  }
}
function Luna ()
{
  
    moon=createSprite(500,50,40,30);
    moon.addImage(Luna2) ;
}


function nubes ()
{
  if (frameCount%60==0){
    
 Nube=createSprite(580,50,40,20)
  Nube.addImage(clow) ;
  
    Nube.velocityX=-5;
 Nube.y=Math.round(random(10,400));
 Nube.depth=trex.depth;
 trex.depth=trex.depth+1;
    Nube.lifetime=120;
    gruponbs.add(Nube);

  }
}
function captus ()
{
  if (frameCount%60==0){
 var obstaculo=createSprite(560,windowHeight-100,20,60);
 obstaculo.velocityX=-(5+score/100);
 var rand = Math.round(random(1,6));
 switch (rand) 
 {
 case 1:obstaculo.addImage(captus1);
 break;
 case 2:obstaculo.addImage(captus2);
 break;
 case 3:obstaculo.addImage(captus3);
 break;
 case 4:obstaculo.addImage(captus4);
 break;
 case 5:obstaculo.addImage(captus5);
 break;
 case 6:obstaculo.addImage(captus6 );
 break;
 default:break;
}
 obstaculo.scale=.4;
 obstaculo.lifetime=120;
  grupoobs.add(obstaculo);

  }
}
