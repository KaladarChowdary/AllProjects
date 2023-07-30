// Make sure everything is explicit

// SIMPLE RECTANGLE CLASS
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  update(ctx) {
    this.draw(cvs);
  }
}

// Circle class, lot of explicit features to modify
class Circle {
  // Takes position of circle and radius and velocity in x and y directions
  constructor(x, y, r, dx, dy, color = "black") {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  //   Draw with x,y and radius
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.stroke();
  }

  //   Updating x and y with velocity and drawing and changing velocity when collision happens
  update() {
    this.draw();

    if (this.HCollision()) {
      this.dx = -this.dx;
    }
    if (this.VCollision()) {
      this.dy = -this.dy;
    }
  }

  updateXandY() {
    this.x += this.dx;
    this.y += this.dy;
  }

  // Detect when circle edge collides horizontally with canvas
  HCollision() {
    return this.x + this.r >= canvas.width || this.x - this.r <= 0;
  }
  //   Detect when circle edges collides with canvas edge vertically
  VCollision() {
    return this.y + this.r >= canvas.height || this.y - this.r <= 0;
  }
}
