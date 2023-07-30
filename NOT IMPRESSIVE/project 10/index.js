// All event listeners are defined here
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// All classes are defined here
class Rectangle {
  constructor(x = 100, y = 100, w = 50, h = 50, c = "black") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
  }

  update() {
    this.draw();
  }

  intersect(rect) {
    if (
      rect.x + rect.w < this.x ||
      rect.x > this.x + this.w ||
      rect.y + rect.h < this.y ||
      rect.y > this.y + this.h
    )
      return false;
    else return true;
  }
}

// All functions are written here
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

  // updating rect1 position
  rect1.x = mouse.x;
  rect1.y = mouse.y;

  // check if rect1 intersects rect2
  if (rect2.intersect(rect1)) {
    rect2.c = rect1Color;
  } else {
    rect2.c = rect2Color;
  }

  rect2.draw();
  rect1.draw();
}

// All variables are declared here
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: 0, y: 0 };
const rect1Color = "red";
const rect2Color = "green";

// All functions are run here
// write animations after this
maxifyCanvas();

const rect1 = new Rectangle(10, 10, 40, 40, "red");

const rect2 = new Rectangle(
  canvas.width / 2 - 75,
  canvas.height / 2 - 75,
  150,
  150,
  "green"
);

animate();
