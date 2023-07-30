const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: -1000, y: -1000 };
let squareColor = "green";
let circleColor = "red";

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  maxify();
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// CLASS
// class Square {
//   constructor(x = middleX(), y = middleY(), size = 20, color = "darkgreen") {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.color = color;
//   }
//   beginPath() {
//     ctx.beginPath();
//   }
//   applyStrokeColor() {
//     ctx.strokeStyle = this.color;
//   }
//   strokeRect() {
//     ctx.strokeRect(this.x, this.y, this.size, this.size);
//   }
//   updateFillColor() {
//     ctx.fillStyle = this.color;
//   }
//   fillRect() {
//     ctx.fillRect(this.x, this.y, this.size, this.size);
//   }
//   closePath() {
//     ctx.closePath();
//   }

//   isMouseOnMe() {
//     return onSquare(mouse.x, mouse.y, this.x, this.y, this.size);
//   }

//   border() {
//     this.beginPath();
//     this.applyStrokeColor();
//     this.strokeRect();
//     this.closePath();
//   }
//   fill() {
//     this.updateFillColor();
//     this.fillRect();
//   }

//   update() {
//     if (this.isMouseOnMe()) {
//       this.fill();
//     } else {
//       this.border();
//     }
//   }
// }

class Square {
  constructor(size = 50, x = middleX() - size / 2, y = middleY() - size / 2) {
    console.log(x, y, size);
    this.x = x;
    this.y = y;
    this.size = size;

    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;

    this.before = false;
    this.current = false;

    this.opacity = 1;
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
  isMouseOnMe() {
    return onSquare(mouse.x, mouse.y, this.x, this.y, this.size);
  }
  drawBorder() {
    this.beginPath();
    this.applyStrokeColor();
    this.strokeRect();
    this.closePath();
  }
  drawLineToBall() {
    this.getDxAndDy();

    ctx.beginPath();
    ctx.moveTo(this.centreX, this.centreY);

    ctx.lineTo(ball.x + this.dx, ball.y - this.dy);
    ctx.stroke();
    ctx.closePath();
  }
  getDxAndDy() {
    let bTheta = getAngle(ball.x, ball.y, this.centreX, this.centreY);
    this.dx = ball.radius * Math.cos(bTheta);
    this.dy = ball.radius * Math.sin(bTheta);
  }
  doesBallIntersect() {
    return this.isSquareInsideCircle() || this.isBallEdgeOnSquare();
  }
  isSquareInsideCircle() {
    return insideCircle(
      this.centreX,
      this.centreY,
      ball.x,
      ball.y,
      ball.radius
    );
  }
  isBallEdgeOnSquare() {
    this.getDxAndDy();
    return onSquare(
      ball.x + this.dx,
      ball.y - this.dy,
      this.x,
      this.y,
      this.size
    );
  }
  drawAndFill() {
    this.fill();
    this.drawBorder();
  }
  fill() {
    this.updateFillColor();
    this.fillRect();
  }
  getAngleOfTouch() {
    this.getDxAndDy();
    return getAngle(
      this.centreX,
      this.centreY,
      ball.x + this.dx,
      ball.y - this.dy
    );
  }
  updateBeforeandAfter() {
    this.before = this.current;
    this.current = this.doesBallIntersect();
  }
  detectCollision() {
    return !this.before && this.current;
  }
  reflectOnCollision() {
    if (this.detectCollision()) {
      this.angle = radToDeg(this.getAngleOfTouch());
      this.angle = Math.floor(this.angle);
      console.log(this.angle);

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
        console.log("exactly at middle", this.angle);
        ball.dx = -ball.dx;
        ball.dy = -ball.dy;
      }
    }
  }
  update() {
    this.updateBeforeandAfter();
    if (this.isMouseOnMe() && this.before === false) {
      this.fill();
      this.reflectOnCollision();
    } else {
      this.drawBorder();
    }
  }
}
class Ball {
  constructor(
    x = middleX(),
    y = middleY(),
    radius = 30,
    color = "rgba(256, 0, 0, 1)"
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;

    this.dx = 5 * (0.5 - Math.random());
    this.dy = 5 * (0.5 - Math.random());
  }

  beginPath() {
    ctx.beginPath();
  }
  lineCircle() {
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  }
  lineColor() {
    ctx.strokeStyle = "rgba(256, 256, 256, 1)";
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
    this.lineColor();
    this.lineCircle();
    this.fillColor();
    this.fill();
    this.stroke();
  }
  update() {
    this.bounceCanvas();
    this.updateXandY();
    this.draw();
  }
}
// LAST BEFORE THE FUNCTIONS
let ball = new Ball(80, 80);
let square = new Square();
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("white");

  square.update();
  ball.update();
  drawAxes();
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
