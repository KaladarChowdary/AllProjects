const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxifyCanvas();
const mouse = { x: middleX(), y: middleY() };
let base, hAxis, vAxis, arm, circle, arc;
// EVENT LISTENERS
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function (evt) {
  maxifyCanvas();

  base = new LineSegment();
  [hAxis, vAxis] = drawAxesFromCentre();
  arm = new Arm();

  circle = new Circle();
  arc = new Arc();
});

// FUNCTION DEFINITION
function maxifyCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function middleX() {
  return canvas.width / 2;
}

function middleY() {
  return canvas.height / 2;
}

function endX() {
  return canvas.width;
}

function endY() {
  return canvas.height;
}

function getQuadrant(x1, y1, x2, y2) {
  if (x2 > x1 && y2 <= y1) return 1;
  else if (x2 <= x1 && y2 < y1) return 2;
  else if (x2 < x1 && y2 >= y1) return 3;
  else if (x2 >= x1 && y2 > y1) return 4;
  // else {
  //   console.log("Not between any quadrant");
  // }
}

function fillCanvasWithColor(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, endX(), endY());
}

// CLASS DEFINITION
class LineSegment {
  constructor(
    x1 = middleX(),
    y1 = middleY(),
    x2 = middleX() + 200,
    y2 = middleY(),
    color = "yellow",
    width = 3
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.width = width;
  }

  beginPath() {
    ctx.beginPath();
  }

  moveToInitial() {
    ctx.moveTo(this.x1, this.y1);
  }

  lineToFinal() {
    ctx.lineTo(this.x2, this.y2);
  }

  setLineWidth() {
    ctx.lineWidth = this.width;
  }

  setStrokeColor() {
    ctx.strokeStyle = this.color;
  }

  stroke() {
    ctx.stroke();
  }

  draw() {
    this.beginPath();
    this.moveToInitial();
    this.lineToFinal();
    this.setLineWidth();
    this.setStrokeColor();
    this.stroke();
  }

  update() {
    this.draw();
  }
}

class Arm {
  constructor(
    x1 = middleX(),
    y1 = middleY(),
    x2 = endX(),
    y2 = 0,
    color = "red",
    width = 3
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.width = width;

    this.distance = 200;
  }

  beginPath() {
    ctx.beginPath();
  }

  moveToInitial() {
    ctx.moveTo(this.x1, this.y1);
  }

  lineToFinal() {
    ctx.lineTo(this.x2, this.y2);
  }

  finalToMouse() {
    this.x2 = mouse.x;
    this.y2 = mouse.y;
  }

  setLineWidth() {
    ctx.lineWidth = this.width;
  }

  setStrokeColor() {
    ctx.strokeStyle = this.color;
  }

  stroke() {
    ctx.stroke();
  }

  dx() {
    return Math.abs(mouse.x - this.x1);
  }

  dy() {
    return Math.abs(mouse.y - this.y1);
  }

  getTheta() {
    this.theta = Math.atan2(this.dy(), this.dx());
  }

  radToDeg(angle) {
    return (angle * 180) / Math.PI;
  }

  updateThetaWithQuadrants() {
    let i = getQuadrant(this.x1, this.y1, this.x2, this.y2);

    if (i === 1) {
      return this.theta;
    } else if (i === 2) {
      return Math.PI - this.theta;
    } else if (i === 3) {
      return Math.PI + this.theta;
    } else if (i === 4) {
      return 2 * Math.PI - this.theta;
    }
  }

  getXOffset() {
    this.xOffset = this.distance * Math.cos(this.theta);
  }

  getYOffset() {
    this.yOffset = this.distance * Math.sin(this.theta);
  }

  addOffset() {
    let i = getQuadrant(this.x1, this.y1, this.x2, this.y2);

    if (i === 1) {
      this.x2 = this.x1 + this.xOffset;
      this.y2 = this.y1 - this.yOffset;
    } else if (i === 2) {
      this.x2 = this.x1 - this.xOffset;
      this.y2 = this.y1 - this.yOffset;
    } else if (i === 3) {
      this.x2 = this.x1 - this.xOffset;
      this.y2 = this.y1 + this.yOffset;
    } else if (i === 4) {
      this.x2 = this.x1 + this.xOffset;
      this.y2 = this.y1 + this.yOffset;
    }
  }
  draw() {
    this.beginPath();
    this.moveToInitial();
    this.lineToFinal();
    this.setLineWidth();
    this.setStrokeColor();
    this.stroke();
  }

  update() {
    this.finalToMouse();
    this.getTheta();
    this.getXOffset();
    this.getYOffset();
    this.addOffset();

    this.draw();
  }
}

