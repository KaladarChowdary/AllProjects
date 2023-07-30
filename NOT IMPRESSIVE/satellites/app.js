//
//
//
//
// Classes are declared here
class Particle {
  // Takes position of circle and radius and velocity in x and y directions
  constructor(x, y, r, c = "white") {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = c;

    this.speed = randRange(0.005, 0.02);
    this.distance = this.distanceFromCentre();
    this.angle = this.angleFromCenter();
    console.log(this.angle);
  }

  //   Draw with x,y and radius
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    // console.log(this.x, this.y, this.r);
    // console.log("2");
  }

  //   Updating x and y with velocity and drawing and changing velocity when collision happens
  update() {
    this.rotateXandY();
    this.draw();
  }

  rotateXandY() {
    this.angle += this.speed;
    this.angle = this.angle % (2 * Math.PI);
    this.y = centerY + this.distance * Math.sin(this.angle);
    this.x = centerX + this.distance * Math.cos(this.angle);
    // console.log(this.angle, this.distance, this.x, this.y);
  }

  distanceFromCentre() {
    return findDistance(this.x, this.y, centerX, centerY);
  }

  angleFromCenter() {
    // console.log(Math.atan(this.y - centerY, this.x - centerX));
    return Math.atan2(this.y - centerY, this.x - centerX);
  }
}
//
//
//
//
// Event Listeners are declared here
window.addEventListener("mousemove", function (evt) {
  centerX = evt.pageX;
  centerY = evt.pageY;
});
//
//
//
//
// Functions are declared here
function findDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}
function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function maxifyCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  pArr.forEach((particle) => {
    particle.update();
  });

  // console.log("1");
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
// Variables are declared here
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let colorArr = ["#39B5E0", "#A31ACB", "#FF78F0", "#FF78F0"];

let pArr = [];
let x, y, r;
//
//
//
//
// code are run here

maxifyCanvas();
centerX = canvas.width / 2;
centerY = canvas.height / 2;

for (let i = 0; i < 200; i++) {
  x = centerX + randRange(30, 150);
  y = centerY + randRange(30, 150);
  r = 2;
  c = colorArr[randInt(0, colorArr.length)];
  pArr.push(new Particle(x, y, r, c));
}

animate();
