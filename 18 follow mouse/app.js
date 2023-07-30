const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let drawPath = false;
let drawCircle = false;

let arr = [[]];
let p = 0;

window.addEventListener("mousemove", function (evt) {
  if (!drawPath) return;
  arr[p].push([evt.pageX, evt.pageY]);
  if (arr[p].length === 1000) {
    p++;
    arr.push([]);
  }
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    console.log("enter pressed");
    drawCircle = !drawCircle;
  }
});

window.addEventListener("dblclick", function (evt) {
  arr[p].push([evt.pageX, evt.pageY]);
  drawPath = !drawPath;
});

function drawFromArray() {
  if (arr[0][0]) {
    ctx.beginPath();
    ctx.moveTo(arr[0][0][0], arr[0][0][1]);
    if (arr[0][1]) {
      let x, y;
      for (let row of arr) {
        for ([x, y] of row) {
          ctx.lineTo(x, y);
        }
      }
    }

    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.stroke();
    ctx.closePath();
  }
}

class Circle {
  constructor(radius, color) {
    this.radius = radius;
    this.color = color;
    this.index = 0;
    this.gap = 300;
    this.p = 0;
    this.q = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (!drawCircle) return;
    if (this.p === arr.length - 1 && this.q === arr[this.p].length - 1) {
    } else {
      // Get next x and y
      this.x = arr[this.p][this.q][0];
      this.y = arr[this.p][this.q][1];
      // Move to next x and y
      this.q++;
    }

    // Increment
    if (this.q === 1000) {
      this.p++;
      this.q = 0;
    }
    this.draw();
  }
}

let cObj = new Circle(10, "green");

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(5, 10, 250, 20);
  ctx.fillStyle = "white";
  ctx.font = "15px Arial";
  ctx.fillText("Press Enter For Circle To Follow", 10, 25);

  drawFromArray();

  cObj.update();
}
animate();
