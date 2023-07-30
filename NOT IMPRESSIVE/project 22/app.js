const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Circle {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
  }
}

const Cobj = new Circle(10, 10, 2, "rgba(255, 255, 255, 1)");

window.addEventListener("dblclick", function (evt) {});

const mouse = { x: undefined, y: undefined };
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// Create like 100 circles that increases size with every update then decreases then vanishes
// 1.Creating 100 circles is easy
// 2.Decreasing size at each iteration
// 3.Deleting when  size reaches some point
// 4.All with downward accelaration
// 5.Always happens where mouse is placed

class Sparkle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.r = 4;
    this.dx = 3 * (0.5 - Math.random());
    this.dy = 2.5 * -Math.random();
    this.a = 0.07;
    this.opacity = 1;
  }

  draw() {
    if (this.r <= 0.5) return;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255,1)`;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.r -= 0.03;

    this.opacity -= 0.01;

    if (this.y + this.r >= canvas.height) {
      this.dy = -Math.abs(this.dy) * 0.5;
    } else {
      this.dy += this.a;
    }

    this.draw();
  }
}

let sparkle = [];

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  sparkle.push(new Sparkle());
  sparkle.forEach((s) => {
    s.update();
  });

  if (sparkle.length >= 1000) {
    for (let i = 0; i < 5; i++) {
      sparkle.shift();
    }
  }

  Cobj.x = mouse.x;
  Cobj.y = mouse.y;
  Cobj.update();
}
animate();
