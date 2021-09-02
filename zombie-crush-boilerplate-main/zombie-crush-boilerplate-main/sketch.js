const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var wall1, wall2, ground;
var bridge, joinPoint;
var stones = [];

var zombie, zombie1, zombie2, zombie3, zombie4;
var stoneImg, bridgeImg;
var backgroundImg;
var breakButton;

function preload(){
  zombie1 = loadImage("img/zombie-crush-assets-main/assets/zombie1.png");
  zombie2 = loadImage("img/zombie-crush-assets-main/assets/zombie2.png");
  zombie3 = loadImage("img/zombie-crush-assets-main/assets/zombie3.png");
  backgroundImg = loadImage("img/zombie-crush-assets-main/assets/background.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  zombie = createSprite(width/2, height - 100);
  zombie.addImage(zombie2);
  zombie.addImage(zombie3);

  zombie.scale = 0.3;
  zombie.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width - 200, height/2 - 50);
  breakButton.class("breakButton");
  breakButton.size(50, 50);
  breakButton.mousePressed(handleButtonPress);

  wall1 = new Base(5, windowHeight/2 + 100, 350, 500);
  wall2 = new Base(windowWidth - 5, windowHeight/2 + 100, 350, 500);
  ground = new Base(windowWidth/2, windowHeight - 5, windowWidth, 25);

  bridge = new Bridge(25, {x : 10, y : windowHeight/2 - 50})
  joinPoint = new Base(windowWidth - 150, windowHeight/2 - 150, 0, 0);

  for(var i = 0; i <= 8; i++){
    imageMode(CENTER)
    var x = random(width/2 - 200, width/2 + 300)
    var y = random(-10, 75)
    var stone = new Stone(x, y, 50);
   // image(stone, 0, 0, )
    stones.push(stone);
  }

  Matter.Composite.add(bridge.body, joinPoint);
  jointLink = new Link(bridge, joinPoint);
  
}

function draw() {
  background(81);
  image(backgroundImg, width/2, height/2, width, height);

  Engine.update(engine);
  wall1.show();
  wall2.show();
  ground.show();

  
  

  bridge.show();

  for(var i = 0; i <= 8; i++){
    stones[i].show();
  }

  drawSprites();
}

function handleButtonPress(){
  // bridge.break();
   jointLink.detach();
 
  //jointLink = null; 
  console.log("hi")
  setTimeout (()=> {
    bridge.break();
  }, 1500)
}
