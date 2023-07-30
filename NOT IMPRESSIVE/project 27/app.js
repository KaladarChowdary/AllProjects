const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
let left, right, pArr;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event Listeners
window.addEventListener("resize", function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Circle class
class Projectile {
  constructor(x1 = 0, y1 = canvas.height / 2, r = 10, color = "white") {
    this.x = x1;
    this.y = y1;
    this.r = r;
    this.color = color;

    this.theta = Math.atan2(mouse.y - y1, mouse.x - x1);
    this.dx = 5 * Math.cos(this.theta);
    this.dy = 5 * Math.sin(this.theta);
    console.log(this.theta);
    console.log([this.dx, this.dy]);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.y - this.r <= 0) {
      this.dy = Math.abs(this.dy);
    }
    if (this.y + this.r >= canvas.height) {
      this.dy = -Math.abs(this.dy) * 0.7;
    }
    this.draw();
  }
}

class Canon {
  constructor(x1, y1, x2, y2, distance) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.distance = distance;

    this.theta = Math.atan2(y2 - y1, x2 - x1);
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(
      this.x1 + this.distance * Math.cos(this.theta),
      this.y1 + this.distance * Math.sin(this.theta)
    );
    ctx.lineWidth = 30;
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  update() {
    this.draw();
  }
}
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

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
let canon1;
let index = 0;
pArr = [];
// Animate: SHOULD ALWAYS BE THE LAST
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (index % 30 === 0) {
    index = 0;
    pArr.push(new Projectile());
  }
  index++;

  pArr.forEach((p) => {
    p.update();
  });

  canon1 = new Canon(0, canvas.height / 2, mouse.x, mouse.y, 100);
  canon1.update();
}

animate();
