const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: -2000, y: -2000 };
let ball, box, temp, gameRunning, score;
gameRunning = true;
score = 0;

// -------------------------------------------------------------------------------------------------------------
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  maxify();
  box = new Rectangle();
  ball = new Ball();
});

window.addEventListener("keydown", function (evt) {
  if (evt.code === "ArrowLeft") {
    box.moveLeft();
    box.accelarate();
  } else if (evt.code === "ArrowRight") {
    box.moveRight();
    box.accelarate();
  } else if (evt.code === "Enter" && !gameRunning) {
    gameRunning = true;
    animate();
    ball = new Ball();
  }
});

window.addEventListener("keyup", function (evt) {
  box.setOriginalSpeed();
});
// -------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// sets canva little less wide and tall than widow
function maxify(cutBy = 10) {
  canvas.width = window.innerWidth - cutBy;
  canvas.height = window.innerHeight - cutBy;
}

// Returns half of canvas width
function middleX() {
  return canvas.width / 2;
}

// Returns half of canvas height
function middleY() {
  return canvas.height / 2;
}

// Returns end of canvas width
function endX() {
  return canvas.width;
}

// Returns end of  canvas height
function endY() {
  return canvas.height;
}

// Returns distance between two points
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Returns random rational number from min until but not equal to max
function randRange(min, max) {
  return min + Math.random() * (max - min);
}

// Return random intezer from min to max, including max
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Returns random element from array
function randElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Returns positive of given number
function positive(num) {
  return Math.abs(num);
}

// Return negative of given number
function negative(num) {
  return -Math.abs(num);
}

// Returns random color
function randomColor(opacity = 1) {
  return `rgba(${randRange(0, 256)},${randRange(0, 256)},${randRange(
    0,
    256
  )}, ${randRange(0, 1)})`;
}

// Fills entire canvas with given color
function fillCanvas(color = "white") {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, endX(), endY());
}

// Gives coordinates to fill canvas with squares.
// Squares of length 'size' with distence of 'gap' between them.
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

// Updates each object of an array
function arrayUpdate(arrObj) {
  arrObj.forEach((obj) => {
    obj.update();
  });
}

// Returns whether point x1,y1 is on the square of x2,y2(top-left) with length size2
function onSquare(x1, y1, x2, y2, size2) {
  if (x1 < x2 || x1 > x2 + size2 || y1 < y2 || y1 > y2 + size2) {
    return false;
  }
  return true;
}

// Returns whether x1,y1 is inside circle x2,y2 with radius r2
function isInsideCircle(x1, y1, x2, y2, r2) {
  return getDistance(x1, y1, x2, y2) <= r2;
}

// Returns absolute difference
function absoluteDiff(x1, x2) {
  return Math.abs(x1 - x2);
}

// Gives angle where opposite and adjacent are positive
// Gives angle of first quadrant
function getAbsoluteTheta(dx, dy) {
  return Math.atan2(dy, dx);
}

// Gives quadrant of (x2,y2) while assuming (x1,y1) as origin
// Gives quadrant according to canvas co-ordinate system not cartesian co-ordinate system
function getQuadrant(x1, y1, x2, y2) {
  if (x2 > x1 && y2 <= y1) return 1;
  else if (x2 <= x1 && y2 < y1) return 2;
  else if (x2 < x1 && y2 >= y1) return 3;
  else if (x2 >= x1 && y2 > y1) return 4;
}

// Gives actual angle based on canva co-ordinate system
function updateThetaWithQuadrants(quadrant, theta) {
  if (quadrant === 1) {
    theta = theta;
  } else if (quadrant === 2) {
    theta = Math.PI - theta;
  } else if (quadrant === 3) {
    theta = Math.PI + theta;
  } else if (quadrant === 4) {
    theta = 2 * Math.PI - theta;
  }

  return theta;
}

