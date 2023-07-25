// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO CANVAS X AND Y

// Sets canvas width 10 less than window width. Complete canvas lies inside windows
function maxify(cutBy = 5.5) {
  canvas.width = window.innerWidth - cutBy;
  canvas.height = window.innerHeight - cutBy;
}

// Returns x co-ordinate of canvas center
function middleX() {
  return canvas.width / 2;
}

// Returns y co-ordinate of canvas center
function middleY() {
  return canvas.height / 2;
}

// Returns x co-ordinate at end
function endX() {
  return canvas.width;
}

// Returns y co-ordinate at end
function endY() {
  return canvas.height;
}

// Fills entire canvas with
function fillCanvas(color = "white") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

// Clears entire canvas
function clearCanvas() {
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

// Draws horizontal axis
function drawHorizontal(color = "grey") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(0, middleY());
  ctx.lineTo(endX(), middleY());
  ctx.stroke();
  ctx.closePath();
}

// Draws verticle axis
function drawVerticle(color = "grey") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  drawAxes;
  ctx.moveTo(middleX(), 0);
  ctx.lineTo(middleX(), endY());
  ctx.stroke();
  ctx.closePath();
}

function drawAxes(color = "grey") {
  drawHorizontal(color);
  drawVerticle(color);
}

// Acceptable X coordinate for circle of given radius
function getAcceptableX(radius) {
  radius += 1;
  return randRange(radius, endX() - radius);
}

