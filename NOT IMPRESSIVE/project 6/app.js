// Creates canvas and drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Sets canvas width and height to that of window
function maxifyCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
maxifyCanvas();

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
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  //   Updating x and y with velocity and drawing and changing velocity when collision happens
  update() {
    this.x += this.dx;
    this.y += this.dy;

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
}

// Creating random x, y, dx and dy
let cArr = [];
let x, y, r, dx, dy;

for (let i = 0; i < 200; i++) {
  r = 20;
  x = r + Math.random() * (canvas.width - 2 * r);
  y = r + Math.random() * (canvas.height - 2 * r);
  dx = 5 * (0.5 - Math.random());
  dy = 5 * (0.5 - Math.random());

  cArr.push(new Circle(x, y, r, dx, dy));
}

// For run update of object on each frame
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cArr.forEach((circle) => {
    circle.update();
  });
}

animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
