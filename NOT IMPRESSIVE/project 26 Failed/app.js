const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
maxify();
let length, gap, arr;
length = 10;
gap = 1;
arr = [[]];

function getSquaresAllOver(length, gap) {
  let arr, i, j, x, y;
  arr = [[]];
  i = 0;
  j = 0;

  for (y = 0; y < 500; y += length + gap) {
    for (x = 0; x < 500; x += length + gap) {
      // Adding rectangle at the very end with coordinates x and y. And side length of length.
      arr.at(-1).push(new Rectangle(x, y, length, i, j));

      j++;
    }

    i++;
    j = 0;
    arr.push([]);
  }

  return arr;
}

// Event Listeners
window.addEventListener("resize", function (evt) {
  maxify();
  // new squares when size changes
  arr = getSquaresAllOver(length, gap);
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("dblclick", function (evt) {
  for (let row of arr) {
    for (let item of row) {
      // Going through each of rectangle coordinates
      if (
        evt.pageX < item.x ||
        evt.pageX > item.x + item.length ||
        evt.pageY < item.y ||
        evt.pageY > item.y + item.length
      ) {
      } else {
        // making selected true and diplaying stuff
        item.selected = true;
        // console.log([item.i, item.j]);
        // console.log(getNeighbor(item.i, item.j));
        console.log([item.i, item.j], "is selected");
      }
    }
  }
});

// RECTANGLE
class Rectangle {
  constructor(
    x = canvas.width / 2,
    y = canvas.height / 2,
    length = 10,
    i,
    j,
    color = "black"
  ) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.color = color;

    this.selected = false;
    this.first = true;

    this.i = i;
    this.j = j;

    this.neighbor = getNeighbor(i, j);
    // console.log(this.neighbor);
    this.index = 0;
  }

  draw() {
    this.index++;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.length, this.length);
  }

  update() {
    if (this.selected) {
      this.color = "red";
    }

    this.draw();
  }

  mouseOver() {
    if (mouse.x === undefined || mouse.y === undefined) return false;
    if (mouse.x < this.x || mouse.x > this.x + this.length) {
      return false;
    }
    if (mouse.y < this.y || mouse.y > this.y + this.length) {
      return false;
    }

    return true;
  }
}

// PURE FUNCTIONS
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randItem(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function getNeighbor(x1, y1) {
  let arr = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (x1 + i < 0 || y1 + j < 0) continue;
      arr.push([x1 + i, y1 + j]);
    }
  }
  return arr;
}

// objects to used in animate

arr = getSquaresAllOver(length, gap);

// Animate: SHOULD ALWAYS BE THE LAST
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  console.log(
    "------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  for (let row of arr) {
    for (let box of row) {
      box.update(arr);
    }
  }

  for (let row of arr) {
    for (let box of row) {
      if (box.selected) {
        for (let [x, y] of box.neighbor) {
          if (arr[x][y]) {
            {
              arr[x][y].selected = true;
            }
          }
        }
      }
    }
  }
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
