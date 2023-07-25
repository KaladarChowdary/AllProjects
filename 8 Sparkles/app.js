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
  for (const objt of Object.values(obj)) {
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
  lineWidth = 1,
  lineColor = fillColor
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

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
let mouse, balls, setOfBalls, index, index2;
mouse = { x: middleX(), y: middleY() };
index = 0;
index2 = 0;
setOfBalls = {};
balls = {};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// EVENT LISTENERS
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  maxify();
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CLASSES

class Ball {
  // Takes index of the object
  // Takes position and starting size
  // Takes color and direction of motion
  // Takes accelaration and decreasing factor
  constructor(
    i,
    x = middleX(),
    y = middleY(),

    radius = 5,
    linewidth = 1,
    lineColor = "white",
    fillColor = "white",

    dx = 1,
    dy = -1,
    a = 0.05,
    cutBy = 0.05
  ) {
    this.i = i;

    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.radius = radius;

    this.linewidth = linewidth;
    this.lineColor = lineColor;
    this.fillColor = fillColor;

    this.dx = dx;
    this.dy = dy;
    this.a = a;

    this.cutBy = cutBy;
  }

  // Decreases radius by cutBy
  decreaseRadius() {
    this.radius -= this.cutBy;
  }

  // Adds downward accelaration
  accelarate() {
    this.dy += this.a;
  }

  // Adds speed to ball
  updateXY() {
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += this.dx;
    this.y += this.dy;
  }

  // Boucing of 4 borders of canvas
  bounceOnCollision() {
    if (this.x + this.radius >= canvas.width) {
      this.dx = negative(this.dx);
    } else if (this.x - this.radius <= 0) {
      this.dx = positive(this.dx);
    }

    if (this.y + this.radius >= canvas.height) {
      this.dy = 0.8 * negative(this.dy);
    } else if (this.y - this.radius <= 0) {
      this.dy = positive(this.dy);
    }
  }

  // Draws as long as radius isn't zero
  draw() {
    if (this.radius < 0) return;

    drawLineSegment(this.oldX, this.oldY, this.x, this.y, "white", this.radius);
  }

  // Ball moves in initial direction
  // While downward accelaration acts on it
  // While it's radius is getting decreased
  update() {
    this.updateXY();
    this.accelarate();
    this.bounceOnCollision();
    this.draw();
    this.decreaseRadius();
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ANIMATE

// Creates objects around the mouse;
// Creates at mouse position
// Creates by limit
// Their speeds cover 360 degrees
function createSparkles() {
  let x, y, radius, lineWidth, theta, dx, dy, a, cutBy, obj, limit, color;

  obj = {};
  x = mouse.x;
  y = mouse.y;
  lineWidth = 1;
  a = 0.05;
  cutBy = 0.02;
  limit = 70;

  for (let i = 1; i <= limit; i++) {
    radius = randRange(1, 5);
    theta = (i / limit) * 2 * Math.PI;
    dx = randRange(2, 3) * Math.cos(theta);
    dy = randRange(2, 3) * -Math.sin(theta);
    color = "white";

    obj[index] = new Ball(
      index,
      x,
      y,
      radius,
      lineWidth,
      color,
      color,
      dx,
      dy,
      a,
      cutBy
    );
    index++;
  }

  return obj;
}

let temp = [];
let i = 1,
  time = 3;

temp.push(createSparkles());

function animate() {
  requestAnimationFrame(animate);
  fillCanvas("black");

  // Updating set of set of sparkcles
  for (let obj of temp) {
    updateObject(obj);
  }

  // Creating new set for every 'time'
  if (i % time === 0) {
    i = 0;
    temp.push(createSparkles());
  }

  // When set of 360 sets increase by 15 then delete the very first one
  if (temp.length >= 30) {
    temp.shift();
  }
  i++;
}
animate();

//  HIGHEST QUALITY CODE
// --- EASY TO UNDERSTAND
// --- EASY TO UPDATE

// --- MODULAR
