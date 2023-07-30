const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = { x: undefined, y: undefined };
let startDrag = false;
let currentCircle = undefined;
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
  if (startDrag) {
    currentCircle.x = evt.pageX;
    currentCircle.y = evt.pageY;
  }
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

const begin = new Circle(100, 100, 10, "red");
const control = new Circle(300, 300, 10, "red");
const end = new Circle(500, 100, 10, "red");

const cursor = new Circle(mouse.x, mouse.y, 5, "rgba(0,0,0,0.3)");

window.addEventListener("mousedown", function (evt) {
  for (let cobj of [begin, control, end]) {
    if (getDistence(evt.pageX, evt.pageY, cobj.x, cobj.y) <= cobj.r) {
      startDrag = true;
      currentCircle = cobj;
      break;
    }
  }
});

window.addEventListener("mouseup", function (evt) {
  startDrag = false;
  currentCircle = undefined;
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  begin.update();
  control.update();
  end.update();

  ctx.beginPath();
  ctx.moveTo(begin.x, begin.y);
  ctx.quadraticCurveTo(control.x, control.y, end.x, end.y);
  ctx.stroke();

  cursor.x = mouse.x;
  cursor.y = mouse.y;
  // cursor.update();
}
animate();

// All functions go here
function getDistence(x, y, x1, y1) {
  return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
}
