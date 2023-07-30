// ALL FUNCTIONS ARE HERE
function makeCanvasFull() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rectObj.draw();
  opacity();
}

function findDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function opacity() {
  let distance = findDistance(
    mouse.x,
    mouse.y,
    rectObj.centerX,
    rectObj.centerY
  );

  if (distance < rectObj.width / 2) return 1;
  else return 20 / distance;
}
// ADDING EVENT LISTENERS
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  rectObj.x = canvas.width / 2;
  rectObj.y = canvas.height / 2;
});
// ALL CLASSES ARE HERE
class Rectangle {
  constructor(x, y, width, height, opacity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.opacity = opacity;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  }

  draw() {
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    ctx.beginPath();
    let a = opacity();
    ctx.fillStyle = `rgba(${0}, ${0}, ${255}, ${a})`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// ALL VARIABLES ARE HERE
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

makeCanvasFull();
let rectObj = new Rectangle(canvas.width / 2, canvas.height / 2, 50, 50, 1);
let mouse = { x: 0, y: 0 };

// ALL RUNNING IS HERE
makeCanvasFull();
animate();
