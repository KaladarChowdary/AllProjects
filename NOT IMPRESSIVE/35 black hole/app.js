const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: middleX(), y: middleY() };
let bnova,
  sArr = [];

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// Need to add all the others
window.addEventListener("resize", function () {
  maxify();

  bnova = new BlackNova();
  sArr = arrayOfType(SpaceObject, 1000);
});

//
//
//
//
//
// NEED TO REFACTOR
class BlackNova {
  constructor(x = middleX(), y = middleY(), radius = 5) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "black";
    this.rangeColor = "rgba(0, 0, 0, 0.2)";

    this.vibrateX = 2;
  }

  beginPath() {
    ctx.beginPath();
  }
  drawOutline() {
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  }
  applyLineColor() {
    ctx.strokeStyle = this.color;
  }
  stroke() {
    ctx.stroke();
  }
  applyFillColor() {
    ctx.fillStyle = this.color;
  }
  setLineWidth(width = 2) {
    ctx.lineWidth = width;
  }
  fill() {
    ctx.fill();
  }
  bounceCanvas() {
    if (this.y + this.radius >= canvas.height) {
      this.dy = negative(this.dy);
    } else if (this.y - this.radius <= 0) {
      this.dy = positive(this.dy);
    }

    if (this.x + this.radius >= canvas.width) {
      this.dx = negative(this.dx);
    } else if (this.x - this.radius <= 0) {
      this.dx = positive(this.dx);
    }
  }
  vibrate() {
    this.x += this.vibrateX;
    this.vibrateX = -this.vibrateX;
  }
  draw() {
    this.beginPath();
    this.drawOutline();
    this.stroke();
    this.applyFillColor();
    this.fill();
    this.closePath();
  }
  closePath() {
    ctx.closePath();
  }

  attractLittle() {
    sArr.forEach((object) => {
      if (object.merged === false) {
        let angle = getAngle(this.x, this.y, object.x, object.y);

        let dx = 0.5 * Math.cos(angle);
        let dy = 0.5 * Math.sin(angle);

        object.x -= dx;
        object.y += dy;

        if (
          getDistance(this.x, this.y, object.x, object.y) <= this.radius &&
          object.merged === false
        ) {
          object.merged = true;
          this.radius = radiusAfterMerge(this.radius, object.radius);
        }
      }
    });
  }

  update() {
    this.attractLittle();
    this.vibrate();
    this.draw();
    this.bounceCanvas();
  }
}

class SpaceObject {
  constructor(index) {
    this.radius = randRange(1, 5);
    this.x = getX(this.radius);
    this.y = getY(this.radius);
    this.color = randomColor();
    this.index = index;
    this.merged = false;

    // this.angleToBnova = getAngle(bnova.x, bnova.y, this.x, this.y);
    // this.closerX = Math.cos(this.angleToBnova);
    // this.closerY = -Math.sin(this.angleToBnova);
  }

  draw() {
    if (this.merged) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.draw();
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// FUNCTIONS
function maxify() {
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

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function positive(num) {
  return Math.abs(num);
}

function negative(num) {
  return -Math.abs(num);
}

function isInsideCircle(x1, y1, x2, y2, r2) {
  return getDistance(x1, y1, x2, y2) <= r2;
}

function fillCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, endX(), endY());
}

function giveCoordinates(size, gap) {
  let arr = [];
  let x = 0;
  let y = 0;
  let next = size + gap;

  for (let i = 0; y < canvas.height; i++) {
    y = i * next;
    for (let j = 0; x < canvas.width; j++) {
      x = j * next;
      arr.push([x, y]);
    }
    x = 0;
  }

  return arr;
}

function squaresWithCoordinates(arr, size) {
  let arr2 = [];

  arr.forEach(([x, y]) => {
    arr2.push(new Square(x, y, size));
  });

  return arr2;
}

function updateAll(arr) {
  arr.forEach((element) => {
    element.update();
  });
}

function onSquare(x1, y1, x2, y2, size2) {
  if (x1 < x2 || x1 > x2 + size2 || y1 < y2 || y1 > y2 + size2) {
    return false;
  }
  return true;
}

function drawAxes() {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(0, middleY());
  ctx.lineTo(endX(), middleY());
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(middleX(), 0);
  ctx.lineTo(middleX(), endY());
  ctx.stroke();
}

function getX(radius) {
  return randRange(radius + 5, endX() - radius - 5);
}

function getY(radius) {
  return randRange(radius + 5, endY() - radius - 5);
}

function randomColor(opacity = 1) {
  return `rgba(${randRange(0, 256)},${randRange(0, 256)},${randRange(
    0,
    256
  )},${opacity})`;
}

function between(a, b, x) {
  return a < x && x < b;
}

// 0 - 360 : from x1,y1 draw horizontal and go to x2, y2 in counterclockwise direction
function getAngleInDegrees(x1, y1, x2, y2) {
  return radToDeg(getAngle(x1, y1, x2, y2));
}
// 0 to 2*PI in counter clockwise direction
function getAngle(x1, y1, x2, y2) {
  let xdiff, ydiff, theta, updatedTheta;
  xdiff = dx(x1, x2);
  ydiff = dy(y1, y2);
  theta = getTheta(xdiff, ydiff);
  return updateThetaWithQuadrants(x1, y1, x2, y2, theta);
}

function dx(x1, x2) {
  return Math.abs(x1 - x2);
}

function dy(y1, y2) {
  return Math.abs(y1 - y2);
}

// assuming dx and dy both are positive
function getTheta(dx, dy) {
  return Math.atan2(dy, dx);
}

function radToDeg(angle) {
  return (angle * 180) / Math.PI;
}

function arrayOfType(clss, n) {
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(new clss(i));
  }

  return arr;
}

function radiusAfterMerge(r1, r2) {
  return Math.sqrt(r1 * r1 + r2 * r2);
}

// Given angle, use x1, y1 and x2, y2 to convert into proper angle in coordinate system
function updateThetaWithQuadrants(x1, y1, x2, y2, theta) {
  let i = getQuadrant(x1, y1, x2, y2);

  if (i === 1) {
    theta = theta;
  } else if (i === 2) {
    theta = Math.PI - theta;
  } else if (i === 3) {
    theta = Math.PI + theta;
  } else if (i === 4) {
    theta = 2 * Math.PI - theta;
  }

  return theta;
}

// Quadrant according to coordinate system
function getQuadrant(x1, y1, x2, y2) {
  if (x2 > x1 && y2 <= y1) return 1;
  else if (x2 <= x1 && y2 < y1) return 2;
  else if (x2 < x1 && y2 >= y1) return 3;
  else if (x2 >= x1 && y2 > y1) return 4;
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// LAST BEFORE THE FUNCTIONS

bnova = new BlackNova();
sArr = arrayOfType(SpaceObject, 1000);
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("white");

  bnova.x = mouse.x;
  bnova.y = mouse.y;

  updateAll(sArr);
  bnova.update();
}
animate();
