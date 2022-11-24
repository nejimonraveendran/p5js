let sky;
let cnTower;
let buildings = [];
let farawaybuildings = [];
let stars = [];


function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvasContainer');
  cnv.position(0, 0);
  cnv.style('z-index', 0);
  frameRate(30);
  pixelDensity(1);

  initializeStars();
  drawFarAwayBuildings();

  sky = new Sky();
  cnTower = new CnTower();

  drawBuildings();
}

function draw(){
  background(150, 0.5);

  
  //draw sky
  sky.draw(color(35, 46, 59), color(199, 81, 58));

  //draw stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
  
  //draw faraway buildings
  for (let i = 0; i < farawaybuildings.length; i++) {
    let building = farawaybuildings[i];
    building.draw(color(92, 66, 66));
  }

  cnTower.draw(width/3.5, height, windowHeight / 20);
  


  for (let i = 0; i < buildings.length; i++) {
    let building = buildings[i];
    building.draw("black");
  }
  
 
  
  //add sparkles
  //add clouds
  //add faraway buildings
  //add seasonal particles
  //change sky to dynamic wavy style

}

function windowResized () {
  this.resizeCanvas(windowWidth, windowHeight);
  drawBuildings();
  drawFarAwayBuildings();
  initializeStars();
}

function initializeStars(){
  for (let i = 0; i < 100; i++) {
    let star = new Star();
    star.x = random(width);
    star.y = random(height);
    star.clr = color(255, 255, 255);
    stars[i] = star;
  }
}

function drawBuildings(){
  buildings = [];
  //draw foreground buildings
  let minWid = width / 50;
  let maxWid = width / 60;
  let minHeight = height / 20;
  let maxHeight = height / 5;
  for (let i = 0; i < width; i = i+random(minWid, maxWid)) {
    let building = new Building(i, height - random(minHeight, maxHeight), int(maxWid / 4), int(random(2, 5)));
    building.unitColor = color(random(166, 200), 131, 43);
    building.showUnits = true;
    buildings.push(building);
  }
}

function drawFarAwayBuildings(){
  farawaybuildings = [];
  //draw foreground buildings
  let minWid = width / 50;
  let maxWid = width / 60;
  let minHeight = height / 10;
  let maxHeight = height / 4.5;
  for (let i = 0; i < width; i = i+random(minWid, maxWid)) {
    let building = new Building(i, height - random(minHeight, maxHeight), int(maxWid / 4), int(random(2, 5)));
    building.showUnits = false;
    farawaybuildings.push(building);
  }
}



class Sky{
  draw(colorFrom, colorTo){
    colorMode(RGB);

    for (let i = 0; i < height; i++) {
      //let strokeColor = map(i, 0, height, colorFrom, colorTo);
      let amount = map(i, 0, height, -1, 1.0);
      let strokeColor = lerpColor(colorFrom, colorTo, amount);
      stroke(strokeColor);
      line(0, i, width, i);
    }
  }
}

class CnTower{
  constructor(){
  }

  draw(bottomX, bottomY, wid){
    let halfWid = wid / 2
    let topY = bottomY - (wid * 15);

    fill(20);
    noStroke();
    
    beginShape(TRIANGLES);
    vertex(bottomX - halfWid, bottomY);
    vertex(bottomX + halfWid, bottomY);
    vertex(bottomX, topY);
    endShape();

    let dis = dist(bottomX, bottomY, bottomX, topY);

    rectMode(CENTER);

    stroke("red");
    line(bottomX, topY + dis / 2.7, bottomX, height);
    
    noStroke();
    //first floor
    rect(bottomX, topY + dis / 3,  wid, wid * 0.5, wid * 0.2)
    rect(bottomX, topY + dis / 2.9,  wid * 0.8, wid * 0.5, wid * 0.2)

    //sec floor
    rect(bottomX, topY + dis / 4,  wid * 0.5, wid * 0.35, wid * 0.13)

    
  }
}

class Building{
  constructor(x, y, unitWid, unitCount){
    this.x = x;
    this.unitWid=unitWid;
    this.unitCount=unitCount;
    this.h=y;
    this.unitColor = color(166, 131, 43);
    this.showUnits = true;
  }

  draw(buildingColor){
    colorMode(RGB);
    rectMode(CORNER);
    let unitSpace = this.unitWid / 2;
    let buildingWid = this.unitCount * this.unitWid + (unitSpace * this.unitCount) + unitSpace;
    stroke(buildingColor);
    fill(buildingColor);
    rect(this.x, this.h, buildingWid, this.h)

    if(this.showUnits === true){
      for (let i = this.x; i < this.x + this.unitCount * this.unitWid + (unitSpace * this.unitCount); i=i+this.unitWid+unitSpace) { //rows of units
        for (let j = 0; j < this.h; j=j+this.unitWid+unitSpace) { //columns of units.
          let x = unitSpace + i;
          let y = unitSpace + j;
          fill(this.unitColor);
          rect(x, this.h + y, this.unitWid, this.unitWid);
        }  
      }
    }
      
  }
}

class Star{
  constructor(){
    this.x;
    this.y;
    this.clr;
  }

  draw(){
    stroke(this.clr);
    strokeWeight(2);
    point(this.x, this.y);
  }
}



