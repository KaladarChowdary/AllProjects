const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();

function endX() {
  return canvas.width;
}
function endY() {
  return canvas.height;
}

function middleX() {
  return canvas.width / 2;
}

function middleY() {
  return canvas.height / 2;
}
function maxify() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function fillCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, endX(), endY());
}

// EVENT LISTENERS
window.addEventListener("resize", function (evt) {
  maxify();
});

// CLASS
class Arc {
  constructor(
    x = middleX(),
    y = middleY(),
    r = 100,
    initial = 0,
    final = 2 * Math.PI,
    increment = 0.01,
    color = "white",
    cc = false
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.initial = initial;
    this.moving = 0;
    this.final = final;
    this.increment = increment;
    this.color = color;
    this.cc = cc;

    this.lineWidth = 2;
  }

  beginPath() {
    ctx.beginPath();
  }
  setStrokecolor() {
    ctx.strokeStyle = this.color;
  }
  setStrokeWidth() {
    ctx.lineWidth = this.lineWidth;
  }
  drawArc() {
    ctx.arc(this.x, this.y, this.r, this.initial, this.moving, this.cc);
  }
  stroke() {
    ctx.stroke();
  }

  draw() {
    this.beginPath();
    this.drawArc();
    this.setStrokeWidth();
    this.setStrokecolor();
    this.stroke();
  }

  update() {
    if (this.moving < this.final) {
      this.moving += this.increment;
    }
    this.draw();
  }
}

// ANIMATE DEFINITION AND EXECUTION SHOULD BE LAST
let left1 = new Arc(150, 150, 100, 0, 2 * Math.PI, 0.01, "green", false);
let left2 = new Arc(
  250,
  endY() - 200,
  100,
  Math.PI,
  2 * Math.PI,
  0.01,
  "green",
  false
);

let right1 = new Arc(endX() - 200, 250, 100, 0, 2 * Math.PI, 0.01, "red", true);
let right2 = new Arc(
  endX() - 200,
  endY() - 200,
  100,
  Math.PI,
  2 * Math.PI,
  0.01,
  "red",
  true
);

function animate() {
  requestAnimationFrame(animate);
  fillCanvas("black");

  left1.update();
  left2.update();
  right1.update();
  right2.update();
}

animate();
