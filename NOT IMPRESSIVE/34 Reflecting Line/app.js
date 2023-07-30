const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
let line;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Circle {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
  }
}

const Cobj = new Circle(10, 10, 10, "rgba(255, 0, 0, 0.2)");

window.addEventListener("dblclick", function (evt) {
  line.getDxDy();
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// CLASS
// Needs double click to get direction
class Line {
  constructor(initX = 0, initY = middleY()) {
    this.x = initX;
    this.y = initY;

    this.dx = 0;
    this.dy = 0;

    this.fastDx = 5;
    this.fastDy = 5;

    this.firstTime = true;
  }

  getDxDy() {
    if (this.dx === 0 && this.dy === 0) {
      let angle = getAngle(this.x, this.y, mouse.x, mouse.y);
      this.dx = Math.cos(angle);
      this.dy = -Math.sin(angle);
    }
  }

  updateXandY() {
    this.x += this.dx;
    this.y += this.dy;
  }

  bounceFromBoundary() {
    if (this.x <= 0) {
      this.dx = positive(this.dx);
    } else if (this.x >= endX()) {
      this.dx = negative(this.dx);
    }
    if (this.y <= 0) {
      this.dy = positive(this.dy);
      console.log(this.dy);
    } else if (this.y >= endY()) {
      this.dy = negative(this.dy);
    }
  }

  beginPath() {
    ctx.beginPath();
  }
  move() {
    ctx.moveTo(this.x, this.y);
  }
  line() {
    ctx.lineTo(this.x, this.y);
  }
  setColorRed() {
    ctx.strokeStyle = "red";
  }
  setLineWidthTwo() {
    ctx.lineWidth = 2;
  }
  Stroke() {
    ctx.stroke();
  }

  draw() {
    if (this.firstTime) {
      this.firstTime = false;
      this.beginPath();

      this.move();
    } else {
      this.line();
    }
    this.setColorRed();
    this.setLineWidthTwo();
    this.Stroke();
  }

  update() {
    this.bounceFromBoundary();
    this.draw();
    this.updateXandY();
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

function insideCircle(x1, y1, x2, y2, r2) {
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

function makeSquares(arr, size) {
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

function isInsideCircle(x1, y1, x2, y2, r2) {
  return getDistance(x1, y1, x2, y2) <= r2;
}
// 0 - 360 : ANGLE BETWEEN TWO POINTS

function getAngleInDegrees(x1, y1, x2, y2) {
  return radToDeg(getAngle(x1, y1, x2, y2));
}
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

function getTheta(dx, dy) {
  return Math.atan2(dy, dx);
}

function radToDeg(angle) {
  return (angle * 180) / Math.PI;
}

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

function getQuadrant(x1, y1, x2, y2) {
  if (x2 > x1 && y2 <= y1) return 1;
  else if (x2 <= x1 && y2 < y1) return 2;
  else if (x2 < x1 && y2 >= y1) return 3;
  else if (x2 >= x1 && y2 > y1) return 4;
}

function pointAtCentre() {
  ctx.beginPath();
  ctx.arc(middleX(), middleY(), 5, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

function drawAxes() {
  ctx.beginPath();
  ctx.moveTo(0, middleY());
  ctx.lineTo(endX(), middleY());
  ctx.strokeStyle = "grey";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(middleX(), 0);
  ctx.lineTo(middleX(), endY());
  ctx.strokeStyle = "grey";
  ctx.stroke();

  ctx.closePath();
}

// END OF FUNCTIONS

line = new Line();

function animate() {
  requestAnimationFrame(animate);
  fillCanvas("white");

  line.update();
}
animate();