// Gives angle from x1,y1 to x2, y2.
// Given there's horizontal line from x1,y1.
// (x1,y1) acts as origin
// Gives angle from 0 to 2*Math.PI
// Gives correct angle according to co-ordinate system
function getAngle(x1, y1, x2, y2) {
  let xdiff, ydiff, theta, quadrant;
  xdiff = Math.abs(x2 - x1);
  ydiff = Math.abs(y2 - y1);
  theta = getAbsoluteTheta(xdiff, ydiff);
  quadrant = getQuadrant(x1, y1, x2, y2);
  return updateThetaWithQuadrants(quadrant, theta);
}

// Converts radians to degrees
function radToDeg(angle) {
  return (angle * 180) / Math.PI;
}

// Get's angle to (x2, y2) assuming (x1, y1) as origin
// Angle lies in range 0 to 2PI
function getAngleInDegrees(x1, y1, x2, y2) {
  return radToDeg(getAngle(x1, y1, x2, y2));
}

// Draws x and y axes at the centre of canva with given color
function drawAxes(color = "grey") {
  ctx.beginPath();
  ctx.moveTo(0, middleY());
  ctx.lineTo(endX(), middleY());
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(middleX(), 0);
  ctx.lineTo(middleX(), endY());
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Given circle with center (x1, y1) and radius r1
// Given square with top-left (x2, y2) and size size2
// Returns whether given circle intersects with square or not
function circleSquareIntersection(x1, y1, r1, x2, y2, size2) {
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

// Given square co-ordinates and length, it returns center of square
function centerOfSquare(x2, y2, size2) {
  return [x2 + size2 / 2, y2 + size2 / 2];
}

// Gives angle of strike by circle on square
function angleOfIntersectionFromSquare(cX, cY, sX, sY) {
  return getAngle(sX, sY, cX, cY);
}

// Returns the side the circle has collided with
function getSideOfCollisionFromSquare(cX, cY, cR, x2, y2, size2) {
  let [sX, sY] = centerOfSquare(x2, y2, size2);
  let angle = radToDeg(angleOfIntersectionFromSquare(cX, cY, sX, sY));

  if (angle < 90 + 45 && angle > 90 - 45) {
    return "top";
  } else if (angle < 180 + 45 && angle > 180 - 45) {
    return "left";
  } else if (angle < 270 + 45 && angle > 270 - 45) {
    return "bottom";
  } else if (angle < 45 && angle >= 0) {
    return "right";
  } else if (angle < 360 && angle > 360 - 45) {
    return "right";
  } else {
    return "edge";
  }
}

// Gives x co-ordinate such that circle stays inside canvas
function acceptableX(radius) {
  return randRange(radius + 5, endX() - radius - 5);
}

// Gives y co-ordinate such that circle stays inside canvas
function acceptableY(radius) {
  return randRange(radius + 5, endY() - radius - 5);
}

function clear() {
  ctx.clearRect(0, 0, endX(), endY());
}

function randomSign() {
  return Math.random() < 0.5 ? 1 : -1;
}

function hypotenuse(x, y) {
  return Math.sqrt(x * x + y * y);
}

function circleRectangleIntersection(cX, cY, cR, x2, y2, length2, height2) {
  let rX = x2 + length2 / 2;
  let rY = y2 + height2 / 2;

  if (
    cX + cR < x2 ||
    cX - cR > x2 + length2 ||
    cY + cR < y2 ||
    cY - cR > y2 + height2 ||
    getDistance(cX, cY, rX, rY) > cR + hypotenuse(length2, height2) / 2
  ) {
    return false;
  } else {
    return true;
  }
}

function displayEndScreen() {
  ctx.font = "20px serif";
  ctx.fillText(
    `GAME BY KALADAR
  `,
    middleX() - 20,
    30
  );

  ctx.font = "30px serif";
  ctx.fillText("GAME OVER!", middleX() - 10, middleY());

  ctx.fillStyle = "black";
  ctx.font = "20px serif";
  ctx.fillText(`SCORE - ${score}`, middleX() - 10, middleY() + 40);

  ctx.fillStyle = "red";
  ctx.font = "bold 20px serif";
  ctx.fillText("Press 'Enter' to Restart", middleX() - 10, middleY() + 80);

  score = 0;
}

function displayScore() {
  ctx.fillStyle = "rgb(51,0,25)";
  ctx.font = "BOLD 20px sans-serif";
  ctx.fillText(`SCORE - ${score}`, 5, 30);
}

// ----------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------
class Ball {
  constructor(x = middleX(), y = middleY(), radius = 15, color = "red") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.dx = randomSign() * randRange(2, 3);
    this.dy = randomSign() * randRange(1, 2);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  updateXandY() {
    this.x += this.dx;
    this.y += this.dy;
  }

  upperCollision() {
    return this.y - this.radius <= 0;
  }

  bottomCollision() {
    return this.y + this.radius >= endY();
  }

  leftCollision() {
    return this.x - this.radius <= 0;
  }

  rightCollision() {
    return this.x + this.radius >= endX();
  }

  bounceIfCollision() {
    if (this.upperCollision()) {
      this.dy = positive(this.dy);
    } else if (this.bottomCollision()) {
      this.dy = negative(this.dy);
    }

    if (this.leftCollision()) {
      this.dx = positive(this.dx);
    } else if (this.rightCollision()) {
      this.dx = negative(this.dx);
    }
  }

  update() {
    this.updateXandY();
    this.draw();
    this.bounceIfCollision();
  }
}

class Rectangle {
  constructor(length = 70, height = 30, color = "green") {
    this.length = length;
    this.height = height;
    this.x = 0;
    this.y = endY() - height;
    this.color = color;

    this.edgeTheta = Math.atan2(height, length);

    // set while ball is actually colliding
    this.speed = 20;
    this.originalSpeed = 20;
    this.accelaration = 0;
  }

  getCollisionAngle() {
    return getAngle(
      this.x + this.length / 2,
      this.y + this.height / 2,
      ball.x,
      ball.y
    );
  }

  handleCollision() {
    if (this.isTopCollision()) {
      ball.dy = negative(ball.dy);
      score++;
    } else if (this.isLeftCollision()) {
      ball.dx = negative(ball.dx);
    } else if (this.isRightCollision()) {
      ball.dx = positive(ball.dx);
    } else {
      ball.dx = -ball.dx;
      ball.dy = -ball.dy;
    }
  }

  isTopCollision() {
    return (
      this.collisionAngle > this.edgeTheta &&
      this.collisionAngle < Math.PI - this.edgeTheta
    );
  }

  isLeftCollision() {
    return this.collisionAngle > Math.PI - this.edgeTheta;
  }

  isRightCollision() {
    return (
      this.collisionAngle < this.edgeTheta ||
      this.collisionAngle > 2 * Math.PI - this.edgeTheta
    );
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.length, this.height);
    ctx.closePath();
  }

  notAtLeftCorner() {
    return this.x > 0;
  }

  notAtRightCorner() {
    return this.x + this.length < endX();
  }

  accelarate() {
    this.speed += this.accelaration;
  }

  setOriginalSpeed() {
    this.speed = this.originalSpeed;
  }

  moveLeft() {
    this.x -= this.speed;
    this.x = Math.max(0, this.x);
  }

  moveRight() {
    this.x += this.speed;
    this.x = Math.min(endX(), this.x + this.length) - this.length;
  }

  collision() {
    return circleRectangleIntersection(
      ball.x,
      ball.y,
      ball.radius,
      this.x,
      this.y,
      this.length,
      this.height
    );
  }

  update() {
    if (this.collision()) {
      this.collisionAngle = this.getCollisionAngle();
      this.handleCollision();
      ball.dx += 0.05 * ball.dx;
      ball.dy += 0.05 * ball.dy;

      this.originalSpeed = Math.max(ball.dx, this.originalSpeed);
    }
    this.draw();
  }
}

// -------------------------------------------------------------------------------------------------------------
ball = new Ball();
box = new Rectangle();
display = new Text(score);
// -------------------------------------------------------------------------------------------------------------
function animate() {
  if (gameRunning) {
    requestAnimationFrame(animate);
    clear();

    ball.update();
    box.update();
    displayScore();

    if (ball.y + ball.radius >= endY()) {
      clear();
      gameRunning = false;
      displayEndScreen();
    }
  }
}
animate();
// -------------------------------------------------------------------------------------------------------------
