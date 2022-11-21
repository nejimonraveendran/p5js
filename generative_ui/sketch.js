let sky;
let cnTower;
let buildings = [];

function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvasContainer');
  cnv.position(0, 0);
  cnv.style('z-index', 0);
  frameRate(30);
  pixelDensity(1);

  sky = new Sky();
  cnTower = new CnTower();

  drawBuildings();
}

function draw(){
  background(220);
  sky.draw(220, 380);
  cnTower.draw(width/3.5, height, windowHeight / 20);
  
  for (let i = 0; i < buildings.length; i++) {
    let building = buildings[i];
    building.draw("black", "grey");
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
    buildings.push(building);
  }
}


class Sky{
  draw(colorFrom, colorTo){
    colorMode(HSB);

    for (let i = 0; i < height; i++) {
      let strokeColor = map(i, 0, height, colorFrom, colorTo);
      stroke(strokeColor, 90, 100);
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
  }

  draw(buildingColor, unitColor){
    rectMode(CORNER);
    let unitSpace = this.unitWid / 2;
    let buildingWid = this.unitCount * this.unitWid + (unitSpace * this.unitCount) + unitSpace;

    fill(buildingColor);
    rect(this.x, this.h, buildingWid, this.h)

    for (let i = this.x; i < this.x + this.unitCount * this.unitWid + (unitSpace * this.unitCount); i=i+this.unitWid+unitSpace) { //rows of units
      for (let j = 0; j < this.h; j=j+this.unitWid+unitSpace) { //columns of units.
        let x = unitSpace + i;
        let y = unitSpace + j;
        fill(unitColor);
        rect(x, this.h + y, this.unitWid, this.unitWid);
      }  
    }
  }
}



