const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: 0, y: 0 };
let square,
  arrofArray,
  onMouse = true;

// EVENT LISTENERS
window.addEventListener("dblclick", function (evt) {});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  maxify();
});

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

function insideCircle(x, y, x, y, r) {
  return getDistance(x, y, circle.x, circle.y) <= circle.radius;
}

function fillCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, endX(), endY());
}

function giveArray() {
  let arr = [];
  let size = 50;
  let x = middleX() - size / 2;
  let y = middleY() - size / 2;
  let gap = 0;

  for (let j = 0; j < 50; j += 1) {
    for (let i = 0; i < 50; i += 2) {
      arr.push(new Particle(x + i, y + j, 1));
    }
  }

  return arr;
}

function updateAll(arr) {
  arr.forEach((element) => {
    element.update();
  });
}

//CLASSES
class Square {
  constructor(size = 50, x = middleX() - size / 2, y = middleY() - size / 2) {
    this.size = size;
    this.x = x;
    this.y = y;

    this.left = this.x;
    this.right = this.x + this.size;
    this.top = this.y;
    this.bottom = this.y + this.size;

    this.color = "green";
  }

  beginPath() {
    ctx.beginPath();
  }
  lineSquare() {
    ctx.strokeRect(this.x, this.y, this.size, this.size);
  }
  lineColor() {
    ctx.strokeStyle = this.lineColor;
  }
  stroke() {
    ctx.stroke();
  }
  fillSquare() {
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  fillColor() {
    ctx.fillStyle = this.color;
  }
  mouseInSquare() {
    if (
      mouse.x < this.left ||
      mouse.x > this.right ||
      mouse.y < this.top ||
      mouse.y > this.bottom
    ) {
      return false;
    } else {
      return true;
    }
  }
  draw() {
    this.beginPath();
    this.fillColor();
    this.fillSquare();
  }
  update() {
    this.draw();
  }
}

class Particle {
  constructor(x = middleX(), y = middleY(), radius = 10) {
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.opacity = 0.1;
    this.sOpacity = 0.001;

    this.upSpeed = randRange(0.5, 2);
    this.color = `rgba(0, 256, 0, 0.005)`;
  }

  beginPath() {
    ctx.beginPath();
  }
  lineCircle() {
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  }
  lineColor() {
    ctx.strokeStyle = this.lineColor;
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
  draw() {
    this.beginPath();
    this.fillColor();
    this.lineCircle();
    this.fill();
  }
  reduceY() {
    this.y -= positive(this.upSpeed);
  }

  reduceOpacity() {
    this.opacity -= positive(this.sOpacity);
    this.opacity = Math.max(0.01, this.opacity);
  }

  updateColor() {
    this.color = `rgba(0, 256, 0,${this.opacity})`;
  }

  update() {
    this.reduceY();
    this.reduceOpacity();
    this.updateColor();
    this.x += 0.2 * Math.sin(randRange(0.1, 0.2) * this.y);
    this.draw();
  }
}

// LAST
square = new Square();
arrofArray = [];
fillCanvas("black");
let index = 0;
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("rgba(0,0,0,0.05)");

  console.log(arrofArray.length);
  onMouse = square.mouseInSquare();
  if (onMouse) {
    if (index % 30 === 0) {
      arrofArray.push(new giveArray());
    }

    if (arrofArray.length === 7) {
      arrofArray.shift();
    }

    arrofArray.forEach((array) => {
      updateAll(array);
    });
  } else {
    arrofArray.forEach((array) => {
      updateAll(array);
    });
  }
  square.update();

  index++;
}
animate();
