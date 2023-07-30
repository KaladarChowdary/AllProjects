const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
maxify();
const mouse = { x: undefined, y: undefined };
let obj;

// Event Listeners
window.addEventListener("resize", function () {
  maxify();
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

window.addEventListener("dblclick", function (evt) {});

// Functions
function maxify() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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

function insideCircle(x, y, circle) {
  return getDistance(x, y, circle.x, circle.y) <= circle.radius;
}

function fillCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Classes
class Circle {
  constructor(
    x = canvas.width / 2,
    y = canvas.height / 2,
    radius = 10,
    color = "white",
    distance = 150
  ) {
    this.x = x;
    this.y = y;
    this.mx = x;
    this.my = y;
    this.radius = radius;
    this.color = color;

    this.angle = 0;
    this.velocity = 0;
    this.accelaration = 0.0005;
    this.distance = distance;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.oldx, this.oldy);
    ctx.lineTo(this.mx, this.my);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  makeMouseCenter() {
    if (mouse.x && mouse.y) {
      this.x = mouse.x;
      this.y = mouse.y;
    }
  }

  update() {
    this.oldx = this.mx;
    this.oldy = this.my;
    this.mx = this.x + this.distance * Math.cos(this.angle);
    this.my = this.y + this.distance * Math.sin(this.angle);

    this.angle += this.velocity;
    this.velocity += this.accelaration;
    this.draw();
  }
}

// SHOULD BE THE LAST
obj = new Circle();
function animate() {
  requestAnimationFrame(animate);
  fillCanvas("rgba(0,0,0,0.09)");

  obj.update();
}
animate();
