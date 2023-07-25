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
function drawHorizontal(y = middleY(), color = "grey") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(0, y);
  ctx.lineTo(endX(), y);
  ctx.stroke();
  ctx.closePath();
}

// Draws verticle axis
function drawVerticle(x = middleX(), color = "grey") {
  ctx.beginPath();
  ctx.strokeStyle = color;
  drawAxes;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, endY());
  ctx.stroke();
  ctx.closePath();
}

function drawAxes(color = "grey") {
  drawHorizontal(middleY(), color);
  drawVerticle(middleX(), color);
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
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
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
  return Math.sqrt(x * x + y * y);
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
// TESTED FUNCTIONS
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

function drawBall(
  x = middleX(),
  y = middleY(),
  r = 10,
  fillColor = "black",
  lineColor = "black",
  lineWidth = 1
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

function circleAwayFromSquare(cX, cY, cR, x2, y2, size2) {
  return (
    cX + cR < x2 ||
    cX - cR > x2 + size2 ||
    cY + cR < y2 ||
    cY - cR > y2 + size2 ||
    getDistance(cX, cY, x2 + size2 / 2, y2 + size2 / 2) >
      cR + hypot(size2, size2) / 2
  );
}

function circleAwayFromRectangle(cX, cY, cR, x2, y2, length2, breadth2) {
  return (
    cX + cR < x2 ||
    cX - cR > x2 + length2 ||
    cY + cR < y2 ||
    cY - cR > y2 + breadth2 ||
    getDistance(cX, cY, x2 + length2 / 2, y2 + breadth2 / 2) >
      cR + hypot(length2, breadth2) / 2
  );
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VARIABLE DECLARATIONS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
let mouse = { x: middleX(), y: middleY() };
let Cooridnates, squareArray, size, gap, square;
let mouseOnCanvas, scolor, pcolor, ball, ballcolor;
mouseOnCanvas = false;
scolor = "white";
pcolor = "red";
ballcolor = "green";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// EVENT LISTENERS
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  maxify();

  squareArray = CreateSquareArray(size, gap);
});

canvas.addEventListener("mouseenter", function () {
  mouseOnCanvas = true;
});

canvas.addEventListener("mouseleave", function () {
  mouseOnCanvas = false;
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CLASSES
class Ball {
  constructor(x = middleX(), y = middleY(), radius = 20, color = ballcolor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.getRandomSpeed();

    this.current = false;
  }

  ballNotHereBefore(square) {
    return circleAwayFromSquare(
      this.x - this.dx,
      this.y - this.dy,
      this.radius,
      square.x,
      square.y,
      square.length
    );
  }

  reactToSolid() {
    this.color = "green";
    for (let sqr of squareArray) {
      if (sqr.solid) {
        if (
          !circleAwayFromSquare(
            this.x,
            this.y,
            this.radius,
            sqr.x,
            sqr.y,
            sqr.length
          )
        ) {
          if (this.ballNotHereBefore(sqr)) {
            this.color = "black";
            updateOnCollison(this, sqr);
          }
        }
      }
    }
  }

  bounceOffCanvasBorders() {
    if (this.x + this.radius >= canvas.width) {
      this.dx = negative(this.dx);
    } else if (this.x - this.radius <= 0) {
      this.dx = positive(this.dx);
    }

    if (this.y + this.radius >= canvas.height) {
      this.dy = negative(this.dy);
    } else if (this.y - this.radius <= 0) {
      this.dy = positive(this.dy);
    }
  }

  updateXY() {
    this.bounceOffCanvasBorders();
    this.x += this.dx;
    this.y += this.dy;
  }

  getRandomSpeed() {
    this.dx = randomSign() * randRange(1, 2);
    this.dy = randomSign() * randRange(1, 2);
  }

  update() {
    this.reactToSolid();
    this.updateXY();
    this.draw();
  }

  draw() {
    drawBall(this.x, this.y, this.radius, this.color);
  }
}

class Rectangle {
  constructor(
    x = middleX(),
    y = middleY(),
    length = 100,
    breadth = 50,
    fillColor = "white",
    lineColor = "white",
    lineWidth = 1
  ) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.breadth = breadth;
    this.fillColor = fillColor;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;
  }

  update() {
    this.draw();
  }

  draw() {
    fillRectangle(
      this.x,
      this.y,
      this.length,
      this.breadth,
      this.fillColor,
      this.lineColor,
      this.lineWidth
    );
  }
}

class Square {
  constructor(x = middleX(), y = middleY(), length = 100, color = "white") {
    this.x = x;
    this.y = y;
    this.length = length;
    this.color = color;
    this.solid = false;
  }

  reactToMouse() {
    if (this.isMouseInside()) {
      this.solid = true;
      this.color = pcolor;
    } else {
      this.solid = false;
      this.color = scolor;
    }
  }

  isMouseInside() {
    if (mouseOnCanvas) {
      return isPointInsideSquare(mouse.x, mouse.y, this.x, this.y, this.length);
    } else {
      this.solid = false;
      return false;
    }
  }

  update() {
    this.reactToMouse();
    this.draw();
  }

  draw() {
    fillRectangle(this.x, this.y, this.length, this.length, this.color);
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ANIMATE

function CreateSquareArray(size = 10, gap = 3) {
  Cooridnates = giveCoordinatesArray(size, gap);
  arr = [];
  for (let [x, y] of Cooridnates) {
    arr.push(new Square(x, y, size, scolor));
  }

  return arr;
}

function getSideOfCollision(angle) {
  angle = Math.trunc(angle);
  if (angle > 90 - 45 && angle < 90 + 45) {
    return "top";
  } else if (angle > 180 - 45 && angle < 180 + 45) {
    return "left";
  } else if (angle > 270 - 45 && angle < 270 + 45) {
    return "bottom";
  } else if (angle < 45 || angle > 270 + 45) {
    return "right";
  } else if (angle === 90 - 45) {
    return "topright";
  } else if (angle === 90 + 45) {
    return "topleft";
  } else if (angle === 270 - 45) {
    return "bottomleft";
  } else if (angle === 270 + 45) {
    return "bottomright";
  }
}

function updateDxDyAngle(side, dx, dy) {
  switch (side) {
    case "top":
      return [dx, negative(dy)];
    case "bottom":
      return [dx, positive(dy)];
    case "right":
      return [positive(dx), dy];
    case "left":
      return [negative(dx), dy];
    case "topright":
      return [positive(dx), negative(dy)];
    case "topleft":
      return [negative(dx), negative(dy)];
    case "bottomright":
      return [positive(dx), positive(dy)];
    case "bottomleft":
      return [negative(dx), positive(dy)];

    default:
      return [dx, dy];
  }
}

function updateOnCollison(ball, box) {
  if (
    !circleAwayFromSquare(ball.x, ball.y, ball.radius, box.x, box.y, box.length)
  ) {
    let angle, side;

    angle = getAngleInDegrees(
      box.x + box.length / 2,
      box.y + box.length / 2,
      ball.x,
      ball.y
    );

    side = getSideOfCollision(angle);

    [ball.dx, ball.dy] = updateDxDyAngle(side, ball.dx, ball.dy);
  }
}

size = 50;
gap = 6;
squareArray = CreateSquareArray(size, gap);

ball = new Ball();

function animate() {
  requestAnimationFrame(animate);
  fillCanvas("black");

  updateArray(squareArray);
  ball.update();
}
animate();
