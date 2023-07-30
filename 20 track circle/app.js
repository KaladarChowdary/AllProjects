const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: -1000, y: -1000 };
let squareColor = "green";
let circleColor = "red";

let ball, size, gap, coordinates, arr;
size = 20;
gap = 2;

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  maxify();
  coordinates = giveCoordinates(size, gap);
  arr = makeSquares(coordinates, size);
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
  constructor(x = middleX(), y = middleY(), size = 20) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.centreX = this.x + this.size / 2;
    this.centreY = this.y + this.size / 2;

    this.opacity = 1;
    this.fillColor = `rgba(0, 0, 0, ${this.opacity})`;
    this.strokeColor = `rgba(0, 0, 0, 1)`;
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
    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
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
    return BallSquareCollision(
      ball.x,
      ball.y,
      ball.radius,
      this.x,
      this.y,
      this.size
    );
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
  update() {
    this.getDxAndDy();
    if (this.doesBallIntersect()) {
      this.opacity = 0.1;
    } else {
      this.opacity = Math.min(1, this.opacity + 0.005);
    }

    this.drawAndFill();
  }
}

// CLASS
class Ball {
  constructor(
    x = middleX(),
    y = middleY(),
    radius = 30,
    color = "rgba(256, 256, 256, 1)"
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
  detectBorderCollision() {
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
    this.stroke();
  }
  update() {
    this.updateXandY();
    this.detectBorderCollision();
    this.draw();
  }
}
// LAST BEFORE THE FUNCTIONS
ball = new Ball();
coordinates = giveCoordinates(size, gap);
arr = makeSquares(coordinates, size);
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("white");

  updateAll(arr);
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
