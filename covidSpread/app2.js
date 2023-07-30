const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let arr2,
  firstTime = true;
maxify();
const mouse = { x: undefined, y: undefined };

// Event Listeners
window.addEventListener("resize", function () {
  maxify();

  arr2 = giveCircles(800);
});

window.addEventListener("mousemove", function (evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

window.addEventListener("dblclick", function (evt) {
  arr2.forEach((circle) => {
    if (insideCircle(evt.pageX, evt.pageY, circle)) {
      circle.color = "red";
      circle.spread = true;
    }
  });
});

// Functions
function maxify() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function positive(num) {
  return Math.abs(num);
}

function negative(num) {
  return -Math.abs(num);
}
function xRange(radius) {
  return randRange(radius, canvas.width - radius);
}

function yRange(radius) {
  return randRange(radius, canvas.height - radius);
}

function slow(num) {
  return randRange(negative(num), positive(num));
}

function insideCircle(x, y, circle) {
  return getDistance(x, y, circle.x, circle.y) <= circle.radius;
}

function increaseSpeed(arr, factor) {
  arr.forEach((circle) => {
    circle.dx = factor * circle.dx;
    circle.dy = factor * circle.dy;
  });
}

// Classes
class Circle {
  constructor(x = 100, y = 100, r = 10, dx = 1, dy = 1, color = "black") {
    this.x = x;
    this.y = y;
    this.radius = r;

    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.mass = 1;
    this.spread = false;
  }

  beginPath() {
    ctx.beginPath();
  }

  fillColor() {
    ctx.fillStyle = this.color;
  }
  fill() {
    ctx.fill();
  }

  outlineCircle() {
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  }

  draw() {
    this.beginPath();
    this.outlineCircle();
    this.fillColor();
    this.fill();
  }

  positive(value) {
    return Math.abs(value);
  }
  negative(value) {
    return -Math.abs(value);
  }

  hitBottom() {
    return this.y + this.radius >= canvas.height;
  }

  hitTop() {
    return this.y - this.radius <= 0;
  }

  hitLeft() {
    return this.x - this.radius <= 0;
  }

  hitRight() {
    return this.x + this.radius >= canvas.width;
  }

  changeVelocityOnHit() {
    if (this.hitTop()) {
      this.dy = this.positive(this.dy);
    }
    if (this.hitBottom()) {
      this.dy = this.negative(this.dy);
    }

    if (this.hitLeft()) {
      this.dx = this.positive(this.dx);
    }

    if (this.hitRight()) {
      this.dx = this.negative(this.dx);
    }
  }

  addVelocity() {
    this.x += this.dx;
    this.y += this.dy;
  }

  update() {
    this.changeVelocityOnHit();
    this.addVelocity();
    this.draw();
  }
}

// FUNCTION DEFINITION
function giveCircles(n) {
  let x, y, radius, dx, dy, color, arr;
  radius = 10;
  color = "black";
  arr = [];
  for (let i = 0; i < n; i++) {
    x = xRange(radius);
    y = yRange(radius);
    dx = slow(0.5);
    dy = slow(0.5);
    while (intersectAny(x, y, radius, arr)) {
      x = xRange(radius);
      y = yRange(radius);
    }

    arr.push(new Circle(x, y, radius, dx, dy, color));
  }

  return arr;
}

function intersectAny(x, y, radius, arr) {
  for (let c2 of arr) {
    if (intersect(x, y, radius, c2)) return true;
  }
  return false;
}

function intersect(x, y, radius, c2) {
  return getDistance(x, y, c2.x, c2.y) <= radius + c2.radius;
}

function cIntersect(c1, c2) {
  return getDistance(c1.x, c1.y, c2.x, c2.y) <= c1.radius + c2.radius;
}

function updateAll(arr) {
  arr.forEach((obj) => {
    obj.update();
  });
}

function circleArrayCollision(circle, arr) {
  arr.forEach((circle2) => {
    if (circle !== circle2) {
      if (cIntersect(circle, circle2)) {
        resolveCollision(circle, circle2);
      }
    }
  });
}

function allPossibleCollsions(arr) {
  arr.forEach((circle) => {
    circleArrayCollision(circle, arr);
  });
}

function updateAccordingToSpread(c1, c2) {
  if (c1.spread) {
    c2.spread = true;
    c2.color = c1.color;
  }

  if (c2.spread) {
    c1.spread = true;
    c1.color = c2.color;
  }
}

// From Youtuber
function rotate(dx, dy, angle) {
  const rotatedVelocities = {
    x: dx * Math.cos(angle) - dy * Math.sin(angle),
    y: dx * Math.sin(angle) + dy * Math.cos(angle),
  };

  return rotatedVelocities;
}
function resolveCollision(particle, otherParticle) {
  updateAccordingToSpread(particle, otherParticle);
  const xVelocityDiff = particle.dx - otherParticle.dx;
  const yVelocityDiff = particle.dy - otherParticle.dy;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.dx, particle.dy, angle);
    const u2 = rotate(otherParticle.dx, otherParticle.dy, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1.x, v1.y, -angle);
    const vFinal2 = rotate(v2.x, v2.y, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.dx = vFinal1.x;
    particle.dy = vFinal1.y;

    otherParticle.dx = vFinal2.x;
    otherParticle.dy = vFinal2.y;
  }
}

// SHOULD BE THE LAST
arr2 = giveCircles(800);
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  updateAll(arr2);
  allPossibleCollsions(arr2);
}

animate();
