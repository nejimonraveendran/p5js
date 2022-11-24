let fishes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  addNewFish();
}

function draw() {
  background(171, 215, 224);

  for(let i=0;i<fishes.length;i++){
    let targetLoc = createVector(mouseX, mouseY);
    strokeWeight(50);
    point(targetLoc.x, targetLoc.y);
    fill(255);
    textAlign(CENTER);
    text("BAIT", targetLoc.x, targetLoc.y);
  
    let fish = fishes[i];
  
    let dis = targetLoc.dist(fish.loc);
    let mDist = map(dis, 100, 0, 1, 0);
    targetLoc.sub(fish.loc);
    targetLoc.normalize();
    targetLoc.mult(mDist - 1); 
    fish.loc.add(targetLoc);
    
    fish.draw();
    
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


function addNewFish(){
  let randX = random(10, width-10);
  let randY = random(10, height-10);
  let fish = new Fish(randX, randY);
  fish.dis = random(1.5, 2.5);
  fishes.push(fish);  
}

class Fish{
  
  constructor(x, y){
    this.loc = createVector(x, y);
  }
  
  draw(){
    strokeWeight(1);
    angleMode(DEGREES);
    translate(this.loc.x, this.loc.y);
    let x = mouseX - this.loc.x;
    let y =   mouseY - this.loc.y;
    let deg = atan2(x, y);
    rotate(-deg);
    rectMode(CENTER); 
    
    fill(255, 150, 0);
    beginShape();
    vertex(0, 50);
    bezierVertex(30, 20, 5, -10, 0, -20);
    bezierVertex(-5, -10, -30, 20, 0, 50);
    triangle(5, -30, 0, -20, -5, -30);
    endShape();

    strokeWeight(5);
    point(0, 40);
  }
}