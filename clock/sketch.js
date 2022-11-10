this.setup = () => {
  this.pixelDensity(1);
  this.frameRate(1);
  this.createCanvas(windowWidth, windowHeight);
  this.colorMode(HSB);

  createLoop({duration:5, gif:true});
}

this.draw = () => {

  this.background(10);
  this.colorMode(HSB);
  this.angleMode(DEGREES);
  
  let x = this.canvas.width / 2;
  let y = this.canvas.height / 2;

  let diaPercent = 0.95;
  let dia = this.canvas.width < this.canvas.height ? this.canvas.width * diaPercent : this.canvas.height * diaPercent;
  
  //draw background
  let brand = "NEJIMON";
  this.noFill();
  this.strokeWeight(1);
  this.stroke(40, 0.5);
  this.textAlign(CENTER, CENTER);
  this.textSize(dia / 2)
  this.text(brand, this.canvas.width / 2, this.canvas.height / 2);
  this.textSize(dia / 5)
  this.stroke(40, 0.25);
  this.text(brand, x / 3, y / 2);  
  this.textSize(dia / 5)
  this.stroke(40, 0.25);
  this.text(brand, x * 1.5, y * 1.5);  

  textSize(20);
  stroke(255);
  

  //draw outer circles.
  this.noFill();
  this.strokeWeight(dia * 0.02);
  this.stroke(30, 50, 50);
  this.circle(x, y, dia);
  this.strokeWeight(dia * 0.002);
  this.stroke(0, 0, 0);
  fill(230, 50, 50);
  this.circle(x, y, dia);
  fill(200);
  this.circle(x, y, dia * 0.9);
  this.circle(x, y, dia * 0.8);


  //draw minute digits
  let minDigit = 0;
  for (let deg = 0; deg < 360; deg+=3) {
    
    if(deg % 6 == 3){
      let degree = 270 + deg;
      let r = (dia * 0.9) / 2;
      let markingX = (cos(degree) * r) + x;
      let markingY = (sin(degree) * r) + y;
      this.line(x, y, markingX, markingY);
    } else if (deg % 6 == 0){
      let degree = 270 + deg;
      let digitR = dia / 2.35;
      let digitX = (cos(degree) * digitR ) + x;
      let digitY = (sin(degree) * digitR) + y;
      textAlign(CENTER, CENTER);
      
      if(deg % 30 == 0){
        fill(360, 100, 100);
        textSize(dia * 0.03)
      } else{
        fill(0);
        textSize(dia * 0.02)
      }
        
      text(minDigit, digitX, digitY);
      minDigit++;
    }
  }

  //draw clock face gradient.
  let cirDia = dia * 0.8;
  for (let i = 0; i < cirDia; i++) {
    let amount = map(i, 0, cirDia, 0, 1);
    let clr = lerp(1, 250, amount);  
    stroke(clr, 50, 80, 0.6);
    noFill();
    this.circle(x, y, i);
  }
  
  //draw internal white circles on the clock face
  stroke(255);
  this.circle(x, y, dia * 0.5);
  this.circle(x, y, dia * 0.51);

  //draw brand on the clock face
  let brandX = (cos(90) * dia * 0.1) + x;
  let brandY = (sin(90) * dia * 0.1) + y;
  textAlign(CENTER, CENTER);
  textSize(dia * 0.09)
  text(brand, brandX, brandY);
  

  //draw large hour digits on the clock face
  let hourDigit = 1;
  for (let deg = 300; deg < 660; deg+=30) {
    let r = (dia * 0.7) / 2;
    let circleDia = r * 0.25;
    let digitX = (cos(deg) * r) + x;
    let digitY = (sin(deg) * r) + y;

    this.fill(deg - 300, 100, 50);
    noStroke(50);
    this.circle(digitX, digitY, circleDia);
    
    fill(255);
    stroke(10);
    textAlign(CENTER, CENTER);
    textSize(circleDia * 0.7)
    text(hourDigit, digitX, digitY);

    hourDigit++;
  }


  //draw hour hand
  let hr = hour();
  let hrAngle = 270 + hr * 30;
  let hrLen = dia / 4;
  let hrX = (cos(hrAngle) * hrLen) + x;
  let hrY = (sin(hrAngle) * hrLen) + y ;
  this.strokeWeight(dia * 0.02);
  this.stroke(360, 100, 90);
  this.line(x, y, hrX, hrY);
  this.circle(x, y, dia * 0.029);

  //draw minute hand
  let min = minute();
  let minAngle = 270 + min * 6;
  let minLen = dia / 3;
  let minX = (cos(minAngle) * minLen) + x;
  let minY = (sin(minAngle) * minLen) + y ;
  this.strokeWeight(dia * 0.02);
  this.stroke(250, 100, 90);
  this.line(x, y, minX, minY);
  this.circle(x, y, dia * 0.021);

  //draw second hand
  let sec = second();
  let secAngle = 270 + sec * 6;
  let secLen = dia / 2.4;
  let secX = (cos(secAngle) * secLen) + x;
  let secY = (sin(secAngle) * secLen) + y ;
  this.strokeWeight(dia * 0.005);
  this.stroke(100, 60, 50);
  this.line(x, y, secX, secY);
  this.circle(x, y, dia * 0.021);


 // save(`frame_${frameCount}.png`);
}


//window resized event
this.windowResized = () =>{
  this.resizeCanvas(windowWidth, windowHeight);
}