class Circle {
  constructor(
    x1 = middleX(),
    y1 = middleY(),
    r = 5,
    color = "grey",
    width = 2
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.r = r;
    this.color = color;
    this.width = width;
  }

  beginPath() {
    ctx.beginPath();
  }

  drawCircle() {
    ctx.arc(this.x1, this.y1, this.r, 0, 2 * Math.PI);
  }

  setLineWidth() {
    ctx.lineWidth = this.width;
  }

  setStrokeColor() {
    ctx.strokeStyle = this.color;
  }

  stroke() {
    ctx.stroke();
  }

  setfillColor() {
    ctx.fillStyle = this.color;
  }

  fill() {
    ctx.fill();
  }

  draw() {
    this.beginPath();
    this.drawCircle();
    this.setfillColor();
    this.fill();
  }

  update() {
    this.draw();
  }
}

class Arc {
  constructor(
    x1 = middleX(),
    y1 = middleY(),
    x2 = endX(),
    y2 = 0,
    color = "green",
    width = 3
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.width = width;

    this.distance = 200;
  }

  beginPath() {
    ctx.beginPath();
  }

  moveToInitial() {
    ctx.moveTo(this.x1, this.y1);
  }

  lineToFinal() {
    ctx.lineTo(this.x2, this.y2);
  }

  finalToMouse() {
    this.x2 = mouse.x;
    this.y2 = mouse.y;
  }

  setLineWidth() {
    ctx.lineWidth = this.width;
  }

  setStrokeColor() {
    ctx.strokeStyle = this.color;
  }

  stroke() {
    ctx.stroke();
  }

  dx() {
    return Math.abs(mouse.x - this.x1);
  }

  dy() {
    return Math.abs(mouse.y - this.y1);
  }

  getTheta() {
    this.theta = Math.atan2(this.dy(), this.dx());
  }

  radToDeg(angle) {
    return (angle * 180) / Math.PI;
  }

  updateThetaWithQuadrants() {
    let i = getQuadrant(this.x1, this.y1, this.x2, this.y2);

    if (i === 1) {
      this.theta = this.theta;
    } else if (i === 2) {
      this.theta = Math.PI - this.theta;
    } else if (i === 3) {
      this.theta = Math.PI + this.theta;
    } else if (i === 4) {
      this.theta = 2 * Math.PI - this.theta;
    }
  }

  getXOffset() {
    this.xOffset = this.distance * Math.cos(this.theta);
  }

  getYOffset() {
    this.yOffset = this.distance * Math.sin(this.theta);
  }

  addOffset() {
    let i = getQuadrant(this.x1, this.y1, this.x2, this.y2);

    if (i === 1) {
      this.x2 = this.x1 + this.xOffset;
      this.y2 = this.y1 - this.yOffset;
    } else if (i === 2) {
      this.x2 = this.x1 - this.xOffset;
      this.y2 = this.y1 - this.yOffset;
    } else if (i === 3) {
      this.x2 = this.x1 - this.xOffset;
      this.y2 = this.y1 + this.yOffset;
    } else if (i === 4) {
      this.x2 = this.x1 + this.xOffset;
      this.y2 = this.y1 + this.yOffset;
    }
  }

  drawArc() {
    ctx.arc(this.x1, this.y1, 50, 0, 2 * Math.PI - this.theta, true);
  }
  draw() {
    this.beginPath();
    this.drawArc();
    this.setStrokeColor();
    this.stroke();
  }

  update() {
    this.finalToMouse();
    this.getTheta();
    this.updateThetaWithQuadrants();
    this.getXOffset();
    this.getYOffset();
    this.addOffset();

    this.draw();
  }
}
// Function Definitions
function drawAxesFromCentre() {
  let verticle, horizontal, color, width;
  color = "rgba(0,0,0,0.5)";
  width = 1;

  verticle = new LineSegment(middleX(), 0, middleX(), endY(), color, width);
  horizontal = new LineSegment(0, middleY(), endX(), middleY(), color, width);

  return [horizontal, verticle];
}

// OBJECTS TO USED OR TESTED IN ANIMATE FUNCTION
base = new LineSegment();
[hAxis, vAxis] = drawAxesFromCentre();
arm = new Arm();
arc = new Arc();

circle = new Circle();
// ANIMATE SHOULD ALWAYS BE LAST
function animate() {
  requestAnimationFrame(animate);
  fillCanvasWithColor("white");

  // vAxis.update();
  // hAxis.update();
  arc.update();
  ctx.font = "20px serif";
  ctx.fillStyle = "black";
  ctx.fillText(
    `${Math.trunc(arc.radToDeg(arc.theta))}`,
    middleX() + 55,
    middleY() - 4
  );
  base.update();
  arm.update();
  circle.update();
}
animate();
