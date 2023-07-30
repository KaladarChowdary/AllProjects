const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Pure Functions
function findDistence(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

window.addEventListener("resize", maxifyCanvas);

// WRITE ALL FUNCTIONS HERE
function maxifyCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  cObj.x = canvas.width / 2;
  cObj.y = canvas.height / 2;
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Creating circle class
class Circle {
  // Takes position of circle and radius and velocity in x and y directions
  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
  }

  //   Drawing given circle on canvas with given x, y and radius.
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1.5;
    ctx.fill();
  }

  //   Updating x and y with velocity and drawing and changing velocity when collision happens
  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.insideCircle(mouse.x, mouse.y)) ctx.fillStyle = "red";
    else ctx.fillStyle = "green";

    this.draw();

    if (this.HCollision()) {
      this.dx = -this.dx;
    }
    if (this.VCollision()) {
      this.dy = -this.dy;
    }
  }

  // Detect when circle edge collides horizontally with canvas
  HCollision() {
    return this.x + this.r >= canvas.width || this.x - this.r <= 0;
  }
  //   Detect when circle edges collides with canvas edge vertically
  VCollision() {
    return this.y + this.r >= canvas.height || this.y - this.r <= 0;
  }

  insideCircle(x, y) {
    return findDistence(x, y, this.x, this.y) <= this.r;
  }
}

const cObj = new Circle(canvas.width / 2, canvas.height / 2, 100, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  clearScreen();

  cObj.update();
}

// CODE TO RUN
maxifyCanvas();

animate();
