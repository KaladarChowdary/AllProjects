const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = { x: undefined, y: undefined };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event Listeners
window.addEventListener("resize", function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;
});

// RECTANGLE
class lineSegment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }

  update() {
    this.draw();
  }
}

// Includes array and stuff
class dynamicLineSegment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.yStep = Math.abs(y2 - y1) / Math.abs(x2 - x1);
    this.arr = [];
    this.arr = getPath(x1, y1, x2, y2, this.yStep);
    this.index = 0;

    this.initX = this.arr[0][0];
    this.initY = this.arr[0][1];
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.initX, this.initY);
    ctx.lineTo(this.arr[this.index][0], this.arr[this.index][1]);
    ctx.stroke();
  }

  update() {
    if (this.index < this.arr.length - 1) {
      // console.log([this.index, this.arr.length]);
      this.index += 1;
    }

    console.log(this.arr[this.index], this.arr[this.index]);
    this.draw();
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

function getPath(x1, y1, x2, y2, ystep, arr = []) {
  arr.push([x1, y1]);
  if (getDistance(x1, y1, x2, y2) <= 1) {
    arr.push(x2, y2);
    return arr;
  } else {
    if (x1 < x2) {
      x1 = Math.min(x2, x1 + 1);
    }
    if (y1 < y2) {
      y1 = Math.min(y2, y1 + ystep);
    }

    if (x1 > x2) {
      x1 = Math.max(x2, x1 - 1);
    }

    if (y1 > y2) {
      y1 = Math.max(y2, y1 - 1);
    }

    return getPath(x1, y1, x2, y2, ystep, arr);
  }
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
//
//
// objects to used in animate

let obj = new lineSegment(0, 0, 100, 100);
let dobj = new dynamicLineSegment(400, 400, 450, 450);
// Animate: SHOULD ALWAYS BE THE LAST
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  obj.x1 = canvas.width / 2;
  obj.y1 = canvas.height / 2;
  obj.x2 = mouse.x;
  obj.y2 = mouse.y;

  obj.update();
  dobj.update();
}

animate();
