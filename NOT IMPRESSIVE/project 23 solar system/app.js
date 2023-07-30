const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let firstTime = true;
let sparkle = [];
let stars = [];
let x, y, r;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars = [];
  for (let i = 0; i < 200; i++) {
    r = randRange(0.1, 1);
    x = randRange(r, canvas.width - r);
    y = randRange(r, canvas.height - r);

    stars.push(new Circle(x, y, r, "rgba(255, 255, 255, 0.3)"));
  }
});

window.addEventListener("dblclick", function () {
  if (firstTime) {
    firstTime = false;
    animate();
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
// Creating 200 stars
for (let i = 0; i < 200; i++) {
  r = randRange(0.1, 1);
  x = randRange(r, canvas.width - r);
  y = randRange(r, canvas.height - r);

  stars.push(new Circle(x, y, r, "rgba(255, 255, 255, 0.25)"));
}
// Circle that follows mouse
const Cobj = new Circle(10, 10, 30, "yellow");
// Updating mouse position
const mouse = { x: undefined, y: undefined };
window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.pageX;
  mouse.y = evt.pageY;

  Cobj.x = mouse.x;
  Cobj.y = mouse.y;
});

// Pure maths functions
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, max) {
  max += 1;
  return min + Math.floor(Math.random() * (max - min));
}

// Circle that rotates around object position
// 1.Circle that get's placed at certain distance from mouse

// 2.Another circle that get's placed certain distance from first circle

// 3.Both circles from same class

// 4. Both revolves with different speeds, smaller one is faster

class Planet {
  constructor(centre, distance, radius, color) {
    this.centre = centre;
    this.distance = distance;
    this.angle = 2 * Math.PI * Math.random();
    this.color = color;
    this.x = centre.x * Math.cos(this.angle);
    this.y = centre.y * Math.sin(this.angle);
    this.speed = 0.015;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x = this.centre.x + this.distance * Math.cos(this.angle);
    this.y = this.centre.y + this.distance * Math.sin(this.angle);
    this.draw();

    this.angle += this.speed;
  }
}

let planet = new Planet(mouse, 200, 15, "blue");
let satellite = new Planet(planet, 40, 7, "white");
satellite.speed = 0.1;

// animate function
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update();
  });

  Cobj.update();
  planet.update();
  satellite.update();
}
