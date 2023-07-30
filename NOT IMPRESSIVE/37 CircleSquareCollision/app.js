const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: -2000, y: -2000 };
let ball, rect;

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// Need to add all the others
window.addEventListener("resize", function () {
  maxify();
  ball = new Ball();
  rect = new Rectangle();
});

//
//
//
//
//
// NEED TO REFACTOR

class Ball {
  constructor(x = middleX(), y = middleY(), radius = 40, color = "red") {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;

    this.previous = false;
    this.current = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  setToMouse() {
    this.x = mouse.x;
    this.y = mouse.y;
  }
  update() {
    this.setToMouse();
    this.draw();
  }
}

// RECTANGLE
class Rectangle {
  constructor(
    size = 100,
    x = middleX() - size / 2,
    y = middleY() - size / 2,
    color = "green"
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.hyp = Math.sqrt(size * size + size * size);
  }

  colorRectangle() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  lengthWhenBallAtEdge() {
    return getDistance(
      ball.x,
      ball.y,
      this.x + this.size / 2,
      this.y + this.size / 2
    );
  }

  isBallCollided() {
    if (
      ball.x + ball.radius < this.x ||
      ball.x - ball.radius > this.x + this.size ||
      ball.y + ball.radius < this.y ||
      ball.y - ball.radius > this.y + this.size ||
      this.lengthWhenBallAtEdge() > ball.radius + this.hyp / 2
    ) {
      return false;
    } else {
      return true;
    }
  }

  update() {
    if (
      BallSquareCollision(
        ball.x,
        ball.y,
        ball.radius,
        this.x,
        this.y,
        this.size
      )
    ) {
      this.color = "rgba(256, 0, 0, 0.5)";
    } else {
      this.color = "green";
    }
    this.colorRectangle();
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

function BallSquareCollision(x1, y1, r1, x2, y2, size2) {
  if (
    x1 + r1 < x2 ||
    x1 - r1 > x2 + size2 ||
    y1 + r1 < y2 ||
    y1 - r1 > y2 + size2 ||
    getDistance(x1, y1, x2 + size2 / 2, y2 + size2 / 2) >
      r1 + Math.sqrt(size2 * size2 + size2 * size2) / 2
  ) {
    return false;
  } else {
    return true;
  }
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
ball = new Ball();
rect = new Rectangle();
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("white");

  rect.update();
  ball.update();
}
animate();
