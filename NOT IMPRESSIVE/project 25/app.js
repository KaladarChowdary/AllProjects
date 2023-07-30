const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };
let x, y, length;
length = 20;
gap = 1;
let arr = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event Listeners
window.addEventListener("resize", function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  arr = [];
  for (y = 0; y < canvas.height; y += length + gap) {
    for (x = 0; x < canvas.width; x += length + gap) {
      arr.push(new Rectangle(x, y, length));
    }
  }
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// RECTANGLE
class Rectangle {
  constructor(
    x = canvas.width / 2,
    y = canvas.height / 2,
    length = 10,
    dx = 3,
    distance = 15,
    remaining = 0
  ) {
    this.originalX = x;
    this.x = x;
    this.y = y;
    this.length = length;

    this.dx = dx;
    this.distance = distance;
    this.remaining = remaining;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0,1)";
    ctx.fillRect(this.x, this.y, this.length, this.length);
  }

  update() {
    if (this.mouseOver()) {
      this.remaining = 50;
      if (this.x - this.originalX >= this.distance) {
        this.dx = -Math.abs(this.dx);
      }
      if (this.originalX - this.x >= this.distance) {
        this.dx = Math.abs(this.dx);
      }

      this.x += this.dx;
    } else if (this.remaining > 0) {
      this.remaining--;
      if (this.x - this.originalX >= this.distance) {
        this.dx = -Math.abs(this.dx);
      }
      if (this.originalX - this.x >= this.distance) {
        this.dx = Math.abs(this.dx);
      }

      this.x += this.dx;
    } else if (this.x != this.originalX) {
      if (this.x < this.originalX) {
        this.x += Math.abs(this.dx);
      } else if (this.x > this.originalX) {
        this.x += -Math.abs(this.dx);
      }
    }
    this.draw();
  }

  mouseOver() {
    if (mouse.x === undefined || mouse.y === undefined) return false;
    if (mouse.x < this.originalX || mouse.x > this.originalX + this.length) {
      return false;
    }
    if (mouse.y < this.y || mouse.y > this.y + this.length) {
      return false;
    }

    return true;
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

for (y = 0; y < canvas.height; y += length + gap) {
  for (x = 0; x < canvas.width; x += length + gap) {
    arr.push(new Rectangle(x, y, length));
  }
}
// Animate: SHOULD ALWAYS BE THE LAST
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  arr.forEach((obj) => {
    obj.update();
  });
}

animate();
