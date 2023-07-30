const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousePositions = [[canvas.width / 2, canvas.height / 2]];

window.addEventListener("mousemove", function (evt) {
  mousePositions.push([evt.pageX, evt.pageY]);
});

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.index = 0;
    this.gap = 300;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x = mousePositions[this.index][0];
    this.y = mousePositions[this.index][1];
    if (this.index < mousePositions.length - 1) {
      this.index++;
    } else {
      mousePositions = [mousePositions.at(-1)];
      this.index = 0;
    }
    this.draw();
  }
}

const cobj = new Circle(canvas.width / 2, canvas.height / 2, 20, "fuchsia");

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  cobj.update();
}
animate();
