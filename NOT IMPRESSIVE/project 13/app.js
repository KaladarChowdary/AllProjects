// Creating canvas and getting context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Making canvas as large as screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// when window changes canvas should expand
window.addEventListener("resize", function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("dblclick", function () {
  createFlag = true;
});

// Give random real from range
function randRange(min, max) {
  return min + Math.random() * (max - min);
}
// Give random int from range not including max
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}
// Give random element from array
function randElement(arr) {
  return arr[randInt(0, arr.length)];
}

// Creating circle class
class Circle {
  constructor(x, y, r, dx = 0, dy = 0, color = "green") {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  //   Updating x and y with velocity and drawing and changing velocity when collision happens
  update() {
    this.draw();

    this.updateXandY();

    // Change x velocity when horizontal collision
    if (this.HCollision()) {
      this.dx = -this.dx;
    }
    // Change y velocity when verticle collision
    if (this.UnderCanvas()) {
      this.dy = -Math.abs(this.dy);
    }
    if (this.AboveCanvas()) {
      this.dy = Math.abs(this.dy);
    }
  }

  // Update with velocities
  updateXandY() {
    this.x += this.dx;
    this.y += this.dy;
  }

  UnderCanvas() {
    return this.y + this.r >= canvas.height;
  }

  AboveCanvas() {
    return this.y - this.r <= 0;
  }

  // Detect Horizontal collision with canvas
  HCollision() {
    return this.x + this.r >= canvas.width || this.x - this.r <= 0;
  }
  // Detect verticle collision with canvas
  VCollision() {
    return this.y + this.r >= canvas.height || this.y - this.r <= 0;
  }
}

// Create a function to add object to circle array
function addCircle() {
  let x, y, r, dx, dy, c;

  r = randRange(5, 30);
  x = randRange(r, canvas.width - r);
  y = randRange(r, canvas.height - r);

  dx = randRange(0.1, 5);
  dy = randRange(0.1, 5);

  c = randElement(colorArray);

  if (createFlag) {
    cArr.push(new Circle(x, y, r, dx, dy, c));
  }
}

// Creating circle array with random properties
let cArr = [];
let colorArray = ["#560764", "#913175", "#DD5B82", "#FE9797"];
let createFlag = false;

addCircle();

// Creating animation and running it
let i = 1;
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cArr.forEach((circle) => {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(circle.x, circle.y);
    ctx.strokeStyle = circle.color;
    ctx.stroke();

    circle.update();
  });

  setTimeout(addCircle, 100 * i);
  i++;
}
animate();
