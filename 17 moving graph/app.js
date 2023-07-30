const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let circleArr = [];
let isDragging = false;
let currentCircle;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//
window.addEventListener("resize", function (evt) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("mousedown", function (evt) {
  for (let circle of circleArr) {
    let dx = evt.clientX - circle.x;
    let dy = evt.clientY - circle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle.radius) {
      isDragging = true;
      currentCircle = circle;
      break;
    }
  }
});

window.addEventListener("mousemove", function (evt) {
  if (isDragging) {
    currentCircle.x = evt.clientX;
    currentCircle.y = evt.clientY;
  }
});

window.addEventListener("mouseup", function () {
  isDragging = false;
  currentCircle = undefined;
});

window.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter") {
    circleArr.forEach((circle) => {
      circle.dx = 3 * (Math.random() - 0.5);
      circle.dy = 3 * (Math.random() - 0.5);
      // circle.dx = 1;
      // circle.dy = 0;
    });
  }
});

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(circleArr) {
    if (this !== currentCircle) {
      this.x += this.dx;
      this.y += this.dy;
    }

    if (this.x - this.radius <= 0) {
      this.dx = Math.abs(this.dx);
    }

    if (this.x + this.radius >= canvas.width) {
      this.dx = -Math.abs(this.dx);
    }

    if (this.y - this.radius <= 0) {
      this.dy = Math.abs(this.dy);
    }
    if (this.y + this.radius >= canvas.height) {
      this.dy = -Math.abs(this.dy);
    }
    this.draw();
    this.connect(circleArr);
  }

  connect(circleArr) {
    for (let circle of circleArr) {
      if (circle !== this) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(circle.x, circle.y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("dblclick", function (evt) {
  let newCircle = new Circle(evt.clientX, evt.clientY, 10, "black");
  circleArr.push(newCircle);
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update(circleArr);
    console.log(i);
  }
}
animate();
