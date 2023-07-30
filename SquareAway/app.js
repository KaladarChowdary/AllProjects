//
//
//
//
// Classes are declared here
class Circle {
  constructor(x, y, radius, color) {
    this.startX = x;
    this.startY = y;
    this.radius = radius;
    this.color = color;
    this.x = this.startX;
    this.y = this.startY;
    this.speed = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 2 * this.radius, 2 * this.radius);
    ctx.fill();
  }

  update() {
    if (this.mouseInRange(4 * this.radius)) {
      console.log("in range");
      if (this.x < mouse.x) {
        this.x -= 2 * this.speed;
      } else if (this.x > mouse.x) {
        this.x += 2 * this.speed;
      }

      if (this.y < mouse.y) {
        this.y -= 2 * this.speed;
      } else if (this.y > mouse.y) {
        this.y += 2 * this.speed;
      }
    } else if (
      findDistance(this.x, this.y, mouse.x, mouse.y) >=
      6 * this.radius
    )
      if (this.x < this.startX) {
        this.x += 0.2 * this.speed;
      } else if (this.x > this.startX) {
        this.x -= 0.2 * this.speed;
      }

    if (this.y < this.startY) {
      this.y += 0.2 * this.speed;
    } else if (this.y > this.startY) {
      this.y -= 0.2 * this.speed;
    }

    this.draw();
  }

  mouseInRange(k) {
    return findDistance(this.x, this.y, mouse.x, mouse.y) <= k;
  }
}

//
//
//
//
// Event Listeners are declared here
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cArr = [];
  for (let j = r; j + 2 * r <= canvas.height; j += gap) {
    for (let i = r; i + 2 * r <= canvas.width; i += gap) {
      cArr.push(new Circle(i, j, r, "black"));
      i = i + 2 * r;
    }
    j = j + 2 * r;
  }
});
//
//
//
//
// Functions are declared here
function findDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function maxifyCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  requestAnimationFrame(animate);
  clearScreen();

  cArr.forEach((circle) => {
    circle.update();
  });
}

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
// Variables are declared here
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
maxifyCanvas();
let cArr = [];
//
//
//
//
// functions are run here
let i, j, gap, r;
i = 0;
j = 0;
r = 5;
gap = 2;
for (let j = r; j + 2 * r <= canvas.height; j += gap) {
  for (let i = r; i + 2 * r <= canvas.width; i += gap) {
    cArr.push(new Circle(i, j, r, "black"));
    i = i + 2 * r;
  }
  j = j + 2 * r;
}

animate();
