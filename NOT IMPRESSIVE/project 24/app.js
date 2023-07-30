const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
let left, right;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event Listeners
window.addEventListener("resize", function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  left = [];
  right = [];

  for (let i = 0; i < 7; i++) {
    left.push(new Circle(200, 50 + 80 * i, 25, i + 2));
  }

  for (let i = 0; i < 7; i++) {
    right.push(
      new Circle(canvas.width - 200, 30 + 85 * i, 25 + 3 * i, 8, 15 + 2 * i)
    );
  }
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// Circle class
class Circle {
  constructor(x, y, r = 25, dx = 10, distX = 15) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.radius = r;
    this.dx = dx;
    this.distX = distX;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.originalX, this.originalY, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  update() {
    if (this.mouseOver()) {
      if (this.x - this.originalX >= this.distX) {
        console.log("crossed left boundary");
        this.dx = -Math.abs(this.dx);
      }
      if (this.originalX - this.x >= this.distX) {
        console.log("crossed right boundary");
        this.dx = Math.abs(this.dx);
      }

      this.x += this.dx;
    } else {
      if (this.x !== this.originalX) {
        if (this.x > this.originalX) this.x -= Math.abs(this.dx);

        if (this.x < this.originalX) this.x += Math.abs(this.dx);
      }
    }
    this.draw();
  }

  mouseOver() {
    if (
      getDistance(this.originalX, this.originalY, mouse.x, mouse.y) <=
      this.radius
    ) {
      return true;
    }
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

// objects to used in animate
right = [];
left = [];
for (let i = 0; i < 7; i++) {
  left.push(new Circle(200, 50 + 80 * i, 25, i + 2));
}

for (let i = 0; i < 7; i++) {
  right.push(
    new Circle(canvas.width - 200, 30 + 85 * i, 25 + 3 * i, 8, 15 + 2 * i)
  );
}

// Animate: SHOULD ALWAYS BE THE LAST
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  left.forEach((obj) => {
    obj.update();
  });

  right.forEach((obj) => {
    obj.update();
  });
}

animate();
