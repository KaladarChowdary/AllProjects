const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// makes canvas full
function maxifyCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  animate();
}

// clears entire screen
function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// when window changes changes canvas length accordingly
function changeWithWindow() {
  window.addEventListener("resize", maxifyCanvas);
}

// Finds distence between 2 points
function findDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Calculates distence from passed rectangle to mouse position
function opacity(rectObj) {
  let distance = findDistance(
    mouse.x,
    mouse.y,
    rectObj.centerX,
    rectObj.centerY
  );

  if (distance < rectObj.width / 2) return 1;
  else return 30 / distance;
}

// Changes mouse coordinates when mouse is moved
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

// Rectangle class
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  }

  draw() {
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    ctx.beginPath();
    let a = opacity(this);
    ctx.fillStyle = `rgba(${0}, ${255}, ${100}, ${a})`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let mouse = { x: -1000, y: -1000 };

// ALL RUNNING IS HERE

let size = 20;
let gap = 4;

function animate() {
  requestAnimationFrame(animate);
  clearScreen();

  for (let i = 0; i + gap + size <= canvas.width; i += size + gap) {
    for (let j = 0; j + gap + size <= canvas.height; j += size + gap) {
      // ctx.fillRect(i, j, size, size);
      let r = new Rectangle(i, j, size, size);
      r.draw();
    }
  }
}
// CODE TO RUN
maxifyCanvas();

animate();
