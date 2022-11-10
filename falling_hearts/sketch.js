let heartRadius = 10;
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(10, 50);
  
  
  translate(width/2, height/2);
  textAlign(CENTER);
  fill(255);
  text('Click Anywhere', 0, 0);

  for(let i=0;i<shapes.length;i++){
    let shape = shapes[i];
    shape.draw();
    shape.y = random(shape.y-0.5, shape.y+0.5) + shape.speed;
    shape.x = random(shape.x-0.5, shape.x+0.5);
    
    shape.speed += 0.05;
    
    if(shape.offScreen()){
      shapes.splice(i, 1);
    }
  }

  //save(`frame_${frameCount}.png`);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  for(let i=0;i<heartRadius;i++){
    addNewShapes(i);
  }
  
  
  //heartRadius--;
}

function addNewShapes(radius){
  for(let ang=0;ang<=TWO_PI; ang+=0.05){
    let x = (16 * pow(sin(ang), 3)) * radius;
    let y = (13 * cos(ang) - 5*cos(2*ang) - 2*cos(3*ang) - cos(4*ang)) * -radius;
    
    let shape = new Shape(x, y, radius);
    shape.speed = random(1, 5);
    shapes.push(shape);
  }
}


class Shape{
  constructor(x, y, dia){
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.speed = 1;
  }
  
  draw(){
    let a = map(this.speed, 1, 10, 255, 0);
    fill(255, random(0, 100), 0, a);
    circle(this.x, this.y, this.dia);
  }
  
  offScreen(){
    return this.y > height;
  }
}