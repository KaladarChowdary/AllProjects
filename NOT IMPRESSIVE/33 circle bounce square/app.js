const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: -1000, y: -1000 };
let size, gap;
size = 50;
gap = 10;
let ball, coordinates, squareArray;

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// Need to add all the others
window.addEventListener("resize", function () {
  maxify();
  coordinates = giveCoordinates(size, gap);
  squareArray = squaresWithCoordinates(coordinates, size);
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

class Square {
  constructor(x = middleX(), y = middleY(), size = 50) {
    this.size = size;
    this.x = x;
    this.y = y;

    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;

    this.before = false;
    this.current = false;

    this.fillColor = "black";
    this.strokeColor = "black";
  }
  beginPath() {
    ctx.beginPath();
  }
  applyStrokeColor() {
    ctx.strokeStyle = this.strokeColor;
  }
  strokeRect() {
    ctx.strokeRect(this.x, this.y, this.size, this.size);
  }
  updateFillColor() {
    ctx.fillStyle = this.fillColor;
  }
  fillRect() {
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  closePath() {
    ctx.closePath();
  }
  drawBorder() {
    this.beginPath();
    this.applyStrokeColor();
    this.strokeRect();
    this.closePath();
  }
  isMouseOnMe() {
    return onSquare(mouse.x, mouse.y, this.x, this.y, this.size);
  }
  // Finds angle from centre of ball to center of square and Offset X and Y points assuming ball centre as zero, zero
  getOffsetsFromBallCenter() {
    this.angleFromBall = getAngle(ball.x, ball.y, this.centreX, this.centreY);
    this.offsetX = ball.radius * Math.cos(this.angleFromBall);
    this.offsetY = ball.radius * Math.sin(this.angleFromBall);
  }
  drawLineToBall() {
    this.getOffsetsFromBallCenter();

    ctx.beginPath();
    ctx.moveTo(this.centreX, this.centreY);

    ctx.lineTo(ball.x + this.offsetX, ball.y - this.offsetY);
    ctx.stroke();
    ctx.closePath();
  }
  isSqrCtrInCircle() {
    return isInsideCircle(
      this.centreX,
      this.centreY,
      ball.x,
      ball.y,
      ball.radius
    );
  }
  angleEndInsideSquare() {
    this.getOffsetsFromBallCenter();
    return onSquare(
      ball.x + this.offsetX,
      ball.y - this.offsetY,
      this.x,
      this.y,
      this.size
    );
  }
  // Only two conditions to detect intersection
  // Not enough, need more clarity
  doesBallIntersect() {
    // console.log(this.angleEndInsideSquare());
    return this.angleEndInsideSquare() || this.isSqrCtrInCircle();
  }
  fill() {
    this.updateFillColor();
    this.fillRect();
  }
  getAngleOfTouch() {
    this.getOffsetsFromBallCenter();
    return getAngle(
      this.centreX,
      this.centreY,
      ball.x + this.offsetX,
      ball.y - this.offsetY
    );
  }
  // ERROR IN REFLECTION MOSTLY BECAUSE OF THIS. 'doesBallIntersect()' may not be covering all the cases
  // ALWAYS AT THE BEGINING OF UPDATE AND NO WHERE ELSE
  updateBeforeandAfter() {
    this.before = this.current;
    // this.current = this.doesBallIntersect();
    this.current = BallSquareCollision(
      ball.x,
      ball.y,
      ball.radius,
      this.x,
      this.y,
      this.size
    );
  }
  drawAndFill() {
    this.fill();
    this.drawBorder();
  }
  // Assumes before and after are already updated
  detectCollision() {
    return !this.before && this.current;
  }
  // Assumes before and after are already updated.
  // Detects side of collision and Changes ball direction
  reflectOnCollision() {
    if (this.detectCollision()) {
      this.angle = radToDeg(this.getAngleOfTouch());
      this.angle = Math.floor(this.angle);

      if (between(360 - 45, 360, this.angle)) {
        ball.dx = positive(ball.dx);
      } else if (between(-1, 45, this.angle)) {
        ball.dx = positive(ball.dx);
      } else if (between(90 - 45, 90 + 45, this.angle)) {
        ball.dy = negative(ball.dy);
      } else if (between(180 - 45, 180 + 45, this.angle)) {
        ball.dx = negative(ball.dx);
      } else if (between(270 - 45, 270 + 45, this.angle)) {
        ball.dy = positive(ball.dy);
      } else {
        console.log("----", this.angle);
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
      }
    }
  }

  update() {
    this.updateBeforeandAfter();

    if (this.isMouseOnMe()) {
      this.fill();
      if (this.before === false && this.current === true) {
        this.reflectOnCollision();
      }
    } else {
      this.drawBorder();
    }
  }
}

//
//
//
//
//
// NEED TO REFACTOR
class Ball {
  constructor(x = middleX(), y = middleY(), radius = 30, color = "red") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.dx = 5 * (0.5 - Math.random());
    this.dy = 5 * (0.5 - Math.random());
  }

  beginPath() {
    ctx.beginPath();
  }
  drawOutlineOfCircle() {
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  }
  applyLineColor() {
    ctx.strokeStyle = this.color;
  }
  stroke() {
    ctx.stroke();
  }
  fillColor() {
    ctx.fillStyle = this.color;
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
  updateXandY() {
    this.x += this.dx;
    this.y += this.dy;
  }
  draw() {
    this.beginPath();
    this.applyLineColor();
    this.drawOutlineOfCircle();
    this.fillColor();
    this.fill();
    this.stroke();
  }
  update() {
    this.updateXandY();
    this.draw();
    this.bounceCanvas();
  }
}
//

//
//
//
//
//
// LAST BEFORE THE FUNCTIONS
coordinates = giveCoordinates(size, gap);
squareArray = squaresWithCoordinates(coordinates, size);
ball = new Ball(80, 80);
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("white");

  squareArray.forEach((sqare) => {
    sqare.update();
  });
  ball.update();
}
animate();
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
