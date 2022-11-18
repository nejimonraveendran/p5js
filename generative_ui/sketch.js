let sky;
let cnTower;

function setup(){
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvasContainer');
  cnv.position(0, 0);
  cnv.style('z-index', 0);
  frameRate(30);
  pixelDensity(1);

  sky = new Sky();
  cnTower = new CnTower();
}

function draw(){
  background(220);
  sky.draw(0, 80);
  cnTower.draw(width/3.5, height, 40);
  
}

function windowResized () {
  this.resizeCanvas(windowWidth, windowHeight);
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
    rect(bottomX, topY + dis / 3,  wid, wid * 0.5, wid * 0.2)
    rect(bottomX, topY + dis / 2.9,  wid * 0.8, wid * 0.5, wid * 0.2)

    rect(bottomX, topY + dis / 4,  wid * 0.5, wid * 0.35, wid * 0.13)
    
  }
}