// Acceptable Y coordinate for circle of given radius
function getAcceptableY(radius) {
  radius += 1;
  return randRange(radius, endY() - radius);
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO RANDOM

// Random rational number from min to max not including max
function randRange(min, max) {
  return min + Math.random() * (max - min);
}

// Random integer from min to max, not including max
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

// Return random element of array
function randItem(arr) {
  return arr[randInt(0, arr.length)];
}

function randomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

// Returns random color
function randomColor(opacity = 1) {
  return `rgba(${randRange(0, 256)},${randRange(0, 256)},${randRange(
    0,
    256
  )},${opacity})`;
}

function positive(number) {
  return Math.abs(number);
}

function negative(number) {
  return -Math.abs(number);
}

function absDiff(x1, x2) {
  return Math.abs(x1 - x2);
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO DISTANCE AND COORDINATE GEOMETRY

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function isPointInsideCircle(x1, y1, x2, y2, r2) {
  return getDistance(x1, y1, x2, y2) <= r2;
}

function isPointInsideSquare(x1, y1, x2, y2, size2) {
  return !(x1 < x2 || x1 > x2 + size2 || y1 < y2 || y1 > y2 + size2);
}

function isPointInsideRectangle(x1, y1, x2, y2, length2, breadth2) {
  return !(x1 < x2 || x1 > x2 + length2 || y1 < y2 || y1 > y2 + breadth2);
}

function getDegreeFromRadian(rad) {
  return (rad * 180) / Math.PI;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS RELATED TO DISTANCE AND COORDINATE GEOMETRY

function updateArray(arr) {
  arr.forEach((object) => {
    object.update();
  });
}

function updateObject(obj) {
  for (const objt in Object.values(obj)) {
    objt.update();
  }
}

function arrayOfObjects(n, clas) {
  let i, arr;
  arr = [];

  for (i = 0; i < n; i++) {
    arr.push(new clas());
  }

  return arr;
}

function newX(x, y, r, theta = 0) {
  return x + r * Math.cos(theta);
}

function newY(x, y, r, theta = 0) {
  return y - r * Math.sin(theta);
}

function drawLineSegment(x1, y1, x2, y2, color, lineWidth) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMPLEX FUNCTIONS

// Cooridnates that fill up entire canvas
function giveCoordinatesArray(size, gap) {
  let x, y, offset, arr;
  x = 0;
  y = 0;
  offset = size + gap;
  arr = [];

  for (let i = 0; y < endY(); i++) {
    y = i * offset;
    for (let j = 0; x < endX(); j++) {
      x = j * offset;
      arr.push([x, y]);
    }
    x = 0;
  }

  return arr;
}

// getQuadrant of x2,y2 with x1, y1 as origin
// Use canvas coordinate system
function getQuadrant(x1, y1, x2, y2) {
  if (x2 >= x1 && y2 <= y1) return 1;
  else if (x2 <= x1 && y2 < y1) return 2;
  else if (x2 < x1 && y2 >= y1) return 3;
  else if (x2 >= x1 && y2 > y1) return 4;
}

// Give actual theta with respect to quadrant
// Assuming angle to be radian
// Giving angle between 0 to 2 PI
function getActualTheta(theta, quadrant) {
  if (quadrant === 1) return theta;
  else if (quadrant === 2) return Math.PI - theta;
  else if (quadrant === 3) return Math.PI + theta;
  else if (quadrant === 4) return 2 * Math.PI - theta;
}

// GET ANGLE FROM 0 TO 2*PI IN RADIANS
// ASSUME X1,Y1 AS ORIGIN

function getAngle(x1, y1, x2, y2) {
  let opp, adj, theta, quadrant;
  opp = Math.abs(y2 - y1);
  adj = Math.abs(x2 - x1);
  theta = Math.atan2(opp, adj);
  quadrant = getQuadrant(x1, y1, x2, y2);
  return getActualTheta(theta, quadrant);
}

function getAngleInDegrees(x1, y1, x2, y2) {
  return getDegreeFromRadian(getAngle(x1, y1, x2, y2));
}

function hypot(x, y) {
  return Math.sqrt(x * x, y * y);
}

function doesCircleSquareIntersect(cX, cY, cR, x2, y2, size2) {
  return !(
    cX + cR < x2 ||
    cX - cR > x2 + size2 ||
    cY + cR < y2 ||
    cY - cR > y2 + size2 ||
    getDistance(cX, cY, x2 + size2 / 2, y2 + size2 / 2) >
      cR + hypot(size2, size2) / 2
  );
}

function doesCircleRectangleIntersect(cX, cY, cR, x2, y2, length2, breadth2) {
  return !(
    cX + cR < x2 ||
    cX - cR > x2 + length2 ||
    cY + cR < y2 ||
    cY - cR > y2 + breadth2 ||
    getDistance(cX, cY, x2 + length2 / 2, y2 + breadth2 / 2) >
      cR + hypot(length2, breadth2) / 2
  );
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMPLEX FUNCTIONS

function drawCircle(
  x = middleX(),
  y = middleY(),
  r = 10,
  lineColor = "black",
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawBall(
  x = middleX(),
  y = middleY(),
  r = 10,
  lineWidth = 1,
  fillColor = "black",
  lineColor = "black"
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = lineWidth;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawRectangle(
  x = middleX(),
  y = middleY(),
  length = 10,
  breadth = 20,
  lineColor = "black",
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, length, breadth);
  ctx.stroke();
  ctx.closePath();
}

function fillRectangle(
  x = middleX(),
  y = middleY(),
  length = 10,
  breadth = 20,
  fillColor = "black",
  lineColor = fillColor,
  lineWidth = 1
) {
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = fillColor;
  ctx.strokeRect(x, y, length, breadth);
  ctx.fillRect(x, y, length, breadth);
  ctx.stroke();
  ctx.closePath();
}

function moveTo(x, targetX, step) {
  if (x > targetX) {
    return Math.max(x - step, targetX);
  } else if (x < targetX) {
    return Math.min(x + step, targetX);
  } else {
    return targetX;
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
let mouse = { x: -200, y: -200 };
let red, green, blue, size, half, gap, Y, target, board;
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CLASS
class Board {
  // Takes x and places it at the middle of the top. And takes size too
  constructor(size = 400, x = middleX() - size / 2, y = 0) {
    this.x = x;
    this.y = y;
    this.size = size;

    // Gets it's centreX and centreY
    target = {};
    target.x = this.x + this.size / 2;
    target.y = this.y + this.size / 2;

    // Initializes r, g and b to zero
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }

  // Other object calls it, takes a color and increments according to that
  changeColor(color = "black") {
    if (color === "red") {
      this.r += 5;
    } else if (color === "green") {
      this.g += 5;
    } else if (color === "blue") {
      this.b += 5;
    }
  }

  // Just draws
  update() {
    this.draw();
  }

  // Draws rectangle with color according to the values of R, G, B
  draw() {
    fillRectangle(
      this.x,
      this.y,
      this.size,
      this.size,
      `rgb(${this.r}, ${this.g}, ${this.b})`,
      "white",
      1
    );
  }
}
board = new Board();

class FireBall {
  // Actual fireball, takes starting position, final position and size
  // Creates speed according to those positions, increases it by speed factor
  constructor(
    x1 = endX(),
    y1 = endY(),
    x2 = 0,
    y2 = 0,
    radius = 10,
    color = "white",
    speedFactor = 5
  ) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.radius = radius;
    this.color = color;

    this.speedFactor = speedFactor;
    this.getDxDy();
  }

  AmIOut() {
    return (
      this.x1 + this.radius < 0 ||
      this.x1 - this.radius > canvas.width ||
      this.y1 + this.radius < 0 ||
      this.y1 - this.radius > canvas.height
    );
  }

  // Updates the position of fireball
  updateXY() {
    this.x1 += this.dx;
    this.y1 += this.dy;
  }

  // Calculates dx and dy according to the position to be reached and speedfactor
  getDxDy() {
    let theta = getAngle(this.x1, this.y1, this.x2, this.y2);
    this.dx = this.speedFactor * Math.cos(theta);
    this.dy = this.speedFactor * -Math.sin(theta);
  }

  // Updates the position and draws the ball. Over and over and over again
  update() {
    this.updateXY();
    this.draw();
  }

  // Simply draws the ball
  draw() {
    drawBall(this.x1, this.y1, this.radius, 1, this.color, this.color);
  }
}

class SquareCanon {
  // Takes properties of cannon as well as the fireballs of it, since it shoots
  // Takes position and size and color of square
  // Takes targ for target and stuff, but gotta delete and add x2 and y2 explicitly.

  // Fireball births at square, Get's radius from here, gets final position from target
  // Then get's intervals for creation

  // Get's an empty ball array
  constructor(
    x = middleX() - 25,
    y = middleY() - 25,
    size = 50,
    color = "white",

    radius = 10,
    speedFactor = 5,
    interval = 10,
    targ = target
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;

    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;

    this.radius = radius;
    this.speedFactor = speedFactor;
    this.target = targ;

    this.interval = interval;
    this.index = 0;

    this.ballArray = [];
  }

  // If ball's centre is inside board
  // Delete the first ball that's fired
  // Update the board color with color of square
  touchingBoard(ball) {
    if (isPointInsideSquare(ball.x1, ball.y1, board.x, board.y, board.size)) {
      this.ballArray.shift();
      board.changeColor(this.color);
    }
  }

  // Creates ball, from it's centre to target's position. With size and speed
  createBall() {
    this.ballArray.push(
      new FireBall(
        this.centreX,
        this.centreY,
        this.target.x,
        this.target.y,
        this.radius,
        this.color,
        this.speedFactor
      )
    );
  }

  // Return whether given ball moved out of canvas or not
  outOfCanvas(ball) {
    console.log(ball.AmIOut());
    return ball.AmIOut();
  }

  // Update balls of this square cannon
  moveAndCheckForCollision() {
    for (let ball of this.ballArray) {
      ball.update();
      this.touchingBoard(ball);
    }
  }

  // When mouse is on square. Run the countdown. When it reaches limit then shoot the ball. Reinitialize the countdown
  addBallAtInterval() {
    if (this.isMouseOnSquare()) {
      this.index++;
      if (this.index % this.interval === 0) {
        this.index = 0;
        this.createBall();
      }
    } else {
      this.index = 0;
    }
  }

  // Return whether mouse is on square or not
  isMouseOnSquare() {
    return isPointInsideSquare(mouse.x, mouse.y, this.x, this.y, this.size);
  }

  // Add ball's at intervals, Update those balls.
  update() {
    this.addBallAtInterval();
    this.moveAndCheckForCollision();
    this.draw();
  }

  // Draw the square
  draw() {
    fillRectangle(
      this.x,
      this.y,
      this.size,
      this.size,
      this.color,
      this.color,
      1
    );
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// EVENT LISTENERS
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// Draw new board at centre, it will update target
// Create all 3 squares at the bottom
// Their x positions accordingly
// Leave default fireball parameters as it is
window.addEventListener("resize", function () {
  maxify();

  board = new Board();

  Y = endY() - size - 5;
  red = new SquareCanon(middleX() - size - gap - half, Y, 50, "red");
  green = new SquareCanon(middleX() - half, Y, 50, "green");
  blue = new SquareCanon(middleX() + size + gap - half, Y, 50, "blue");
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CLASSES

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ANIMATE
size = 50;
half = size / 2;
gap = 100;

Y = endY() - size - 5;

red = new SquareCanon(middleX() - size - gap - half, Y, 50, "red");
green = new SquareCanon(middleX() - half, Y, 50, "green");
blue = new SquareCanon(middleX() + size + gap - half, Y, 50, "blue");

fillCanvas("black");
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("rgb(0, 0, 0, 0.2)");

  red.update();
  green.update();
  blue.update();
  board.update();
}
animate();

// SOMETHINGS CHANGING WHEN IT BECOMING FULL SCREEN
